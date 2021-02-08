import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {editProductAction} from "../actions/productActions"


const EditProduct = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: "",
        price: ""
    })

    // Retrieve the product that will be edited
    const productEdit = useSelector(state => state.products.editProduct)

    // Fill the state
    useEffect(() => {
        setProduct(productEdit)
    }, [productEdit])

    //Avoid React cleaning the state after refresh
    if(!product) {
        history.push("/")
        return null
    }

    // Read form data
    const onChangeForm = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const {name, price} = product

    const handleEditProduct = e => {
        e.preventDefault()
        dispatch(editProductAction(product))
        history.push("/")
    }

    return (  
        < div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Edit Product
                        </h2>
                        <form
                            onSubmit={handleEditProduct}
                        >
                            <div className="form-group">
                                <label>Product's Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product's Name"
                                    name="name"
                                    value={name}
                                    onChange={onChangeForm}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product's Price</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Product's Price"
                                    name="price"
                                    value={price}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default EditProduct