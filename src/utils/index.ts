/* eslint-disable indent */
import { useTheme as useMaterialTheme } from '@material-ui/styles';
import { EnhancedTheme } from 'models';
import { Selector } from 'react-redux';
import { State } from 'store/reducer';
import urlJoin from 'url-join';

const prefixActionTypeWithSeparator = (separator: string) => (
  prefix: string,
) => (actionType: string) => prefix.concat(separator).concat(actionType);

export const prefixActionType = prefixActionTypeWithSeparator('/');

export const useTheme = () => useMaterialTheme<EnhancedTheme>();

export const makeAbsolute = (path: string) => urlJoin('/', path);

export const getPathFromComponent = <Component extends React.FC<any>>(
  component: Component,
) => {
  const { name, displayName } = component;
  return (name || displayName!).toLowerCase();
};

export const mapStateToProps = <
  Map extends Record<string, Selector<State, any>>
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
