import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
    children: ReactNode
};

type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingContext(){
    return useContext(ShoppingCartContext) ;
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) =>  {
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[]);
    
    function openCart() {
        setIsOpen(true);
    }

    function closeCart() { setIsOpen(false);}

    function getCartQuantity() {
        let sum = 0;

        cartItems.forEach( item => {
            sum += item.quantity;  
        });
        return sum
    }

    const cartQuantity = getCartQuantity();

    const getItemQuantity = (id: number) => {
        return cartItems.find( item => item.id === id)?.quantity || 0;
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems( currentState => {
            const currentItem = currentState.find(item => item.id === id);
            if( currentItem == null )
                return [...currentState, {id, quantity: 1}];
            else
                return currentState.map( item => {
                    if( item.id === id ) return {id, quantity: item.quantity + 1};
                    return item;
                });
        })
    }; 

    const decreaseCartQuantity = (id: number) => {
        setCartItems( currentState => {
            const currentItem = currentState.find(item => item.id === id);
            if (currentItem == null)
                return currentState;
            if( currentItem?.quantity === 1)
                return currentState.filter( item => item.id !== id);
            else 
                return currentState.map( item => {
                    if( item.id === id ) return {id, quantity: item.quantity - 1};
                    return item;
                });
        })
    }; 

    const removeFromCart = (id: number) => {
        setCartItems( currentState => {
            return currentState.filter( item => item.id !== id);
        })
    }; 
    
    
    return (
            <ShoppingCartContext.Provider value={{
                    getItemQuantity, 
                    increaseCartQuantity,
                    decreaseCartQuantity,
                    removeFromCart, 
                    openCart,
                    closeCart,
                    cartQuantity,
                    cartItems
                }}
            >
                {children}
                <ShoppingCart isOpen={isOpen}/>
            </ShoppingCartContext.Provider>
        );
}

export default ShoppingCartProvider;