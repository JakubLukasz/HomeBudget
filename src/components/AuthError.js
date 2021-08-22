import styled from "styled-components";

const Container = styled.div`
  background-color: #fcd7d7;
  width: 100%;
  padding: 20px;
  border-radius: 7px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #e03636;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0;
`;

const AuthError = ({ message }) => {
  return (
    <Container>
      <Text>{message}</Text>
    </Container>
  );
};

export default AuthError;
