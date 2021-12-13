import React from 'react'
import { styled } from '@mui/styles'
import Text from '@Components/atoms/Text'

const LogoText = styled(Text)(({ theme }) => ({
  fontWeight: 800,
  color: theme.palette.primary.main,
}))

const Logo: React.FC = () => {
  return <LogoText variant="h1">Daily Profit</LogoText>
}

export default Logo
