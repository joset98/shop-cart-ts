import { Button, Stack } from "react-bootstrap";
import { useShoppingContext } from "../../context/ShoppingCartContext";

import "./styles.css";
import storeItems from "../../data/shop-items.json";
import { formatCurrency } from "../../utils/formatCurrency";

type CartItemProps = {
    id: number,
    quantity: number,
}

const CartItem = ({id, quantity}: CartItemProps) => {
    const {removeFromCart} = useShoppingContext();
    const currentItem = storeItems.find( item => item.id === id );

    if (currentItem == null) return null;
    
    return (
        <>
            <Stack className="d-flex align-items-center" direction="horizontal" gap={2}>
                <img className="shopping-cart-image" src={currentItem.imgUrl} alt="" />
            <div className="me-auto">
                <div>
                    {currentItem.name}
                    {
                        quantity > 1 && (
                        <span className="text-muted label-quantity">
                            x {quantity}
                        </span>)
                    }
                </div>
                <div className="text-muted label-price">
                    {formatCurrency(currentItem.price)}
                </div>
            </div>
            <div>
                {formatCurrency(currentItem.price * quantity)}
            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>
                &times;
            </Button>
            </Stack>

        </>
    )
}

export default CartItem;