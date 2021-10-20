import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { uniqueKey } from '../helpers/uniqueKey';
import { useFirestore } from '../hooks/useFirestore';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const GuestLogin = ({ setFormError }) => {
  const { signup } = useAuth();
  const { createUserData } = useFirestore();
  const history = useHistory();

  const handleTestLogin = async () => {
    try {
      const id = await uniqueKey();
      const email = `${id}@gmail.com`;
      const password = `${id}`;
      const { user } = await signup(email, password);
      await createUserData(user);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <Button
      sx={{ m: 6 }}
      variant="contained"
      startIcon={<PersonIcon />}
      onClick={handleTestLogin}
    >
      login as Guest
    </Button>
  );
};

GuestLogin.propTypes = {
  setFormError: PropTypes.func,
};

export default GuestLogin;
