import { Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { devices } from '@Assets/styles/devices';
import PropTypes from 'prop-types';

const Header = styled.header`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;

  @media ${devices.laptop} {
    display: none;
  }
`;

const PageHeader = ({ title }) => {
  return (
    <Header>
      <Typography variant="subtitle1" component="h2">
        {title}
      </Typography>
    </Header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
};

export default PageHeader;
