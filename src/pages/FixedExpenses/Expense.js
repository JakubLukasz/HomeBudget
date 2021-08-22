import styled from "styled-components";
import { devices } from "../../assets/devices";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 5px;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  padding: 15px 20px;
  border-radius: 15px;

  /* @media ${devices.mobileM} {
    padding: 0px 10px;
  }

  @media ${devices.laptop} {
    padding: 0px 10px;
    margin: 15px 0;
  } */
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100px;

  @media ${devices.mobileM} {
    max-width: 200px;
  }

  @media ${devices.laptop} {
    max-width: 500px;
  }
`;

const Price = styled.span`
  color: ${({ isSpent }) => (isSpent ? "red" : "green")};
  font-size: 1.3rem;
  font-weight: 700;
`;

const Expense = ({
  amount,
  dayOfCollection,
  months,
  title,
  isSpent,
  currency,
}) => {
  return (
    <Container>
      <MainHeader>
        <header>
          <Title>{title}</Title>
        </header>
      </MainHeader>
      <div>
        <Price isSpent={isSpent}>
          <span>
            {isSpent ? "-" : "+"}
            {amount}
          </span>{" "}
          {currency}
        </Price>
      </div>
    </Container>
  );
};

export default Expense;
