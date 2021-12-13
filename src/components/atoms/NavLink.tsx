import React from 'react'
import { NavLink as ReactNavLink } from 'react-router-dom'
import { styled } from '@mui/styles'

import Text from '@Components/atoms/Text'

const StyledLink = styled(ReactNavLink)(({ theme }) => ({
  textDecoration: 'none',
  padding: '10px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  '&.open svg': {
    fill: theme.palette.primary.main,
  },
}))

const LinkTitle = styled(Text)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.secondary.main,
  margin: '10px 0 0 0',
}))

interface IProps {
  Icon: any
  to: string
  title: string
  className?: string
}

const NavLink: React.FC<IProps> = ({ className, Icon, to, title }) => {
  return (
    <StyledLink className={className} exact to={to} activeClassName="open">
      <Icon fontSize="large" color="secondary" />
      <LinkTitle variant="p2">{title}</LinkTitle>
    </StyledLink>
  )
}

export default NavLink
