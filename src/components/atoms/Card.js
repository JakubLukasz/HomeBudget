import React from 'react';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';
import Text from '@Components/atoms/Text';

const Container = styled('div')({
  backgroundColor: '#ffffff',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px;',
  borderRadius: '15px',
  padding: '10px'
});

const Content = styled('div')((props) => ({
  padding: props.noMargin ? '15px 0' : '15px 10px',
}))

const Title = styled(Text)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.secondary.main
}))

const Card = ({ className, children, title }) => {
  return (
    <Container className={className}>
      {title && (
        <Title variant="p2">
          {title}
        </Title>
      )}
      <Content>
        {children}
      </Content>
    </Container>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Card;
