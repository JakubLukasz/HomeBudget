import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const Text = styled(Typography)`
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
  color: ${({ theme }) => theme.color.primary};
`;

const Logo = () => {
  return <Text variant="h3">Daily Profit</Text>;
};

export default Logo;
