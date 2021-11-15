import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import AppNav from '@Components/organisms/AppNav';

const Container = styled('div')({
  maxWidth: '100vw',
  height: 'var(--app-height)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column-reverse',

  '@media screen and (min-width:1024px)': {
    flexDirection: 'row',
  }
})

const AppTemplate = ({ children }) => {
  return (
    <Container>
      <AppNav />
      {children}
    </Container>
  );
};

AppTemplate.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
}

export default AppTemplate;
