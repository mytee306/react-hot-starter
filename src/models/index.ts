import { Theme } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { CSSProperties } from 'react';
import { createAction } from 'typesafe-actions';
import { toObject } from 'utils';

export type Module = NodeModule & {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

export type Maybe<A> = null | A;

export interface WithColors {
  colors?: {
    success: CSSProperties['color'];
  };
}

export interface EnhancedTheme extends Theme, WithColors {}

export const draggables = ['Text'] as const;

export type Draggable = typeof draggables[number];

export const Draggables = toObject(draggables);

export const createDropText = createAction(
  Draggables.Text,
  action => (payload: TypographyProps) => action(payload),
);

export type CreateDropText = typeof createDropText;

export type DropTextAction = ReturnType<CreateDropText>;

export type DropResult = TypographyProps;
