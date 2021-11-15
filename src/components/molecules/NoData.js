import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import Icon from '@Components/atoms/Icon';
import Text from '@Components/atoms/Text';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '30px 0',
  padding: '0 20px',
  textAlign: 'center',

  '@media screen and (min-width:1024px)': {
    margin: '100px 0',
  }
})

const IconBox = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: '1rem',
  borderRadius: '10px',
  marginBottom: '2rem',
}));

const DataIcon = styled(Icon)({
  fontSize: '6.25rem',

  '@media screen and (min-width:1024px)': {
    fontSize: '9rem',
  }
})

const Info = styled(Text)({
  fontWeight: 600,
})

const NoData = ({ text, icon }) => {
  return (
    <Container>
      <IconBox>
        <DataIcon type={icon} />
      </IconBox>
      <Info variant="p1">
        {text}
      </Info>
    </Container>
  );
};

NoData.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default NoData;
