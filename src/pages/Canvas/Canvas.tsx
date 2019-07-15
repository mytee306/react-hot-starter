/* eslint-disable indent */

import {
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import { Title } from '@material-ui/icons';
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

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.spacing(7),
  },
  paper: {
    position: 'static',
  },
}));

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

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const textItemRef = React.useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen(!open);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Drawer
        variant="permanent"
        open
        className={classes.drawer}
        classes={{
          paper: classes.paper,
        }}
      >
        <List>
          <ListItem button ref={textItemRef} onClick={toggleOpen}>
            <ListItemIcon>
              <Title />
            </ListItemIcon>
          </ListItem>
          <Popover
            anchorEl={textItemRef.current}
            open={open}
            onClose={toggleOpen}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Card>
              <CardContent>
                <Typography>Text Block</Typography>
              </CardContent>
            </Card>
          </Popover>
        </List>
      </Drawer>
      <div
        style={{
          flexGrow: 1,
          background:
            isOver && canDrop ? 'lightgreen' : isOver ? 'tomato' : '#eee',
        }}
      >
        {element}
      </div>
    </div>
  );
};

export default Canvas;
