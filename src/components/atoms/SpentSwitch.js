import React from 'react';
import styled from 'styled-components';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';

const Switch = styled(ToggleButtonGroup)`
  & button {
    flex: 1;
  }
`;

const SpentSwitch = ({ isSpent, setIsSpent }) => {
  const handleSwitch = (event, newAlignment) => {
    if (newAlignment !== null) {
      setIsSpent(newAlignment);
    }
  };

  return (
    <Switch
      value={isSpent}
      exclusive
      onChange={handleSwitch}
      aria-label="spent-toggle"
    >
      <ToggleButton value={true} aria-label="spent">
        Spent
      </ToggleButton>
      <ToggleButton value={false} aria-label="earned">
        Earned
      </ToggleButton>
    </Switch>
  );
};

SpentSwitch.propTypes = {
  isSpent: PropTypes.bool,
  setIsSpent: PropTypes.func,
};

export default SpentSwitch;
