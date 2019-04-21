export interface Item {
  text: string;
  icon: JSX.Element;
}

export type Items = Item[];

export type NavItem = Item & {
  path: string;
};

export type NavItems = NavItem[];
