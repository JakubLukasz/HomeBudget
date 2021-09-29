import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Switch = styled.div`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 7px;
  overflow: hidden;
  margin-top: 23px;
`;

const SwitchButton = styled.button`
  width: 50%;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme, isSpent }) =>
    isSpent ? theme.color.primary : 'white'};
  color: ${({ theme, isSpent }) => (isSpent ? 'white' : theme.color.primary)};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

const FormSwitch = ({ isSpent, setIsSpent }) => {
  return (
    <Switch>
      <SwitchButton
        isSpent={isSpent}
        type="button"
        onClick={() => setIsSpent((snapshot) => !snapshot)}
      >
        SPENT
      </SwitchButton>
      <SwitchButton
        isSpent={!isSpent}
        type="button"
        onClick={() => setIsSpent((snapshot) => !snapshot)}
      >
        EARNED
      </SwitchButton>
    </Switch>
  );
};

FormSwitch.propTypes = {
  isSpent: PropTypes.bool,
  setIsSpent: PropTypes.func,
};

export default FormSwitch;
