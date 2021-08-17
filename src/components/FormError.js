import styled from "styled-components";
import { useEffect } from "react";

const Container = styled.div`
  position: absolute;
  top: 50vh;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
  color: black;
  width: 80%;
  height: 150px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const TextContainer = styled.div``;

const Heading = styled.h1`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Text = styled.p`
  margin: 0;
  font-weight: 900;
  margin-top: 30px;
`;

const FormError = ({ setIsFormCorect, message }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsFormCorect(true);
    }, 2500);
  }, []);
  return (
    <Container>
      <TextContainer>
        <Heading>ERROR</Heading>
        <Text>{message ? message : "You must complete all the fields"}</Text>
      </TextContainer>
    </Container>
  );
};

export default FormError;
