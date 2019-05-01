export type Module = NodeModule & {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};
