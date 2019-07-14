import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { createDropText } from 'models';
import React from 'react';
import { useDrag } from 'react-dnd';

const Text: React.FC<TypographyProps> = ({ children }) => {
  const [text] = React.useState(children);

  const [, dragRef] = useDrag({
    item: createDropText({ children: text }),
  });

  return <Typography ref={dragRef}>{text}</Typography>;
};

export default Text;
