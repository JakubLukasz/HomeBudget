import React from 'react'
import { styled } from '@mui/styles'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const Switch = styled(ToggleButtonGroup)({
  '& button': {
    flex: 1,
  },
})

interface Props {
  isSpent: boolean
  setIsSpent: (newValue: boolean) => void
}

const SpentSwitch: React.FC<Props> = ({ isSpent, setIsSpent }) => {
  const handleSwitch = (e, newValue: boolean) =>
    newValue !== null && setIsSpent(newValue)

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
  )
}

export default SpentSwitch
