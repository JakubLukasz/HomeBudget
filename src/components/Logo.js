import React from 'react';
import styled from 'styled-components';

const Color = styled.span`
  color: ${({ theme }) => theme.color.primary};
`;

const LogoElement = styled.p`
  color: #292929;
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
  font-size: 4rem;
`;

const Logo = () => {
  return (
    <LogoElement>
      Daily<Color>Profit</Color>
    </LogoElement>
  );
};

export default Logo;
