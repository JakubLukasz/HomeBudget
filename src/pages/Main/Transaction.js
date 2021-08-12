import styled from "styled-components";
import Icon from "../../components/Icon";
import { devices } from "../../assets/devices";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px;
  padding: 0px 5px;

  @media ${devices.mobileM} {
    padding: 0px 10px;
  }
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100px;

  @media ${devices.mobileM} {
  }
`;

const Date = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Price = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
`;

const Transaction = ({
  title,
  amount,
  date,
  categoryTitle,
  categorySrc,
  isSpent,
}) => {
  return (
    <Container>
      <MainHeader>
        <CategoryContainer>
          <Category src={categorySrc} />
        </CategoryContainer>
        <header>
          <Title>{title}</Title>
          <Date>{date}</Date>
        </header>
      </MainHeader>
      <div>
        <Price isSpent>
          <span>
            {isSpent ? "-" : "+"}
            {amount}
          </span>{" "}
          zł
        </Price>
      </div>
    </Container>
  );
};

export default Transaction;
