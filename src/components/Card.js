import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px 15px;
  margin: 10px 0;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.darkGray};
  font-weight: 800;
`;

const Card = ({ children, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default Card;
