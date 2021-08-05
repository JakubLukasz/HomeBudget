import styled from 'styled-components';
import Card from '../../components/Card';
import TotalWrapper from './TotalWrapper';
import TransactionsWrapper from './TransactionsWrapper';

const StyledMain = styled.main`
  background-color: ${({theme}) => theme.color.lightPrimary};
  min-height:200vh;
  font-size:1rem;
  padding:1px 20px 0 20px;
  margin:-1px 0 0 0;
`;


const Main = () => {
    return(
        <StyledMain>
          <Card title="TOTAL">
            <TotalWrapper/>
          </Card>
          <Card title="TRANSACTIONS">
            <TransactionsWrapper/>
          </Card>         
        </StyledMain>
    )
}

export default Main;