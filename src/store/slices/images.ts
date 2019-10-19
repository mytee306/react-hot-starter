import { pick } from 'ramda';
import { createAction, createSlice, PayloadAction } from 'redux-starter-kit';
import { SliceActionCreator } from 'redux-starter-kit/src/createSlice';
import { createDeepSelector, prefixActionType } from 'utils';
import { v4 } from 'uuid';

export const imagesSliceName = 'images';

const prefix = prefixActionType(imagesSliceName);

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

export const initialImages: Images = { ids: [], entities: {} };

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

export type RemoveImageAction = PayloadAction<Images['ids'][0]>;

const imagesSlice = createSlice({
  slice: imagesSliceName,
  initialState: initialImages,
  reducers: {
    add: ({ ids, entities }, { payload: image }: AddImage) => {
      const id = v4();

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
  },
});

export const {
  actions: {
    add: createAddImage,
    updateProgress: createUpdateProgress,
    set: createSetImages,
    remove: createRemoveImage,
  },
  selectors: { getImages },
} = imagesSlice;

export default imagesSlice.reducer;

export type CreateRemoveImage = typeof createRemoveImage;

export const selectImages = createDeepSelector(getImages, ({ ids, entities }) =>
  ids.map(id => entities[id]),
);

export const selectImageIds = createDeepSelector(getImages, ({ ids }) => ids);

export const selectImageEntities = createDeepSelector(
  getImages,
  ({ entities }) => entities,
);

export interface ImageWIthId extends Image {
  id: Images['ids'][0];
}

export type ImagesWIthId = ImageWIthId[];

export const selectImagesWithIds = createDeepSelector(
  selectImageIds,
  selectImages,
  (ids, images) => ids.map((id, i) => ({ ...images[i], id })),
);

export const selectImagesUploading = createDeepSelector(
  selectImageEntities,
  entities =>
    Object.values(entities).some(
      ({ uploadStatus }) => uploadStatus === 'in progress',
    ),
);

export type ImagesUploading = ReturnType<typeof selectImagesUploading>;
