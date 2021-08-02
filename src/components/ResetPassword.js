import styled from "styled-components";
import { useRef,useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';
import Error from './Error';

const StyledSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledForm = styled.form`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  width: 100%;
  max-width: 700px;
`;

const StyledLabel = styled.label`
  display:block;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: ${({theme})=> theme.color.darkGray};
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const StyledInput = styled.input`
  width:100%;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.4rem;
  font-weight: 800;
  background: ${({theme}) => theme.color.gray};
  border:none;
  border-radius: 7px;
  outline: none;
  padding:10px 15px;
  margin-bottom:15px;
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin:80px 0;
`;

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const StyledButton = styled.button`
  border: none;
  width:100%;
  font-size: 1.7rem;
  font-weight:800;
  background-color: ${({theme}) => theme.color.primary}; 
  color: ${({theme}) => theme.color.white};
  font-family: ${({ theme }) => theme.font.family.montserrat};
  border-radius: 7px;
  padding:10px 15px;
  margin-top:15px;
`;

const StyledLink = styled(Link)`
  color: ${({theme}) => theme.color.primary};
  font-weight:900;
  font-size:1.2rem;
  text-decoration:none;
  width:100%;
  display:block;
  text-align:center;
  margin:10px 0;
`;

const StyledMessage = styled.span`
  font-weight: 800;
  width:100%;
  display:block;
  text-align:center;
  margin:10px 0;
`;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [isLoading,setIsLoading] = useState(false);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try{
      setError("");
      setMessage("");
      setIsLoading(true);
      await resetPassword(emailRef.current.value)
      setMessage('Check your email')
    } catch{
      setError("Failed to reset password")
    }
    setIsLoading(false);
  }

  return(
  <>
    <StyledSection>
      <StyledHeading>Reset Password</StyledHeading>
      <StyledFormContainer>
        <StyledForm onSubmit={submitFormHandler}>
        {error && <Error message={error}/>}
        {message && <StyledMessage>{message}</StyledMessage>}
          <StyledLabel htmlFor="email">E-MAIL</StyledLabel>
          <StyledInput ref={emailRef} type="email" id="email" required />
          <StyledButton disabled={isLoading} >RESET</StyledButton>
          <StyledLink to="/login">Log In</StyledLink>
        </StyledForm>
      </StyledFormContainer>
    </StyledSection>
  </>
)}

export default ResetPassword;
