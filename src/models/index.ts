import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export * from './actions';
export * from './dnd';

export type Module = NodeModule & {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

export type Maybe<A> = null | A;

export interface WithColors {
  colors: {
    success: { light: CSSProperties['color']; dark: CSSProperties['color'] };
  };
}

export interface EnhancedTheme extends Theme, WithColors {}

export interface SelectOption<Value> {
  label: React.ReactNode;
  value: Value;
}

export type SelectOptions<Value> = SelectOption<Value>[];

export const loadingStatuses = ['not started', 'in progress', 'completed'] as const;
export type LoadingStatus = typeof loadingStatuses[number];
