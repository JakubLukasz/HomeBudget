import styled from "styled-components";
import { useRef } from "react";
import { useFirestore } from "../contexts/FirestoreContext";

const SetupAccountContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: 800;
  text-align: center;
  font-size: 4rem;
  margin: 0 0 70px 0;
`;

const SetupForm = styled.form`
  font-family: ${({ theme }) => theme.font.family.montserrat};
  margin-bottom: 70px;
  padding: 50px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const UserInput = styled.input`
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

const EarningsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const EarningsInput = styled(UserInput)`
  width: 70%;
  margin: 0;
`;

const Currency = styled.select`
  padding: 10px;
  margin-left: 10px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.color.gray};
  border: none;
  font-weight: 800;
`;

const SubmitButton = styled.button`
  border: none;
  width: 100%;
  font-size: 1.7rem;
  font-weight: 800;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 15px;
`;

const SetupAccount = () => {
  const { setupUserData, setIsConfigured } = useFirestore();
  const firstnameRef = useRef();
  const earningsRef = useRef();
  const currencyRef = useRef();
  const setupAccountHandler = async (e) => {
    e.preventDefault();
    try {
      await setupUserData({
        firstname: firstnameRef.current.value,
        earnings: earningsRef.current.value,
        currency: currencyRef.current.value,
        isConfigured: true,
      });
      setIsConfigured(true);
    } catch {
      console.log("error");
    }
  };

  return (
    <SetupAccountContainer>
      <Heading>Setup Account</Heading>
      <SetupForm onSubmit={setupAccountHandler}>
        <Title>FIRST NAME</Title>
        <UserInput
          ref={firstnameRef}
          type="text"
          name="first-name"
          required
        ></UserInput>
        <Title>MONTHLY EARNINGS (NO TAXES)</Title>
        <EarningsContainer>
          <EarningsInput
            ref={earningsRef}
            type="number"
            name="earnings"
            required
          ></EarningsInput>
          <Currency name="currency" ref={currencyRef}>
            <option value="zł">zł</option>
            <option value="€">€</option>
            <option value="$">$</option>
          </Currency>
        </EarningsContainer>
        <SubmitButton type="submit">DONE</SubmitButton>
      </SetupForm>
    </SetupAccountContainer>
  );
};

export default SetupAccount;
