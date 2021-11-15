import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/styles';
import { TextField } from '@mui/material';

const InputField = styled(TextField)({
  flex: 1,
  '& label,& input,& p': {
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  '& p': {
    fontSize: '0.7rem',
  }
})

const Input = (({ Name, Label, Errors, Register, Type, ...restProps }) =>
  <InputField
    label={Label}
    variant="filled"
    size="small"
    type={Type ?? "text"}
    name={Name}
    error={Errors ? true : false}
    helperText={Errors ? Errors.message : ''}
    {...Register}
    {...restProps}
  />
)

Input.propTypes = {
  Name: PropTypes.string,
  Label: PropTypes.string,
  Errors: PropTypes.object,
  Type: PropTypes.string,
  Register: PropTypes.any
}

export default Input;
