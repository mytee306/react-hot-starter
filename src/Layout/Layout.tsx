import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import {
  ChevronLeft as ChevronLeftIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import React, { SFC, useState } from 'react';
import { LayoutStyles } from './LayoutStyle';

export const items = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export type LayoutClasses =
  | 'root'
  | 'appBar'
  | 'appBarShift'
  | 'menuButton'
  | 'hide'
  | 'drawerOpen'
  | 'drawerClose'
  | 'drawer'
  | 'content'
  | 'toolbar';

export interface LayoutProps {
  classes: ClassNameMap<LayoutClasses>;
}

const Layout: SFC<LayoutProps> = ({ classes, children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            App Name
          </Typography>
        </Toolbar>
      </AppBar>
      {/* HEADER ENDS */}
      <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default withStyles(LayoutStyles)(Layout);
