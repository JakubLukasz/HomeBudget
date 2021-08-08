import styled from "styled-components";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 100vh;
  font-size: 1rem;
  margin-top: 10vh;
  padding: 0 20px;
`;

const Statistics = () => {
  return <Container>Statistics</Container>;
};

export default Statistics;
