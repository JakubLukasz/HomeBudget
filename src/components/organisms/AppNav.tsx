import React from 'react'
import { styled } from '@mui/styles'

import StatisticIcon from '@mui/icons-material/Equalizer'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import ExpenseIcon from '@mui/icons-material/Assignment'

import Text from '@Components/atoms/Text'
import NavLink from '@Components/atoms/NavLink'
import Button from '@Components/atoms/Button'

import { useHistory } from 'react-router'
import { useAuth } from '@Hooks/useAuth'

const Navigation = styled('nav')({
  display: 'flex',
  alignItems: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 50px',
  backgroundColor: '#ffffff',

  '@media screen and (min-width:1024px)': {
    paddingTop: '20px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    right: 'auto',
  },
})

const LinkTitle = styled(Text)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.secondary.main,
  margin: '10px 0 0 0',
}))

const HomeLink = styled(NavLink)({
  '@media screen and (min-width: 1024px)': {
    order: -2,
  },
})

const LogOutButton = styled(Button)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.7rem',
  textTransform: 'capitalize',
})

const AppNav: React.FC = () => {
  const history = useHistory()
  const { logout } = useAuth()

  const logOutHandler = async () => {
    try {
      await logout()
      history.push('/login')
    } catch {
      console.error('logout error')
    }
  }

  return (
    <Navigation>
      <NavLink to="/statistics" title="Statistics" Icon={StatisticIcon} />
      <NavLink to="/expenses" title="Expenses" Icon={ExpenseIcon} />
      <HomeLink to="/" title="Home" Icon={HomeIcon} />
      <LogOutButton secondary onClick={logOutHandler}>
        <LogoutIcon color="secondary" fontSize="large" />
        <LinkTitle variant="p2">Log out</LinkTitle>
      </LogOutButton>
    </Navigation>
  )
}

export default AppNav
