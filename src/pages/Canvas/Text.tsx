import { Card, CardContent, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/system';
import { isEqual } from 'lodash';
import { createDropText, DropTextPayload, WithDropResult } from 'models';
import React from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';

interface TextBaseProps extends DropTextPayload, WithDropResult {}

const TextBase: React.FC<
  TextBaseProps & { position: React.CSSProperties['position'] }
> = ({ position, top, left, ...props }) => {
  const [stateProps, setStateProps] = React.useState(props);

  React.useEffect(() => {
    if (!isEqual(props, stateProps)) {
      setStateProps(props);
    }
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  const [, dragRef] = useDrag({
    item: createDropText({ ...stateProps }),
  });

  return (
    <Card
      ref={dragRef}
      style={{
        cursor: 'grab',
        display: 'inline-block',
        position,
        top,
        left,
      }}
    >
      <CardContent>
        <Typography {...stateProps} />
      </CardContent>
    </Card>
  );
};

const Text: React.FC<TextBaseProps> = props => (
  <TextBase {...props} position="absolute" />
);

export default Text;

export const TextTemplate: React.FC<TypographyProps> = props => (
  <TextBase position="static" top={0} left={0} id={v4()} {...props} />
);
