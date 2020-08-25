import React, { useContext} from 'react'

import products from '../../data/products'

import Cart from '../cart'
import { CartContext } from '../cart/context'

export default function Store() {
    const cartCtx = useContext(CartContext)
    return (
        <div>
        {
            products.map(product => (
                <div>
                <div>
                    <img
                      src={`/images/${product.apiId}.jpg`}
                      alt={product.name}
                      width={180} />                                            
                    </div>
                    <div>{product.name}</div>    
                    <div>
                        <button
                            onClick={()=> cartCtx.addToCart(product)}
                        >Add to cart</button> 
                    </div>
                </div>
            ))} 

        <Cart stripeToken='pk_test_51HBrwRHu2oVdLeNMiqdWS9t5AyI12F6c1kevcdAxLgUyMtN6VsopE9B7NSPPrtIu6L2I95Mjj8KJykyRbV27MVME00ew3fXjXx'/>
        </div>
    )
}