/* eslint-disable indent */
import { useTheme as useMaterialTheme } from '@material-ui/styles';
import { Selector } from 'react-redux';
import { EnhancedTheme } from '../models';
import { State } from '../store/reducer';

const prefixActionTypeWithSeparator = (separator: string) => (
  prefix: string,
) => (actionType: string) => prefix.concat(separator).concat(actionType);

export const prefixActionType = prefixActionTypeWithSeparator('/');

export const useTheme = () => useMaterialTheme<EnhancedTheme>();

export const getPathFromComponent = <Component extends React.FC<any>>(
  component: Component,
) => {
  const { name, displayName } = component;
  return (name || displayName!).toLowerCase();
};

export const mapStateToProps = <
  Map extends { [key: string]: Selector<State, any> }
>(
  map: Map,
) => (state: State) => {
  const entries = Object.entries(map).map(([prop, selector]) => [
    prop,
    selector(state),
  ]);

  const fromEntries: {
    [prop in keyof Map]: ReturnType<Map[prop]>
  } = Object.fromEntries(entries);

  return fromEntries;
};
