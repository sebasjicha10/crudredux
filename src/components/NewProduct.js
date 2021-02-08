import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
// Redux Actions
import {createNewProductAction} from "../actions/productActions"
import {showAlertAction, hideAlertAction} from "../actions/alertActions"


const NewProduct = ({history}) => {

    // Component's state
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    const dispatch = useDispatch()

    // Access Store's state
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const alert = useSelector(state => state.alert.alert)

    const addProduct = product => dispatch(createNewProductAction(product))
    
    const handleNewProductSubmit = e => {
        e.preventDefault()

        console.log(price)
        // Validate Form
        if(name.trim() === "" || price <= 0) {
            const alert = {
                msg: "Both fields are mandatory",
                classes: "alert alert-danger text-center text-uppercase p3"
            }
            dispatch(showAlertAction(alert))  
            return
        }

        // Check for errors
        dispatch(hideAlertAction())

        // Create the New Product
        addProduct({
            name,
            price
        })

        // Redirect Home
        history.push('/')
    }

    return (  
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add New Product
                        </h2>
                        {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
                        <form
                            onSubmit={handleNewProductSubmit}
                        >
                            <div className="form-group">
                                <label>Product's Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Product's Name"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
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
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Add</button>
                        </form>
                        {loading ? <p>Loading...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">An error occurred</p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default NewProduct