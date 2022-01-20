import { Product } from "../productsData";

// Action types
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';


// Action Creator 
export const addToCart = (item : Product) => {
    return {
        type: ADD,
        item
    }
} 

export const removeFromCart = (id : string) => {
    return {
        type: REMOVE,
        id
    }
} 