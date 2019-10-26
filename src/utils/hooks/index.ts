/* eslint-disable indent */

import { useMediaQuery, useTheme } from '@material-ui/core';
import { equals } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActionCreator,
  ActionCreatorsMapObject,
  bindActionCreators,
} from 'redux';

export const useIsNotSmallScreen = () => {
  const theme = useTheme();

  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

  return isNotSmallScreen;
};

export const useDeepSelector = <S extends Parameters<typeof useSelector>[0]>(
  selector: S,
) => useSelector(selector, equals);

export const useActions = <
  Actions extends ActionCreator<any> | ActionCreatorsMapObject<any>
>(
  actions: Actions,
) => {
  const dispatch = useDispatch();

  return bindActionCreators(
    actions as Parameters<typeof bindActionCreators>[0],
    dispatch,
  );
};
