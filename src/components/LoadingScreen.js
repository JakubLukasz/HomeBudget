import styled from 'styled-components';
import React from 'react';

const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingIcon = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <Loading>
      <LoadingIcon></LoadingIcon>
    </Loading>
  );
};

export default LoadingScreen;
