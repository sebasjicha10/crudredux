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
    START_PRODUCT_EDIT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_ERROR
} from "../types"
import axiosClient from "../config/axios"
import Swal from "sweetalert2"


// Handle the creation of new products
export const createNewProductAction = product => {
    return async (dispatch) => {
        dispatch(addProduct())

        try {
            // Insert in the API
            await axiosClient.post('/products', product)

            // If ok, update state
            dispatch(addProductSuccess(product))

            // Alert
            Swal.fire(
                "Success!",
                "The product was added successfully",
                "success"
            )
        } catch (error) {
            console.log(error)
            dispatch(addProductError(true))

            // Alert
            Swal.fire({
                icon: "error",
                title: "An error ocurred",
                text: "Try again"
            })
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true
})

const addProductSuccess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

// Download products from the Data Base
export const getProductsAction = () => {
    return async (dispatch) => {
        dispatch(downloadProducts())

        try {
            const response = await axiosClient.get("/products")
            dispatch(downloadProductsSuccess(response.data))
        } catch (error) {
            console.log(error)
            dispatch(downloadProductsError())
        }
    }
}

const downloadProducts = () => ({
    type: START_PRODUCTS_DOWNLOAD,
    payload: true
})

const downloadProductsSuccess = products => ({
    type: PRODUCTS_DOWNLOAD_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: PRODUCTS_DOWNLOAD_ERROR,
    payload: true
})

// Selects and Delets a Product
export const deleteProductAction = id => {
    return async (dispatch) => {
        dispatch(getProductDelete(id))

        try {
            await axiosClient.delete(`/products/${id}`)
            dispatch(deleteProductSuccess())
            
            // If deleted, show alert
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
 
        } catch (error) {
            console.log(error)
            dispatch(deleteProductError())
        }
    }
}

const getProductDelete = id => ({
    type: GET_PRODUCT_DELETE,
    payload: id
})

const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
})

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
})

// Put product on edit
export const getProductEditAction = product => {
    return(dispatch) => {
        dispatch(getProductEdit(product))
    }
}

const getProductEdit = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
})

// Edits a change in the API and state
export const editProductAction = (product) => {
    return async (dispatch) => {
        dispatch(editProduct())

        try {
            await axiosClient.put(`/products/${product.id}`, product)
            dispatch(editProductSuccess(product))
        } catch (error) {
            dispatch(editProductError())
        }
    }
}

const editProduct = () => ({
    type: START_PRODUCT_EDIT
})

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
})

const editProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
    payload: true
})

