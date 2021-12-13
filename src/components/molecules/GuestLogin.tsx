import React from 'react'
import { styled } from '@mui/styles'

import Button from '@Components/atoms/Button'
import PersonIcon from '@mui/icons-material/Person'

const StyledButton = styled(Button)({
  margin: '40px 0',
})

interface IProps {
  handleTestLogin: () => Promise<void>
}

const GuestLogin: React.FC<IProps> = ({ handleTestLogin }) => {
  return (
    <StyledButton startIcon={<PersonIcon />} onClick={handleTestLogin}>
      login as Guest
    </StyledButton>
  )
}

export default GuestLogin
