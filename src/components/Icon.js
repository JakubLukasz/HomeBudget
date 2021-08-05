import SVG from 'react-inlinesvg';
import styled from 'styled-components';
const StyledSVG = styled(SVG)`
  width:100%;
  height:100%;
`;

const Icon = ({src,...props}) => {
    return(
        <div {...props}>
            <StyledSVG src={src}></StyledSVG>
        </div>
    )
}

export default Icon;