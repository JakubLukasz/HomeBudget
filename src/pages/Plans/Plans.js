import styled from "styled-components";
import Card from "../../components/Card";

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 200vh;
  font-size: 1rem;
  padding: 1px 20px 0 20px;
  margin: -1px 0 0 0;
`;

const StyledUl = styled.ul`
  list-style: none;
`;

const StyledLi = styled.li``;

const Plans = () => {
  return (
    <StyledMain>
      <Card title="PLANS">
        <StyledUl>
          <StyledLi></StyledLi>
        </StyledUl>
      </Card>
    </StyledMain>
  );
};

export default Plans;
