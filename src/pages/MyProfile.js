import styled from "styled-components";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 100vh;
  font-size: 1rem;
  margin-top: 10vh;
  padding: 0 20px;
`;

const MyProfile = () => {
  return <Container>MyProfile</Container>;
};

export default MyProfile;
