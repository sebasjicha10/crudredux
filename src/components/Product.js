import React from 'react'
import {useHistory} from "react-router-dom"
// Redux
import {useDispatch} from "react-redux"
import {deleteProductAction, getProductEditAction} from "../actions/productActions"
import Swal from "sweetalert2"


const Product = ({product}) => {
    const {name, price, id} = product

    const dispatch = useDispatch()
    const history = useHistory() // Allow history to redirect

    // Confirm delete
    const confirmDeleteProduct = id => {
        // Ask user
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Send it to Action
                dispatch(deleteProductAction(id))
            }
        })
    }

    const redirectEdit = product => {
        dispatch(getProductEditAction(product))
        history.push(`/products/edit/${product.id}`)
    }

    return (  
        <tr>
            <td>{name}</td>
            <td><span className="font-weigth-bold">${price}</span></td>
            <td className="actions">
                <button 
                    type="button"
                    onClick={() => redirectEdit(product)}
                    className="btn btn-primary mr-2">
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDeleteProduct(id)}
                >Delete</button>
            </td>
        </tr>
    )
}
 
export default Product