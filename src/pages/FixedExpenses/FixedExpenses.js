import styled from "styled-components";
import AddNewFixedExpenseButton from "./NewFixedExpenseButton";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 200vh;
  font-size: 1rem;
  margin-top: 10vh;
  padding: 0 20px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.darkGray};
  padding: 10px 15px;
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
