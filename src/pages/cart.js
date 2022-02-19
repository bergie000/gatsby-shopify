import React from 'react';
import { SEO, Layout, CartContents } from 'components';

export default function CartPage() {
    return (
        <Layout>
            <SEO title="My Cart" description="Your Cart" />
            <CartContents />
        </Layout>
    );
}