import defaultProfilePicture from '../../assets/images/default_profile_picture.jpg';
import styled from 'styled-components';

const StyledImg = styled.img`
  width:auto;
  height:30px;
  border-radius: 50%;
`;

const ProfileHead = ({src}) => {
    return(<StyledImg src={src ? src : defaultProfilePicture} />)
}

export default ProfileHead;