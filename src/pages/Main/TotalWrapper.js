import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin: 5px 0;
`;

const StyledSpan = styled.span`
  
`;

const TotalWrapper = () => {
    return(
        <StyledHeading><StyledSpan>5000</StyledSpan> zł</StyledHeading>
    )
}

export default TotalWrapper;