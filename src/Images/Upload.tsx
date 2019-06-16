/* eslint-disable indent */

import {
  Button,
  List,
  ListItem,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import React, { createRef, CSSProperties, useState } from 'react';
import { Box } from 'rebass';

export interface UploadProps extends WithTheme {}

const uploadInputRef = createRef<HTMLInputElement>();

const Upload: React.FC<UploadProps> = ({
  theme: {
    palette: { error },
    spacing: { unit },
  },
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const appropriate = true;

  const listItemStyle: { style?: CSSProperties } = appropriate
    ? {}
    : { style: { color: error.dark } };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        console.log(files);
      }}
    >
      <input
        ref={uploadInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={({ target: { files: newFiles } }) => {
          if (newFiles && newFiles.length) {
            setFiles(Array.from(newFiles));
          }
        }}
        hidden
      />
      <Button
        onClick={() => uploadInputRef.current!.click()}
        variant="contained"
      >
        <AddToPhotos style={{ marginRight: 2 * unit }} />
        Choose image files
      </Button>
      <br />
      <br />
      <Typography variant="h4">Chosen Files</Typography>
      <List>
        {files.map(file => {
          const { name } = file;

          return (
            <Box key={name}>
              <ListItem>
                <Typography {...listItemStyle}>{name}</Typography>
              </ListItem>
              <img src={URL.createObjectURL(file)} alt={name} height={200} />
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
export default withTheme()(Upload);
