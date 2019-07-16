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
} from '@material-ui/core';
import { Title } from '@material-ui/icons';
import { Draggables, draggables, DropResult, DropTextAction } from 'models';
import React from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import Text from './Text';

const collect = (monitor: DropTargetMonitor) => ({
  isOver: !!monitor.isOver(),
  canDrop: !!monitor.canDrop(),
  props: monitor.getDropResult() as DropResult,
  isDragging: monitor.getItemType() === Draggables.Text,
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
  const [{ isOver, canDrop, props, isDragging }, dropRef] = useDrop<
    DropTextAction,
    DropResult,
    ReturnType<typeof collect>
  >({
    accept: Draggables.Text,
    canDrop: ({ type }) => draggables.includes(type),
    drop: ({ payload }) => payload,
    collect,
  });

  const [dropResults, setDropResults] = React.useState<DropResult[]>([]);

  React.useEffect(() => {
    if (props) {
      setDropResults(dropResults.concat(props));
    }
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDragging) {
      setOpen(false);
    }
  }, [isDragging]);

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
                <Text>Text Block</Text>
              </CardContent>
            </Card>
          </Popover>
        </List>
      </Drawer>
      <div
        ref={dropRef}
        style={{
          flexGrow: 1,
          background:
            isOver && canDrop ? 'lightgreen' : isOver ? 'tomato' : '#eee',
        }}
      >
        {dropResults.map(({ id, ...textBlockProps }) => (
          <Text key={id} {...textBlockProps} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
