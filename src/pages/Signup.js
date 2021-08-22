import styled from "styled-components";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "../contexts/FirestoreContext";
import { Link, useHistory } from "react-router-dom";
import AuthError from "../components/AuthError";
import { devices } from "../assets/devices";

const Container = styled.section`
  width: 100vw;
  height: 100vh;
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

const SignupForm = styled.form`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  width: 100%;
  max-width: 700px;
  margin-bottom: 70px;

  @media ${devices.tablet} {
    min-width: 300px;
  }

  @media ${devices.tabletVer} {
    min-width: 300px;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.font.family.montserrat};
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
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

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const { createUserData } = useFirestore();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords are not the same");
    }

    try {
      setError("");
      setIsLoading(true);
      const { user } = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await createUserData(user);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Heading>Sign up</Heading>
      <FormContainer>
        <SignupForm onSubmit={submitFormHandler}>
          {error && <AuthError message={error} />}
          <InputLabel htmlFor="email">E-MAIL</InputLabel>
          <InputField ref={emailRef} type="email" id="email" required />
          <InputLabel htmlFor="password">PASSWORD</InputLabel>
          <InputField
            ref={passwordRef}
            type="password"
            id="password"
            required
          />
          <InputLabel htmlFor="confirm-password">CONFIRM PASSWORD</InputLabel>
          <InputField
            ref={confirmPasswordRef}
            type="password"
            id="confirm-password"
            required
          />
          <SubmitButton disabled={isLoading}>SIGN UP</SubmitButton>
          <LinkText>
            already have an account? <FormLink to="/login">Log In</FormLink>
          </LinkText>
        </SignupForm>
      </FormContainer>
    </Container>
  );
};

export default Signup;
