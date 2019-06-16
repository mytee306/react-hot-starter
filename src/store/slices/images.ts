import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import uuid from 'uuid/v4';
import { prefixActionType } from '../../utils';

export const slice = 'images';

const prefix = prefixActionType(slice);

export interface ImageWithoutProgress {
  dataUrl: string;
  name: string;
}

export interface Image extends ImageWithoutProgress {
  uploadProgress: number;
}

export type Files = Image[];

export interface Images {
  ids: string[];
  entities: {
    [id: string]: Image;
  };
}

export const createUpload = createAction(prefix('upload'));

export type CreateUpload = typeof createUpload;

export type CreateAddImage = SliceActionCreator<ImageWithoutProgress>;

export type AddImage = ReturnType<CreateAddImage>;

export type UpdateProgress = PayloadAction<{
  id: string;
  uploadProgress: Image['uploadProgress'];
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
        entities: { ...entities, [id]: { ...image, uploadProgress: 0 } },
      };
    },
    updateProgress: (
      { ids, entities },
      { payload: { id, uploadProgress } }: UpdateProgress,
    ) => ({
      ids,
      entities: { ...entities, [id]: { ...entities[id], uploadProgress } },
    }),
    set: (_, { payload: images }: SetImages) => {
      const ids = images.map(() => uuid());

      return {
        ids,
        entities: images.reduce(
          (allImages, image, i) => ({
            ...allImages,
            [ids[i]]: { ...image, uploadProgress: 0 },
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
