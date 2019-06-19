/* eslint-disable indent */
/* eslint-disable immutable/no-mutation */

import {
  Button,
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
import Spinner from '../components/Spinner';
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
  theme: { palette, spacing, colors, typography },
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
                addImage({
                  name,
                  dataUrl: reader.result as string,
                  uploadStatus: 'not started',
                });
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
          const { name, dataUrl, uploadStatus } = image;
          return (
            <Box key={name}>
              <ListItem>
                <ListItemText>
                  <Flex alignItems="center">
                    <Typography
                      variant="h5"
                      style={{
                        marginRight: spacing.unit,
                        color: appropriate ? 'initial' : palette.error.dark,
                      }}
                    >
                      {name}
                    </Typography>
                    {(() => {
                      switch (uploadStatus) {
                        case 'in progress':
                          return <Spinner size={typography.fontSize} />;
                        case 'completed':
                          return (
                            <Tooltip title="Successfully Uploaded">
                              <CheckCircleOutline
                                style={{ color: colors!.success }}
                              />
                            </Tooltip>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </Flex>
                </ListItemText>
              </ListItem>
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
