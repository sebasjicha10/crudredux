import {combineReducers} from "redux"
import productsReducer from "./productsReducer"
import alertReducer from "./alertReducer"

const Reducer = combineReducers({
    products: productsReducer,
    alert: alertReducer
})

export default Reducer