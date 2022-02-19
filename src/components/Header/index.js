import React from 'react';
import { Logo, Cart, Search } from 'components';
import { HeaderWrapper } from './styles';
import { Link } from 'gatsby'

export function Header() {
    return (
        <HeaderWrapper>
            <div>
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <Search />
            <Cart />
        </HeaderWrapper>
    );
}