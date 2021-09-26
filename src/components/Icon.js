import SVG from 'react-inlinesvg';
import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const IconSVG = styled(SVG)`
  width: 100%;
  height: 100%;
`;

const Icon = ({ src, ...props }) => {
  return (
    <div {...props}>
      <IconSVG src={src}></IconSVG>
    </div>
  );
};

Icon.propTypes = {
  src: PropTypes.string,
};

export default Icon;
