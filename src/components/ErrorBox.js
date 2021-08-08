import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffe8e8;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 7px;
`;

const Message = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8a0000;
`;

const ErrorBox = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default ErrorBox;
