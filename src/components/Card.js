import styled from "styled-components";

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  font-weight: 800;
`;

const Card = ({ className, children, title }) => {
  return (
    <div className={className}>
      <Title>{title}</Title>
      {children}
    </div>
  );
};

export default Card;
