import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_PRODUCTS_DOWNLOAD,
    PRODUCTS_DOWNLOAD_SUCCESS,
    PRODUCTS_DOWNLOAD_ERROR,
    GET_PRODUCT_DELETE,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    GET_PRODUCT_EDIT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from "../types"

// Each Reducer has it's own state
const initialState = {
    products: [],
    error: null,
    loading: false,
    deleteProduct: null,
    editProduct: null
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {

        case START_PRODUCTS_DOWNLOAD:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload,
            }

        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }

        case PRODUCTS_DOWNLOAD_ERROR:
        case ADD_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case PRODUCTS_DOWNLOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload
            }

        case GET_PRODUCT_DELETE:
            return {
                ...state,
                deleteProduct: action.payload
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product.id !== state.deleteProduct),
                deleteProduct: null
            }

        case GET_PRODUCT_EDIT: 
            return {
                ...state,
                editProduct: action.payload
            }

        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                editProduct: null,
                products: state.products.map(product =>
                    product.id === action.payload.id ? product = action.payload :
                    product
                )
            }

        default:
            return state
    }
}

export default productsReducer