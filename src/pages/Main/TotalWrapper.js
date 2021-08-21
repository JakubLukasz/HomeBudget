import styled from "styled-components";
import { devices } from "../../assets/devices";

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;

  @media ${devices.tablet} {
    padding: 0 10px;
  }

  @media ${devices.tabletVerL} {
    padding: 0 10px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const MoneyLeft = styled.span``;

const TotalWrapper = ({ moneyLeft, currency }) => {
  return (
    <Container>
      <Heading>
        <MoneyLeft>{moneyLeft}</MoneyLeft> {currency}
      </Heading>
    </Container>
  );
};

export default TotalWrapper;
