import styled from 'styled-components';
import Logo from './Logo';
import { Link } from 'react-router-dom'

const StyledHeader = styled.header`
  position:fixed;
  top:0;
  left:0;
  right:0;
  display: flex;
  background-color: ${({theme}) => theme.color.white};
  padding:20px 15px;
`;

const Header = () => {
    return(
        <StyledHeader>
            <Link to="/"><Logo /></Link>
        </StyledHeader>
    )
}

export default Header;