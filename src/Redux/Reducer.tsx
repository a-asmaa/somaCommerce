import { reduxState } from "../productsData";
import { ADD, REMOVE } from "./Actions";

const localData = localStorage.getItem('cartItems');
const initialState : reduxState = {
    cartItem: localData !== null ?  JSON.parse(localData) : [],
}



const reducer = (state = initialState , action : any ) => {  

    console.log(state);
    
    switch (action.type){
        case ADD:
            const {item} = action; 
            localStorage.setItem('cartItems', JSON.stringify([...state.cartItem ,item])) 
                     
            return {
                cartItem: [...state.cartItem ,item],
            }
        case REMOVE:
            const {id} = action; 
            localStorage.setItem('cartItems', JSON.stringify(state.cartItem.filter(x => x.id !== id)))     

            return {
                cartItem: state.cartItem.filter(x => x.id !== id) ,
            }
        default:
            return state
    }
}

export default reducer;