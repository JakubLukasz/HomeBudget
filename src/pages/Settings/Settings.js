import styled from "styled-components";

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 200vh;
  font-size: 1rem;
  padding: 1px 20px 0 20px;
  margin: -1px 0 0 0;
`;

const Settings = () => {
  return <StyledMain>Settings</StyledMain>;
};

export default Settings;
