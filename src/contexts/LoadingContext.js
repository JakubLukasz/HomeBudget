import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const LoadingCtx = {
    isLoading,
    setIsLoading,
  };

  return (
    <LoadingContext.Provider value={LoadingCtx}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingContextProvider.propTypes = {
  children: PropTypes.node,
};
