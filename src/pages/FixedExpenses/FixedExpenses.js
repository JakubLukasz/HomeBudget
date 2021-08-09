import styled from "styled-components";
import AddNewFixedExpenseButton from "./NewFixedExpenseButton";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 200vh;
  font-size: 1rem;
  margin-top: 11vh;
  padding: 0 20px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  padding: 10px 0;
  font-weight: 800;
`;

const FixedExpenses = () => {
  return (
    <Container>
      <Title>FIXED EXPENSES</Title>
      <AddNewFixedExpenseButton />
    </Container>
  );
};

export default FixedExpenses;
