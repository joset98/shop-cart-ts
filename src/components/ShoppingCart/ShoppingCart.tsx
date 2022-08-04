import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingContext } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import CartItem from "../CartItem/CartItem";
import storeItems from "../../data/shop-items.json";

type ShoppingCartProps = {
    isOpen: boolean
};

export default function ({ isOpen }: ShoppingCartProps) {

    const { closeCart, cartItems } = useShoppingContext();

    const total = cartItems.reduce( (total, cartItem) => {
        const currentItem = storeItems.find( item => item.id === cartItem.id);
        const currentPrice = currentItem?.price || 0; 
        return total + currentPrice * cartItem.quantity;
    }, 0);

    return (
        <>
            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >
                        Cart
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                        <Stack gap={3}>
                            {cartItems.map(item => <CartItem key={item.id} {...item}/>)}

                            <div className="ms-auto fw-bold fs-5">
                                Total {formatCurrency(total)}
                            </div>
                        </Stack>
                    </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}