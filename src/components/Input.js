import styled from 'styled-components';
import { TextField } from '@mui/material';

const Input = styled(TextField)`
  flex: 1;
  & label,
  & input,
  & p {
    font-size: 0.9rem;
    font-weight: 500;
  }
  & p {
    font-size: 0.7rem;
  }
`;

export default Input;
