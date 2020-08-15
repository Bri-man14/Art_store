import React, {useState, useEffect} from 'react'

const items = [
    {
        apiId: 'price_1HCCXKHu2oVdLeNMk44eSJkt',
        quantity: 1,
        price: 300000,
        name: 'City of Dreams II'
    },
    {
        apiId: 'price_1HCCSjHu2oVdLeNMmXGUoYCY',
        quantity: 1,
        price: 300000,
        name: 'Bliss'
    },
    {
        apiId: 'price_1HCCRNHu2oVdLeNMSH2htcbH',
        quantity: 1,
        price: 300000,
        name: 'Rapture'
    },

]

function formatPrice(price) {
    return `$${(price*0.01).toFixed(2)}`
}

function totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
}

export default function Cart({ stripeToken}) {
    const [stripe, setStripe] = useState(null)

    useEffect(() => {
        if(window.Stripe) setStripe(window.Stripe(stripeToken))
    }, [stripeToken])

    function checkout() {
        stripe.redirectToCheckout({
          items: items.map(item => ({
            quantity: item.quantity,
            apiId: item.apiId
          })),
         mode: 'payment',
         successUrl: 'https://www.rogerridleystudio.com/success',
         cancelUrl: 'https://www.rogerridleystudio.com/canceled'
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

            <tbody>{
                  items.map(item => (
                   <tr>
                   <td>{item.name}</td>
                   <td>
                    <img
                      src={`/images/${item.apiId}.jpg`}
                      alt={item.name}
                      width={180}
                   />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(item.price)}</td>
                </tr>)
                 )}
               <tr>
                <td style={{textAlign:'right'}}colpan={3}>Total:</td>
                <td>{formatPrice(totalPrice(items))}</td>
                </tr>

               <tr>
               <td style={{ textAlign: 'right' }} colSpan={4}>
               <button onClick={checkout}>Complete your checkout</button>
              </td>
             </tr>
          </tbody>
        </table>
      </div>
    )
  }