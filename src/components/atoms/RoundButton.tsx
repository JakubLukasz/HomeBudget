import React from 'react'
import { styled } from '@mui/styles'

import Text from '@Components/atoms/Text'

const AddButton = styled('button')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '@media screen and (min-width: 1024px)': {
    order: -1,
  },
})

const IconBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  padding: '1rem',
  marginBottom: '0.5rem',
}))

const ButtonText = styled(Text)({
  fontWeight: 600,
})

interface IProps {
  onClick: () => void
  text: string
  Icon: any
  className?: string
}

const RoundButton: React.FC<IProps> = ({ onClick, text, Icon, className }) => {
  return (
    <AddButton className={className} onClick={onClick}>
      <IconBox>
        <Icon />
      </IconBox>
      <ButtonText variant="p1">{text}</ButtonText>
    </AddButton>
  )
}

export default RoundButton
