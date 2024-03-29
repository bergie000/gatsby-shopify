/* eslint-disable jsx-a11y/no-onchange */

import React from 'react';
import { graphql } from 'gatsby';
import { SEO, Layout, ImageGallery, ProductQuantityAdder, Button } from 'components';
import { Grid, SelectWrapper, Price } from './styles';
import CartContext from 'context/CartContext';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';

export const query = graphql`
    query ProductQuery($shopifyId: String) {
        shopifyProduct(shopifyId: {eq: $shopifyId}) {
            ...ShopifyProductFields
        }
    }
`;

export default function ProductTemplate(props) {

    const { getProductById } = React.useContext(CartContext);
    const [product, setProduct] = React.useState(null);
    const [selectedVariant, setSelectedVariant] = React.useState(null);
    const { search, origin, pathname } = useLocation();
    const variantId = queryString.parse(search).variant;

    React.useEffect(() => {
        getProductById(props.data.shopifyProduct.shopifyId).then((result) => {
            setProduct(result);
            setSelectedVariant(result.variants.find((({ id }) => id === variantId)) || result.variants[0]);
        });
    }, [
        getProductById,
        props.data.shopifyProduct.shopifyId,
        setProduct,
        setSelectedVariant,
        variantId
    ]);

    const handleVariantChange = (e) => {
        const newVariant = product?.variants.find(v => v.id === e.target.value);
        setSelectedVariant(newVariant);
        navigate(`${origin}${pathname}?variant=${encodeURIComponent(newVariant.id)}`, {
            replace: true
        });
    }

    return (
        <Layout>
            <SEO
                title={props.data.shopifyProduct.title}
                description={props.data.shopifyProduct.description}
            />
            <Button onClick={() => navigate(-1)}>Back to products</Button>
            <Grid>
                <div>
                    <h1>{props.data.shopifyProduct.title}</h1>
                    <p>{props.data.shopifyProduct.description}</p>
                    {product?.availableForSale && !!selectedVariant &&
                        <>
                            {product?.variants.length > 1 &&
                                <SelectWrapper>
                                    <strong>Style</strong>
                                    <select
                                        value={selectedVariant.id}
                                        onChange={handleVariantChange}
                                    >
                                        {product?.variants.map(v => (
                                            <option key={v.id} value={v.id}>
                                                {v.title}
                                            </option>
                                        ))}
                                    </select>
                                </SelectWrapper>
                            }
                            {!!selectedVariant && (
                                <>
                                    <Price>
                                        €{selectedVariant.price}
                                    </Price>
                                    <ProductQuantityAdder
                                        available={selectedVariant.available}
                                        variantId={selectedVariant.id}
                                    />
                                </>
                            )}
                        </>
                    }
                </div>
                <div>
                    <ImageGallery selectedVariantImageId={selectedVariant?.image.id} images={props.data.shopifyProduct.images} />
                </div>
            </Grid>
        </Layout>
    );
};