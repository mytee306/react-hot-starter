import 'firebase/storage';
import { Epic, ofType } from 'redux-observable';
import { putString } from 'rxfire/storage';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import urlJoin from 'url-join';
import firebase from '../../firebase';
import { selectState } from '../../utils/operators';
import { selectUid } from '../reducer';
import {
  createUpdateProgress,
  createUpload,
  selectImageEntities,
  slice,
} from '../slices/images';
import { createSetSnackbar } from '../slices/snackbar';

const upload: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createUpload.toString()),
    selectState(selectImageEntities)(state$),
    mergeMap(entities => Object.entries(entities)),
    withLatestFrom(state$.pipe(map(selectUid))),
    mergeMap(([[id, { name, dataUrl }], uid]) =>
      putString(
        firebase.storage().ref(urlJoin(slice, uid, id)),
        dataUrl,
        'data_url',
        { customMetadata: { name, id } },
      ),
    ),
    map(({ bytesTransferred, totalBytes, metadata: { customMetadata } }) =>
      createUpdateProgress({
        id: customMetadata!.id,
        uploadStatus:
          bytesTransferred / totalBytes ? 'completed' : 'in progress',
      }),
    ),
    catchError(({ message }) =>
      of(createSetSnackbar({ message, variant: 'error', duration: 3000 })),
    ),
  );

export default [upload];
