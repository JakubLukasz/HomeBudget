import styled from 'styled-components';

const StyledMain = styled.main`
  background-color: ${({theme}) => theme.color.lightPrimary};
  min-height:200vh;
  
`;

const MyProfile = () => {
    return(
        <StyledMain>
            MyProfile
        </StyledMain>
    )
}

export default MyProfile;