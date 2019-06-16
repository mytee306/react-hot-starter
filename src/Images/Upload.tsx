/* eslint-disable indent */

import {
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { AddToPhotos, CheckCircleOutline } from '@material-ui/icons';
import React, { createRef } from 'react';
import { connect } from 'react-redux';
import { Box, Flex } from 'rebass';
import { State } from '../store/reducer';
import {
  createAddImage,
  CreateAddImage,
  CreateUpload,
  createUpload,
  Image,
  selectImages,
} from '../store/slices/images';

export interface UploadProps extends WithTheme {
  addImage: CreateAddImage;
  upload: CreateUpload;
  images: Image[];
}

const uploadInputRef = createRef<HTMLInputElement>();

const Upload: React.FC<UploadProps> = ({
  theme: { palette, spacing, colors },
  addImage,
  upload,
  images,
}) => {
  const appropriate = true;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        upload();
      }}
    >
      <input
        ref={uploadInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={({ target: { files } }) => {
          if (files && files.length) {
            Array.from(files).forEach((file, i) => {
              const { name } = file;
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                addImage({ name, dataUrl: reader.result as string });
              };
            });
          }
        }}
        hidden
      />
      <Button
        onClick={() => uploadInputRef.current!.click()}
        variant="contained"
      >
        <AddToPhotos style={{ marginRight: 2 * spacing.unit }} />
        Choose image files
      </Button>
      <br />
      <br />
      <Typography variant="h4">Chosen Files</Typography>
      <List>
        {images.map(image => {
          const { name, dataUrl, uploadProgress } = image;

          const isUploaded = uploadProgress === 100;

          return (
            <Box key={name}>
              <ListItem>
                <ListItemText>
                  <Flex>
                    <Typography
                      variant="h5"
                      style={{
                        marginRight: spacing.unit,
                        color: appropriate ? 'initial' : palette.error.dark,
                      }}
                    >
                      {name}
                    </Typography>
                    {isUploaded && (
                      <Tooltip title="Successfully Uploaded">
                        <CheckCircleOutline
                          style={{ color: colors!.success }}
                        />
                      </Tooltip>
                    )}
                  </Flex>
                  <br />
                  <LinearProgress
                    hidden={isUploaded}
                    title="Upload Progress"
                    variant="determinate"
                    value={uploadProgress}
                  />
                </ListItemText>
              </ListItem>
              <br />
              <br />
              <img src={dataUrl} alt={name} height={150} />
            </Box>
          );
        })}
      </List>
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </form>
  );
};

export default withTheme()(
  connect(
    (state: State) => ({ images: selectImages(state) }),
    { upload: createUpload, addImage: createAddImage },
  )(Upload),
);
