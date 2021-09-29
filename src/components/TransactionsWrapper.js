import styled from 'styled-components';
import Transaction from './Transaction';
import React from 'react';
import PropTypes from 'prop-types';

const Container = styled.div``;

const TransactionsWrapper = ({ transactions, total }) => {
  return (
    <Container>
      {transactions.map((transactionInfo) => (
        <Transaction {...total} key={transactionInfo.id} {...transactionInfo} />
      ))}
    </Container>
  );
};

TransactionsWrapper.propTypes = {
  transactions: PropTypes.array,
  total: PropTypes.object,
};

export default TransactionsWrapper;
