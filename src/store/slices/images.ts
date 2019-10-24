import { ExtendedLoadingStatus, LoadingStatus } from 'models';
import { pick } from 'ramda';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createSelector } from 'reselect';
import { createAction } from 'typesafe-actions';
import { createDeepSelector } from 'utils';
import { v4 } from 'uuid';

export const imagesSliceName = 'images';

export interface Image {
  dataUrl: string;
  name: string;
  uploadStatus: LoadingStatus;
  verificationStatus: ExtendedLoadingStatus;
}

export interface Images {
  ids: string[];
  entities: {
    [id: string]: Image;
  };
}

export const initialImages: Images = { ids: [], entities: {} };

export const uploadType = 'images/upload';
export const createUpload = createAction(uploadType);
export type CreateUpload = typeof createUpload;
export type UploadAction = ReturnType<CreateUpload>;

export const createAddImage = createAction(
  'images/add' as string,
  action => (image: Image) => action({ ...image, id: v4() }),
);
export type CreateAddImage = typeof createAddImage;

export type AddImageAction = ReturnType<CreateAddImage>;

export type UpdateProgress = PayloadAction<{
  id: ImageWithId['id'];
  uploadStatus: Image['uploadStatus'];
}>;

export type CreateSetImages = SliceActionCreator<File[]>;

export type SetImages = ReturnType<CreateSetImages>;

export type RemoveImageAction = PayloadAction<ImageWithId['id']>;

export type UpdateOneImageAction = PayloadAction<
  Partial<Omit<ImageWithId, 'id'>> & Pick<ImageWithId, 'id'>
>;

const imagesSlice = createSlice({
  slice: imagesSliceName,
  initialState: initialImages,
  reducers: {
    add: (
      { ids, entities },
      { payload: { id, ...image } }: AddImageAction,
    ) => ({
      ids: ids.concat(id),
      entities: { ...entities, [id]: image },
    }),
    updateProgress: (
      { ids, entities },
      { payload: { id, uploadStatus } }: UpdateProgress,
    ) => ({
      ids,
      entities: { ...entities, [id]: { ...entities[id], uploadStatus } },
    }),
    set: (_, { payload: images }: SetImages) => {
      const ids = images.map(() => v4());

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
    remove: (state, { payload }: RemoveImageAction) => {
      const { ids, entities } = state;
      const newIds = ids.filter(id => id !== payload);

      return {
        ids: newIds,
        entities: pick(newIds, entities),
      };
    },
    updateOne: (
      { ids, entities },
      { payload: image }: UpdateOneImageAction,
    ) => ({
      ids,
      entities: {
        ...entities,
        [image.id]: { ...entities[image.id], ...image },
      },
    }),
  },
});

export const {
  actions: {
    updateProgress: createUpdateProgress,
    set: createSetImages,
    remove: createRemoveImage,
    updateOne: createUpdateOneImage,
  },
  selectors: { getImages },
} = imagesSlice;

export default imagesSlice.reducer;

export type CreateRemoveImage = typeof createRemoveImage;

export const selectImages = createSelector(
  getImages,
  ({ ids, entities }) => ids.map(id => entities[id]),
);

export const selectImageIds = createDeepSelector(getImages, ({ ids }) => ids);

export const selectImageEntities = createSelector(
  getImages,
  ({ entities }) => entities,
);

export interface ImageWithId extends Image {
  id: Images['ids'][0];
}

export type ImagesWithId = ImageWithId[];

export const selectImagesWithIds = createSelector(
  selectImageIds,
  selectImages,
  (ids, images) => ids.map((id, i) => ({ ...images[i], id })),
);

export const selectImagesUploading = createSelector(
  selectImageEntities,
  entities =>
    Object.values(entities).some(
      ({ uploadStatus }) => uploadStatus === 'in progress',
    ),
);

export type ImagesUploading = ReturnType<typeof selectImagesUploading>;

export const selectImagesBeingVerified = createSelector(
  selectImageEntities,
  entities =>
    Object.values(entities).some(
      ({ verificationStatus }) => verificationStatus === 'in progress',
    ),
);

export type ImagesBeingVerified = ReturnType<typeof selectImagesBeingVerified>;
