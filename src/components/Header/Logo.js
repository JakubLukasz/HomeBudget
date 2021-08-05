import Icon from '../Icon';
import LogoImg from '../../assets/images/logo.svg';
import styled from 'styled-components';

const StyledIcon = styled(Icon)`
  width:auto;
  height:30px;
`;

const Logo = () => {
    return(<StyledIcon src={LogoImg}></StyledIcon>)
}

export default Logo;