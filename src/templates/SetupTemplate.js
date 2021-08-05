import { ThemeProvider } from "styled-components";
import { theme } from "../assets/styles/theme";
import GlobalStyles from "../assets/styles/GlobalStyle";

const SetupTemplate = ({ children }) => (
  <>
    <GlobalStyles theme={theme}/>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
export default SetupTemplate;
