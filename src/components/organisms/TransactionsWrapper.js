import Transaction from '../molecules/Transaction';
import React from 'react';
import PropTypes from 'prop-types';
import NoData from '../molecules/NoData';

const TransactionsWrapper = ({ transactions, total }) => {
  if (transactions.length === 0)
    return <NoData text="Currently You have no transactions" />;
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
