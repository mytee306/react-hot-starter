/* eslint-disable indent */

import { Typography } from '@material-ui/core';
import { Draggables, draggables, DropResult, DropTextAction } from 'models';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import Text from './Text';

const createCollect = <Type extends string, Payload>(
  componentMap: Record<Type, React.ComponentType<Payload>>,
) => (monitor: DropTargetMonitor) => ({
  isOver: !!monitor.isOver(),
  canDrop: !!monitor.canDrop(),
  element: (() => {
    const type = monitor.getItemType() as Type;
    if (type) {
      const payload: Payload = monitor.getDropResult();

      const Component: React.ComponentType<Payload> = componentMap[type];

      return <Component {...payload} />;
    } else {
      return null;
    }
  })(),
});

const collect = createCollect({
  [Draggables.Text]: Text,
});

export interface CanvasProps {}

const Canvas: React.FC<CanvasProps> = () => {
  const [{ isOver, canDrop, element }, dropRef] = useDrop<
    DropTextAction,
    DropResult,
    ReturnType<typeof collect>
  >({
    accept: Draggables.Text,
    canDrop: ({ type }) => draggables.includes(type),
    collect,
  });

  return (
    <div
      ref={dropRef}
      style={{
        height: '100%',
        background:
          isOver && canDrop ? 'lightgreen' : isOver ? 'tomato' : '#eee',
      }}
    >
      <Typography variant="h2">Canvas</Typography>
      {element}
    </div>
  );
};

export default Canvas;
