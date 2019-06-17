import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
import { prefixActionType } from '../../utils';

export const slice = 'images';

const prefix = prefixActionType(slice);

const uploadStatuses = ['not started', 'in progress', 'completed'] as const;

type UploadStatus = typeof uploadStatuses[number];

export interface Image {
  dataUrl: string;
  name: string;
  uploadStatus: UploadStatus;
}

export interface Images {
  ids: string[];
  entities: {
    [id: string]: Image;
  };
}

export const createUpload = createAction(prefix('upload'));

export type CreateUpload = typeof createUpload;

export type CreateAddImage = SliceActionCreator<Image>;

export type AddImage = ReturnType<CreateAddImage>;

export type UpdateProgress = PayloadAction<{
  id: string;
  uploadStatus: Image['uploadStatus'];
}>;

export type CreateSetImages = SliceActionCreator<File[]>;

export type SetImages = ReturnType<CreateSetImages>;

export const {
  reducer,
  actions: {
    add: createAddImage,
    updateProgress: createUpdateProgress,
    set: createSetImages,
  },
  selectors: { getImages },
} = createSlice<Images>({
  slice,
  initialState: { ids: [], entities: {} },
  reducers: {
    add: ({ ids, entities }, { payload: image }: AddImage) => {
      const id = uuid();
      return {
        ids: ids.concat(id),
        entities: { ...entities, [id]: image },
      };
    },
    updateProgress: (
      { ids, entities },
      { payload: { id, uploadStatus } }: UpdateProgress,
    ) => ({
      ids,
      entities: { ...entities, [id]: { ...entities[id], uploadStatus } },
    }),
    set: (_, { payload: images }: SetImages) => {
      const ids = images.map(() => uuid());

      return {
        ids,
        entities: images.reduce(
          (allImages, image, i) => ({
            ...allImages,
            [ids[i]]: { ...image, uploadStatus: 0 },
          }),
          {},
        ),
      };
    },
  },
});

export default reducer;

export const selectImages = createSelector(
  getImages,
  ({ ids, entities }) => ids.map(id => entities[id]),
);

export const selectImageEntities = createSelector(
  getImages,
  ({ entities }) => entities,
);
