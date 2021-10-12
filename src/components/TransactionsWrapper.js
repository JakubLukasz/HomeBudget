import Transaction from './Transaction';
import React from 'react';
import PropTypes from 'prop-types';
import NoTransactions from './NoTransactions';

const TransactionsWrapper = ({ transactions, total }) => {
  if (transactions.length === 0)
    return <NoTransactions text={'Currently You have no transactions'} />;
  else
    return (
      <div>
        {transactions.map((transactionInfo) => (
          <Transaction
            {...total}
            key={transactionInfo.id}
            {...transactionInfo}
          />
        ))}
      </div>
    );
};

TransactionsWrapper.propTypes = {
  transactions: PropTypes.array,
  total: PropTypes.object,
};

export default TransactionsWrapper;
