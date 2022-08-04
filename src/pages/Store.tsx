import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/StoreItem/StoreItem";
import storeItem from "../data/shop-items.json";

const Store = () => {
    return (
        <>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItem.map( item => 
                    <Col key={item.id}>
                        <StoreItem {...item}/>
                    </Col> )}
            </Row>
        </>
    )
}

export default Store;