import React from 'react';
import { SEO, Layout, Filters, ProductsGrid } from 'components';
import ProductContext from '../context/ProductContext';
import styled from 'styled-components';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

const Content = styled.div`
    display: grid;
    grid-gap: 20px;
    margin-top: 20px;
    grid-template-columns: 1fr 3fr;
`;

export default function AllProducts() {
    const { products, collections } = React.useContext(ProductContext);
    const collectionProductMap = {};

    const { search } = useLocation();
    const qs = queryString.parse(search);
    const selectedCollectionIds = qs.c?.split(',').filter(c => !!c) || [];
    const selectedCollectionIdsMap = {};
    const searchTerm = qs.s;

    selectedCollectionIds.forEach(collectionId => { // makes a map of the collection id's currently in the URL params
        selectedCollectionIdsMap[collectionId] = true;
    });

    if (collections) { // makes a map of all the collections and the products in them
        collections.forEach(collection => {
            collectionProductMap[collection.shopifyId] = {};
            collection.products.forEach(product => {
                collectionProductMap[collection.shopifyId][product.shopifyId] = true;
            });
        });
    }

    const filterByCategory = (product) => {
        if (Object.keys(selectedCollectionIds).length) { // if there are any URL params
            for (let key in selectedCollectionIdsMap) { // then loop through those collections
                if (collectionProductMap[key]?.[product.shopifyId]) { // and if that collection contains *this* product
                    return true;                // then show that product
                }
            }
            return false;
        }
        return true;            // but if there are no selected collections, then show all products
    }

    const filterBySearchTerm = (product) => {
        if (searchTerm) {
            return (product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);
            // checks if theres a search term, then checks if searchTerm is part of the product title.
            // if searchTerm doesnt exist, this will return -1. if the search term is at position 0, it will return 0 etc etc.
        }
        return true; // and if there is no search term, then show all products
    }

    const filteredProducts = products.filter(filterByCategory).filter(filterBySearchTerm);

    return (
        <Layout>
            <SEO title="All Products" description="All products in the MadHatter Store" />
            {!!searchTerm && !!filteredProducts.length &&
                <h3>Search term: <strong>'{searchTerm}'</strong></h3>
            }
            {!!filteredProducts.length &&
                <h4>{filteredProducts.length} products</h4>
            }
            <Content>
                <Filters />
                {!!filteredProducts.length &&
                    <div>
                        <ProductsGrid products={filteredProducts} />
                    </div>
                }
                {!filteredProducts.length &&
                    <div>
                        <h3>
                            <span>Oh no! Nothing matches</span>
                            &nbsp;
                            <strong>'{searchTerm}'</strong>
                        </h3>
                        <div>
                            To help with your search why not try:
                            <br />
                            <br />
                            <ul>
                                <li>Checking your spelling</li>
                                <li>Using fewer words</li>
                                <li>Try using a different search term</li>
                            </ul>
                        </div>
                    </div>
                }
            </Content>
        </Layout>
    );
}
