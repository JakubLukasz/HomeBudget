import React from 'react';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';

import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';
import Button from '@Components/atoms/Button';

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(112,112,112,0.4)',
  zIndex: 99,
})

const Modal = styled('div')({
  width: '94vw',
  backgroundColor: '#ffffff',
  position: 'fixed',
  top: '3vw',
  bottom: '3vw',
  left: '3vw',
  right: '3vw',
  color: 'black',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '15px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
  padding: '2rem',

  '@media screen and (min-width: 768px)': {
    width: '500px',
    maxHeight: '90vh',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  }
})

const Header = styled('header')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
})

const Content = styled('div')({
  width: '100%',
  height: '100%',
  overflow: 'auto',
})

const Title = styled(Text)({
  padding: "10px",
})

const CloseButton = styled(Button)({
  minWidth: 'auto',
})

const ModalTemplate = ({ children, title, onClose }) => {
  return (
    <Background className="background" onClick={(e) => e.target.classList.contains('background') && onClose()}>
      <Modal>
        <Header>
          <Title variant="h5">
            {title}
          </Title>
          <CloseButton onClick={onClose} secondary>
            <Icon type="Close" sx={{ fontSize: 30 }} />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
      </Modal>
    </Background>
  );
};

ModalTemplate.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalTemplate;
