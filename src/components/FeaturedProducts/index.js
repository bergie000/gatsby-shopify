import React from 'react';
import ProductContext from '../../context/ProductContext';
import { ProductsGrid } from 'components';

export function FeaturedProducts() {
    const { collections } = React.useContext(ProductContext);
    const featuredCollection = collections.find(collection => collection.title === 'Featured Hats')

    return (
        <section>
            <h3>Featured Hats</h3>
            <ProductsGrid products={featuredCollection.products} />
        </section>
    );
}