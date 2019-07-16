import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { createDropText } from 'models';
import React from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';

const Text: React.FC<TypographyProps> = ({ children }) => {
  const [text, setText] = React.useState(children);

  React.useEffect(() => {
    setText(children);
  }, [children]);

  const [, dragRef] = useDrag({
    item: createDropText({ id: v4(), children: text }),
  });

  return (
    <Typography ref={dragRef} style={{ cursor: 'grab' }}>
      {text}
    </Typography>
  );
};

export default Text;
