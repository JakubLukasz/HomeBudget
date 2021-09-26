import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import logOutIcon from '../assets/images/log-out.svg';
import Icon from './Icon';

const LinkIcon = styled(Icon)`
  width: auto;
  height: 2.5rem;
  svg,
  path {
    fill: ${({ theme }) => theme.color.secondary};
  }
`;

const LinkTitle = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.medim};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  margin: 10px 0 0 0;

  @media ${devices.mobileM} {
    font-size: 1.2rem;
  }
`;

const NavButton = styled.button`
  position: relative;
  background: none;
  border: none;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LogOutButton = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const logOutHandler = async () => {
    try {
      await logout();
      history.push('/login');
    } catch {
      console.error('error');
    }
  };
  return (
    <NavButton onClick={logOutHandler}>
      <LinkIcon src={logOutIcon} />
      <LinkTitle>Log Out</LinkTitle>
    </NavButton>
  );
};

export default LogOutButton;
