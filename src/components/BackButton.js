import React from 'react';
import Icon from './Icon';
import BackIcon from '../assets/images/backIcon.svg';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: 30px;
  height: 30px;
`;

const BackButton = ({ click }) => {
  return (
    <Button onClick={click}>
      <Icon src={BackIcon} />
    </Button>
  );
};

BackButton.propTypes = {
  click: PropTypes.func,
};

export default BackButton;
