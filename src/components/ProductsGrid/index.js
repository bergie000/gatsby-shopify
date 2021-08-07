import React from 'react';
import { ProductsGridWrapper } from './styles';
import { ProductTile } from 'components';

export function ProductsGrid({ products }) {
    return (
        <ProductsGridWrapper>
            {products.map(product => (
                <ProductTile
                    key={product.shopifyId}
                    imageFluid={product.images[0].localFile.childImageSharp.fluid}
                    title={product.title}
                    description={product.description}
                    minPrice={product.priceRange.minVariantPrice.amount}
                    handle={product.handle}
                />
            ))}
        </ProductsGridWrapper>
    );
}