import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withTheme,
  WithTheme,
} from '@material-ui/core';
import { AddToPhotos, Photo } from '@material-ui/icons';
import React, { createRef, CSSProperties, useState } from 'react';

export interface ImageUploadProps extends WithTheme {}

const imageUploadInputRef = createRef<HTMLInputElement>();

const ImageUpload: React.FC<ImageUploadProps> = ({
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
        ref={imageUploadInputRef}
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
        onClick={() => imageUploadInputRef.current!.click()}
        variant="contained"
      >
        <AddToPhotos style={{ marginRight: 2 * unit }} />
        Choose image files
      </Button>
      <br />
      <br />
      <Typography variant="h4">Chosen Files</Typography>
      <List>
        {files.map(({ name }) => (
          <ListItem>
            <ListItemIcon {...listItemStyle}>
              <Photo />
            </ListItemIcon>
            <ListItemText>
              <Typography {...listItemStyle}>{name}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </form>
  );
};
export default withTheme()(ImageUpload);
