import React from 'react';
import { Header } from '../Header';
import { LayoutWrapper } from './styles';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LayoutWrapper>
        <main>{children}</main>
      </LayoutWrapper>
    </>
  );
};

export { Layout };
