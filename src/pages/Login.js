import styled from "styled-components";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import ErrorBox from "../components/ErrorBox";

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const LoginForm = styled.form`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  width: 100%;
  max-width: 700px;
  margin-bottom: 70px;
`;

const InputLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const InputField = styled.input`
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-size: 1.4rem;
  font-weight: 800;
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
  margin-bottom: 15px;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin-bottom: 70px;
`;

const SubmitButton = styled.button`
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

const LinkText = styled.span`
  display: block;
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
  margin: 20px 0;
  font-weight: 600;
`;

const FormLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: 900;
  font-size: 1.2rem;
  text-decoration: none;
`;

const Login = () => {
  const { login } = useAuth();
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
      <Container>
        <Heading>Log in</Heading>
        <FormContainer>
          <LoginForm onSubmit={submitFormHandler}>
            {error && <ErrorBox message={error} />}
            <InputLabel htmlFor="email">E-MAIL</InputLabel>
            <InputField ref={emailRef} type="email" id="email" required />
            <InputLabel htmlFor="password">PASSWORD</InputLabel>
            <InputField
              ref={passwordRef}
              type="password"
              id="password"
              required
            />
            <FormLink to="/reset-password">Forgot password?</FormLink>
            <SubmitButton disabled={isLoading}>LOG IN</SubmitButton>
            <LinkText>
              Want to create an account?{" "}
              <FormLink to="/signup">Sign up</FormLink>
            </LinkText>
          </LoginForm>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
