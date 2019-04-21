import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export type CreateThemeFragment = (isDark: boolean) => ThemeOptions;

export const createThemeFragment: CreateThemeFragment = isDark => ({
  palette: {
    type: isDark ? 'dark' : 'light',
  },
});
