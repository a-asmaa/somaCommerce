import { createStore } from "redux";
import reducer from "./Reducer";

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&  (window as any).__REDUX_DEVTOOLS_EXTENSION__())