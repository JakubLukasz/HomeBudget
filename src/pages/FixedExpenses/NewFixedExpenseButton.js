import styled from "styled-components";

const AddNewFixedExpense = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 15px;
  border: none;
  display: flex;
  font-size: 1.7rem;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const NewFixedExpenseButton = () => {
  const addNewFixedExpenseHandler = () => {};

  return (
    <AddNewFixedExpense onClick={addNewFixedExpenseHandler}>
      ADD PLAN
    </AddNewFixedExpense>
  );
};

export default NewFixedExpenseButton;
