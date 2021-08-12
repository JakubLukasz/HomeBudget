import styled from "styled-components";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;
`;

const MoneyLeft = styled.span``;

const TotalWrapper = ({ moneyLeft, currency }) => {
  return (
    <Heading>
      <MoneyLeft>{moneyLeft}</MoneyLeft> {currency}
    </Heading>
  );
};

export default TotalWrapper;
