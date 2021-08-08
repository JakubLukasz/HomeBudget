import styled from "styled-components";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;
`;

const MoneyLeft = styled.span``;

const TotalWrapper = () => {
  return (
    <Heading>
      <MoneyLeft>5000</MoneyLeft> zł
    </Heading>
  );
};

export default TotalWrapper;
