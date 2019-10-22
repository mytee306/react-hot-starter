import 'firebase/storage';
import firebase from 'my-firebase';
import { Epic, ofType } from 'redux-observable';
import { PayloadAction } from 'redux-starter-kit';
import { putString } from 'rxfire/storage';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EpicDependencies } from 'store/configureStore';
import urlJoin from 'url-join';
import { selectState } from 'utils/operators';
import { selectUid } from '../reducer';
import {
  AddImageAction,
  createAddImage,
  createSetErrorSnackbar,
  createUpdateOneImage,
  createUpdateProgress,
  createUpload,
  imagesSliceName,
  selectImageEntities,
  UpdateOneImageAction,
} from '../slices';

const upload: Epic = (action$, state$) =>
  action$.pipe(
    ofType(createUpload.toString()),
    selectState(selectImageEntities)(state$),
    mergeMap(entities => Object.entries(entities)),
    withLatestFrom(state$.pipe(map(selectUid))),
    mergeMap(([[id, { name, dataUrl }], uid]) =>
      putString(
        firebase.storage().ref(urlJoin(imagesSliceName, uid, id)),
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
      of(createSetErrorSnackbar({ message, duration: 3000 })),
    ),
  );

// TODO strong type State and in-out Actions
const verifyImage: Epic<
  PayloadAction,
  UpdateOneImageAction,
  PayloadAction,
  EpicDependencies
> = (action$, _, { mobilenet$ }) =>
  action$.pipe(
    ofType<AddImageAction>(createAddImage.toString()),
    map(({ payload }) => payload),
    mergeMap(img => {
      const { dataUrl } = img;

      const image = new Image();

      image.src = dataUrl; // eslint-disable-line immutable/no-mutation

      return mobilenet$.pipe(
        mergeMap(net => net.classify(image)),
        tap(console.log),
        map(() =>
          createUpdateOneImage({ ...img, verificationStatus: 'completed' }),
        ),
      );
    }),
  );

export default [upload, verifyImage];
