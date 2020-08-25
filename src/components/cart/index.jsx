import React, { useState, useEffect, useContext } from "react"
import { CartContext} from './context'

function formatPrice(price) {
    return `$${(price * 0.01).toFixed(2)}`
}

function totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
}

export default function Cart({ stripeToken }) {
    const [stripe, setStripe] = useState(null)
    const ctx = useContext(CartContext)

    useEffect(() => {
        if (window.Stripe) setStripe(window.Stripe(stripeToken))
    }, [stripeToken])

   

    function checkout() {
        stripe.redirectToCheckout({
            lineItems: ctx.items.map(item => ({
                quantity: ctx.item.quantity,
                price: item.price
            })),
            successUrl: "https://your-website.com/success",
            cancelUrl: "https://your-website.com/canceled"
        })
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>
                    {ctx.items.map(item => (
                        <tr>
                            <td>{item.name}</td>
                            <td>
                                <img
                                    src={`/images/${item.apiId}.jpg`}
                                    alt={item.name}
                                    width={150}
                                />
                            </td>
                            <td>{item.quantity}</td>
                            <td>{formatPrice(item.price)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td style={{ textAlign: "right" }} colspan={3}>
                            Total:
            </td>
                        <td>{formatPrice(totalPrice(ctx.items))}</td>
                    </tr>

                    <tr>
                        <td style={{ textAlign: "right" }} colspan={4}>
                            <button onClick={checkout}>Checkout now</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
    