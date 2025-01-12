import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { useWebSocket } from '../../hooks/useWebSocket';

const WebSocketInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connect } = useWebSocket();

  useEffect(() => {
    connect();
  },[]);

  return <>{children}</>;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <WebSocketInitializer>
        {children}
      </WebSocketInitializer>
    </RecoilRoot>
  );
};