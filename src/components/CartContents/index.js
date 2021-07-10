import React from 'react';
import CartContext from 'context/CartContext';
import { CartHeader, CartItem, CartFooter } from './styles';
import { QuantityAdjuster } from '../QuantityAdjuster';
import { RemoveItem } from '../RemoveItem';

export function CartContents() {
    const { checkout, updateLineItem } = React.useContext(CartContext);

    const handleAdjustQuantity = ({ variantId, quantity }) => {
        updateLineItem({ quantity, variantId });
    }

    return (
        <section>
            <h1>Your Cart:</h1>
            <CartHeader>
                <div>Product</div>
                <div>Unit Price</div>
                <div>Quantity</div>
                <div>Amount</div>
            </CartHeader>
            {checkout?.lineItems?.map(item => (
                <CartItem key={item.variant.id}>
                    <div>
                        <div>
                            {item.title}
                        </div>
                        <div>
                            {item.variant.title === 'Default Title' ? '' : item.variant.title}
                        </div>
                    </div>
                    <div>
                        €{item.variant.price}
                    </div>
                    <div>
                        <QuantityAdjuster item={item} onAdjust={handleAdjustQuantity} />
                    </div>
                    <div>
                        €{(item.quantity * item.variant.price).toFixed(2)}
                        {/* to 2 decimal places */}
                    </div>
                    <div>
                        <RemoveItem lineItemId={item.id} />
                    </div>
                </CartItem>
            ))}
            <CartFooter>
                <div>
                    <strong>Total:</strong>
                </div>
                <div>
                    <span>€{checkout?.totalPrice}</span>
                </div>
            </CartFooter>
        </section>
    );
}