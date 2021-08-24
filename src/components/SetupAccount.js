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
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  font-weight: 700;
  margin: 3px 0;
`;

const UserInput = styled.input`
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

const EarningsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const EarningsInput = styled(UserInput)`
  flex: 7;
  margin: 0;
`;

const Currency = styled.select`
  padding: 10px;
  flex: 1;
  margin-left: 20px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  font-weight: 800;

  &:focus,
  &:hover {
    outline: none;
  }
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

const CurrencyOption = styled.option`
  background: ${({ theme }) => theme.color.lightSecondary};
`;

const SetupAccount = () => {
  const { setupUserData, setIsConfigured } = useFirestore();
  const firstnameRef = useRef();
  const earningsRef = useRef();
  const currencyRef = useRef();
  const dateRef = useRef();
  const setupAccountHandler = async (e) => {
    e.preventDefault();
    try {
      await setupUserData({
        firstname: firstnameRef.current.value,
        earnings: parseFloat(earningsRef.current.value),
        moneyLeft: 0,
        payday: dateRef.current.value,
        currency: currencyRef.current.value,
        isConfigured: true,
        lastPayment: null,
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
            <CurrencyOption value="zł">zł</CurrencyOption>
            <CurrencyOption value="€">€</CurrencyOption>
            <CurrencyOption value="$">$</CurrencyOption>
          </Currency>
        </EarningsContainer>
        <Title htmlFor="date">PAYDAY (1-28)</Title>
        <UserInput ref={dateRef} type="text" name="date"></UserInput>
        <SubmitButton type="submit">DONE</SubmitButton>
      </SetupForm>
    </SetupAccountContainer>
  );
};

export default SetupAccount;
