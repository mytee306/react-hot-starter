import { Card, CardContent } from '@material-ui/core';
import { isEqual } from 'lodash';
import { createDropText, DropTextPayload, WithDropResult } from 'models';
import React from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';
import TextEditor, { TextEditorProps } from './TextEditor';

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

  const { initialContent } = props;

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
        <TextEditor initialContent={initialContent} />
      </CardContent>
    </Card>
  );
};

const Text: React.FC<TextBaseProps> = props => (
  <TextBase {...props} position="absolute" />
);

export default Text;

export const TextTemplate: React.FC<
  Pick<TextEditorProps, 'initialContent'>
> = props => (
  <TextBase {...props} position="static" top={0} left={0} id={v4()} />
);
