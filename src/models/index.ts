import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export type Module = NodeModule & {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

export type Maybe<A> = null | A;

export type Emptiable<A> = {} | A;

export interface WithColors {
  colors?: {
    success: CSSProperties['color'];
  };
}

export interface EnhancedTheme extends Theme, WithColors {}
