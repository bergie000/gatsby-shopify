import React from 'react';
import { Cart, Search } from 'components';
import { HeaderWrapper } from './styles';

export function Header() {
    return (
        <HeaderWrapper>
            <Search />
            <Cart />
        </HeaderWrapper>
    );
}