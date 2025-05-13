import { useReducer } from "react";
import { CART_ACTION_TYPE, cartReducer, initialState } from "../reducers/cart";

export function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = product => dispatch({
        type: CART_ACTION_TYPE.ADD_TO_CART,
        payload: product
    });

    const removeFromCart = product => dispatch({
        type: CART_ACTION_TYPE.REMOVE_FROM_CART,
        payload: product
    });

    const clearCart = () => dispatch({
        type: CART_ACTION_TYPE.CLEAR_CART
    });

    return { state, addToCart, removeFromCart, clearCart }

}