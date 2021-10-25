import React from 'react';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import { Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 94vw;
  background-color: #ffffff;
  position: fixed;
  top: 3vw;
  bottom: 3vw;
  left: 3vw;
  right: 3vw;
  color: black;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ margin }) => (margin ? 'space-between' : '')};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 2rem;

  @media ${devices.tablet} {
    width: 500px;
    height: 650px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  width: 100%;
  overflow: auto;
`;

const SButton = styled(Button)`
  min-width: auto;
`;

const ModalTemplate = ({ children, title, onClose, margin }) => {
  return (
    <Container margin={margin}>
      <Header>
        <Typography sx={{ p: 1 }} variant="h5">
          {title}
        </Typography>
        <SButton onClick={onClose}>
          <CloseIcon sx={{ fontSize: 30 }} />
        </SButton>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

ModalTemplate.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
  margin: PropTypes.bool,
};

export default ModalTemplate;
