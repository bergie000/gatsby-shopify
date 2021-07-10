import React from 'react';
import CartContext from 'context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import { Icon } from './styles';

export function RemoveItem({ lineItemId }) {
    const { removeLineItem } = React.useContext(CartContext);

    const handleClick = () => {
        removeLineItem(lineItemId);
    }

    return (
        <Icon onClick={handleClick}>
            <FaTrashAlt />
        </Icon>
    );
}