import { useEffect } from "react/cjs/react.development";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fcd7d7;
  width: 50%;
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #e03636;
  font-weight: 600;
  font-size: 1.4rem;
  text-align: center;
  margin: 0;
`;

const ErrorBox = ({ setIsErrorBoxOpen, message }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsErrorBoxOpen(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Text>{message ? message : "You must complete all fields"}</Text>
    </Container>
  );
};

export default ErrorBox;
