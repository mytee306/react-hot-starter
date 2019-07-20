import { Theme } from '@material-ui/core';
import { TextEditorProps } from 'pages/Canvas/TextEditor';
import { CSSProperties } from 'react';
import { createAction } from 'typesafe-actions';
import { toObject } from 'utils';

export type Module = NodeModule & {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

export type Maybe<A> = null | A;

export interface EnhancedTheme extends Theme, WithColors {}

export interface WithColors {
  colors: {
    success: { light: CSSProperties['color']; dark: CSSProperties['color'] };
  };
}

export interface WithId {
  id: string;
}

export const draggables = ['Text'] as const;

export type Draggable = typeof draggables[number];

export const Draggables = toObject(draggables);

export interface DropTextPayload
  extends WithId,
    Pick<TextEditorProps, 'initialContent'> {}

export const createDropText = createAction(
  Draggables.Text,
  action => (payload: DropTextPayload) => action(payload),
);

export type CreateDropText = typeof createDropText;

export type DropTextAction = ReturnType<CreateDropText>;

export interface WithDropResult {
  top: number;
  left: number;
}

export interface DropResult extends DropTextPayload, WithDropResult {}
