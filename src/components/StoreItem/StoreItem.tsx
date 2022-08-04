import { Button, Card } from "react-bootstrap";
import { useShoppingContext } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import "./styles.css";

type StoreItemProps = {
    id: number, 
    name: string, 
    price: number,
    imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
    const {
        decreaseCartQuantity, 
        getItemQuantity, 
        increaseCartQuantity, 
        removeFromCart} = useShoppingContext();    
        
    const quantity = getItemQuantity(id);

    return (
        <>
            <Card className="w-100 h-100">
                <Card.Img
                    variant="top"
                    className="card-shop-img"
                    src={imgUrl}
                    height="200px"
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                        <span className="fs-2">{name}</span>
                        <span className="mb-2 text-muted">{formatCurrency(price)}</span>

                    </Card.Title>

                    <div className="mt-auto">
                        { quantity == 0 ? (<Button onClick={() => increaseCartQuantity(id)} className="w-100">+ Add to cart</Button>): 
                                <div className="d-flex align-items-center flex-column gap-2">
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                        <div>
                                            <span className="fs-3">{quantity}</span>
                                            in cart
                                        </div>
                                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                                    </div>
                                    <Button onClick={() => removeFromCart(id)} variant="danger" size="sm">remove</Button>
                                </div>
                        }
                    </div>

                </Card.Body>

            </Card>
        </>
    )
}

export default StoreItem;