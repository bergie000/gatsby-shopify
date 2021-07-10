import React from 'react';
import { QuantityAdjusterWrapper, AdjusterButton } from './styles';

export function QuantityAdjuster({ item, onAdjust }) {
    const { quantity } = item;

    const handleDecrementQuantity = () => {
        onAdjust({ variantId: item.variant.id, quantity: -1 });
    }

    const handleIncrementQuantity = () => {
        onAdjust({ variantId: item.variant.id, quantity: 1 });
    }

    return (
        <QuantityAdjusterWrapper>
            <AdjusterButton role="button" onClick={handleDecrementQuantity}>-</AdjusterButton>
            <div>
                {quantity}
            </div>
            <AdjusterButton role="button" onClick={handleIncrementQuantity}>+</AdjusterButton>
        </QuantityAdjusterWrapper>
    );
}