import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React from 'react';

export const getPathFromText = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .join('-')
    .padStart(1, '/');

export interface Item {
  text: string;
  icon: JSX.Element;
}
export type MenuItem = Item & {
  path: string;
};

export type MenuItems = MenuItem[];

export const items = [
  {
    text: 'Increment',
    icon: <ArrowUpward />,
  },
  {
    text: 'Decrement',
    icon: <ArrowDownward />,
  },
];

const menuItems: MenuItems = items.map(item => ({
  ...item,
  path: getPathFromText(item.text),
}));

export default menuItems;
