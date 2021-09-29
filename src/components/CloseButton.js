import React from 'react';
import Icon from './Icon';
import CloseIcon from '../assets/images/closeIcon.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = ({ className, click }) => {
  return (
    <Button className={className} onClick={click}>
      <Icon src={CloseIcon} />
    </Button>
  );
};

CloseButton.propTypes = {
  click: PropTypes.func,
  className: PropTypes.string,
};

export default CloseButton;
