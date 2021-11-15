import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


const Switch = styled(ToggleButtonGroup)({
  '& button': {
    flex: 1,
  }
})

const SpentSwitch = ({ isSpent, setIsSpent }) => {
  const handleSwitch = (e, newValue) => (newValue !== null) && setIsSpent(newValue);

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
