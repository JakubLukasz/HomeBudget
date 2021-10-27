import React from 'react';
import PropTypes from 'prop-types';
import AppNav from '../components/organisms/Nav';
import { devices } from '../assets/styles/devices';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 100vw;
  height: var(--app-height);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media ${devices.laptop} {
    flex-direction: row-reverse;
  }
`;

const AppTemplate = (props) => {
  const { children } = props

  return (
    <Container>
      {children}
      <AppNav />
    </Container>
  );
};

AppTemplate.propTypes = {
  children: PropTypes.node
}

export default AppTemplate;
