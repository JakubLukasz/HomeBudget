import styled from "styled-components";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 100vh;
  font-size: 1rem;
  padding: 10px 20px 0;
`;

const Statistics = () => {
  return <Container>Statistics</Container>;
};

export default Statistics;
