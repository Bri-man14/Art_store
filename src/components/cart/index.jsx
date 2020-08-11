import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from './context'

function formatPrice(price) {
    return `$${(price*0.01).toFixed(2)}`
}


function totalPrice(items) {
    return items.reduce((acc, item)=> acc + item.quanity * item.price, 0.0)
}


export default function Cart({ stripeToken }) {
    const [stripe, setStripe] = useState(null)
    const ctx = useContext(CartContext)

    useEffect(() => {
        if(window.Stripe) setStripe (window.Stripe(stripeToken))
    }, [stripeToken])

    function checkout() {
        stripe.redirectToCheckout({
            items: ctx.items.map(item => ({
                quantity: item.quantity,
                apiId:item.stripeToken                 
            })),
            successUrl: 'https://www.rogerridleystudio.com/success',
            cancelUrl: 'https://www.rogerridleystudio.com/canceled',
        })
    }

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Quanity</th>
                    <th>Price</th>
                </tr>
                </thead>

                <tbody>
                    {ctx.items.map(item =>
                     <tr>
                     <td>{item.name}</td>
                     <td>
                     <img
                       src={`/images/${item.apiId}.jpg`}
                       alt={item.name}
                       width={150}
                     />
                   </td>
                    <td>{item.quanity}</td>
                    <td>{formatPrice(item.price)}</td>
                   </tr>
                    )}
                    <tr>
                    <td style={{ textAlign: 'right'}} colSpan={3}>Total:</td>
                    <td>{formatPrice(totalPrice(ctx.items))}</td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: 'right' }} colSpan={4}>
                            <button onClick={checkout}>Complete Checkout</button>
                    </td>
                    </tr>

                </tbody>
        </table>
        </div>
    )

}