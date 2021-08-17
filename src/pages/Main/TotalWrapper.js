import styled from "styled-components";
import Icon from "../../components/Icon";
import circleIcon from "../../assets/images/circle.svg";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuickInfo = styled.div``;

const MonthInfo = styled.span`
  font-size: 1.3rem;
  font-weight: 900;
`;

const MonthBar = styled.div``;

const MoneyLeft = styled.span``;

const TotalWrapper = ({ moneyLeft, currency, transactions, payday }) => {
  return (
    <Container>
      <Heading>
        <MoneyLeft>{moneyLeft}</MoneyLeft> {currency}
      </Heading>
      <QuickInfo>
        <MonthInfo>Month Savings: </MonthInfo>
        <MonthBar></MonthBar>
      </QuickInfo>
    </Container>
  );
};

export default TotalWrapper;
