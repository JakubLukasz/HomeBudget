import { useMediaQuery } from '@mui/material';

export const getGridMediaQuery = () => {
  const tablet = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const laptop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const desktop = useMediaQuery((theme) => theme.breakpoints.up('xl'));
  const getGridMediaQueries = (tablet, laptop, desktop) => {
    if (tablet) {
      if (laptop) {
        if (desktop) {
          return 3;
        }
        return 4;
      }
      return 6;
    }
    return 12;
  };
  return getGridMediaQueries(tablet, laptop, desktop);
};
