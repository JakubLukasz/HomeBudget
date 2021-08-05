import styled from "styled-components";
import { devices } from "../assets/devices";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/Error";
import { useFirestore } from "../contexts/FirestoreContext";

const StyledSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  width: 100%;
  max-width: 700px;
  margin-bottom: 70px;
`;

const StyledLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const StyledInput = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.4rem;
  font-weight: 800;
  background: ${({ theme }) => theme.color.gray};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
  margin-bottom: 15px;
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 70px;
`;

const StyledFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const StyledButton = styled.button`
  border: none;
  width: 100%;
  font-size: 1.7rem;
  font-weight: 800;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  font-family: ${({ theme }) => theme.font.family.montserrat};
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 15px;
`;

const StyledSpan = styled.span`
  display: block;
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
  margin: 20px 0;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 900;
  font-size: 1.2rem;
  text-decoration: none;
`;

const Login = (props) => {
  const { login } = useAuth();
  const { createUserData } = useFirestore();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Log in");
    }
    setIsLoading(false);
  };

  return (
    <>
      <StyledSection>
        <StyledHeading>Log in</StyledHeading>
        <StyledFormContainer>
          <StyledForm onSubmit={submitFormHandler}>
            {error && <Error message={error} />}
            <StyledLabel htmlFor="email">E-MAIL</StyledLabel>
            <StyledInput ref={emailRef} type="email" id="email" required />
            <StyledLabel htmlFor="password">PASSWORD</StyledLabel>
            <StyledInput
              ref={passwordRef}
              type="password"
              id="password"
              required
            />
            <StyledLink to="/reset-password">Forgot password?</StyledLink>
            <StyledButton disabled={isLoading}>LOG IN</StyledButton>
            <StyledSpan>
              Want to create an account?{" "}
              <StyledLink to="/signup">Sign up</StyledLink>
            </StyledSpan>
          </StyledForm>
        </StyledFormContainer>
      </StyledSection>
    </>
  );
};

export default Login;
