import styled from 'styled-components';
import { theme } from '../assets/styles/theme';

const StyledContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content: center;
  background-color:#ffe8e8;
  padding:10px 15px;
  margin-bottom:20px;
  border-radius: 7px;
`;

const StyledMessage = styled.span`
  font-size:1.5rem;
  font-weight:700;
  color: #8a0000;
`;

const Error = ({message}) => {
    return(
        <StyledContainer>
            <StyledMessage>{message}</StyledMessage>
        </StyledContainer>
    )
}

export default Error;