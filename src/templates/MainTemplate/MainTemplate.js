import { ThemeProvider } from "styled-components";
import { theme } from "../../assets/styles/theme";
import GlobalStyles from "../../assets/styles/GlobalStyle";

const MainTemplate = ({ children }) => (
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
export default MainTemplate;
