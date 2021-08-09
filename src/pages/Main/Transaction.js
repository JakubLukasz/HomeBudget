import styled from "styled-components";
import Icon from "../../components/Icon";
import TestIcon from "../../assets/images/plan.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  padding: 0 10px;
`;

const Category = styled(Icon)`
  height: 20px;
  width: auto;
`;

const CategoryContainer = styled.div`
  margin-right: 20px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  padding: 10px;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const Date = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
`;

const Transaction = ({ title, amount, date, category }) => {
  return (
    <Container>
      <MainHeader>
        <CategoryContainer>
          <Category src={TestIcon} />
        </CategoryContainer>
        <header>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </header>
      </MainHeader>
      <div>
        <Price>
          <span>{amount}</span> zł
        </Price>
      </div>
    </Container>
  );
};

export default Transaction;
