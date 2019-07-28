import { useMediaQuery, useTheme } from '@material-ui/core';

export const useIsNotSmallScreen = () => {
  const theme = useTheme();

  const isNotSmallScreen = useMediaQuery(theme.breakpoints.up('md'));

  return isNotSmallScreen;
};
