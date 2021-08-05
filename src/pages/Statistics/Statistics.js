import styled from "styled-components";

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 200vh;
`;

const Statistics = () => {
  return <StyledMain>Statistics</StyledMain>;
};

export default Statistics;
