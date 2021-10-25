import React from 'react';
import { Typography } from '@mui/material';
import { styled as restyled } from '@mui/styles';

const Text = restyled(Typography)(({ theme }) => ({
  fontWeight: '800',
  color: theme.palette.primary.main,
}));

const Logo = () => {
  return <Text variant="h3">Daily Profit</Text>;
};

export default Logo;
