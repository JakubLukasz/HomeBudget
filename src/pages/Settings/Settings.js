import styled from "styled-components";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 200vh;
  font-size: 1rem;
  margin-top: 11vh;
  padding: 0 20px;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  padding: 10px 0;
  font-weight: 800;
`;

const Settings = () => {
  return (
    <Container>
      <Title>SETTINGS</Title>
    </Container>
  );
};

export default Settings;
