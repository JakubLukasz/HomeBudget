import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';

import Button from '@Components/atoms/Button';
import Icon from '@Components/atoms/Icon';

const StyledButton = styled(Button)({
  margin: '40px 0',
})

const GuestLogin = ({ handleTestLogin }) => {

  return (
    <StyledButton
      startIcon={<Icon type="Person" />}
      onClick={handleTestLogin}
    >
      login as Guest
    </StyledButton>
  );
};

GuestLogin.propTypes = {
  handleTestLogin: PropTypes.func
};

export default GuestLogin;
