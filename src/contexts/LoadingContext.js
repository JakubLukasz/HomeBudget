import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext({});

export const useLoading = () => {
  return useContext(LoadingContext);
};

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
