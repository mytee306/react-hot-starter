interface Item {
  text: string;
  icon: JSX.Element;
}

export type NavItem = Item & {
  path: string;
};

export type NavItems = NavItem[];
