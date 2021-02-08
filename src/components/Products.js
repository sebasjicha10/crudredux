import React, {Fragment, useEffect} from 'react'
import Product from "./Product"
// Redux
import {useSelector, useDispatch} from "react-redux"
import {getProductsAction} from "../actions/productActions"


const Products = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        // Call the API to load products
        const loadProducts = () => dispatch(getProductsAction())
        loadProducts()
        //eslint-disable-next-line
    }, [])

    // Get the State
    const products = useSelector(state => state.products.products)
    const error = useSelector(state => state.products.error)
    const loading = useSelector(state => state.products.loading)

    return (  
        <Fragment>
            <h2 className="text-center my-5">List of Products</h2>

            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">An error ocurred</p> : null}
            {loading ? <p className="text-center">Loading...</p> : null}
            
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? <tr><td className="mt-3 bg-white">There are no Products</td></tr> : (
                        products.map(product => (
                            <Product
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}
 
export default Products