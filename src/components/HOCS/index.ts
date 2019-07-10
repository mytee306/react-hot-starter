import { isEqual } from 'lodash';
import { memo as reactMemo } from 'react';

export const memo = (Component: Parameters<typeof reactMemo>[0]) =>
  reactMemo(Component, isEqual);

export * from './withSpinner';
export { default } from './withSpinner';
