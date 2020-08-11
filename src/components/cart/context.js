import React, { useState, createContext} from 'react'

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [items, setItems] = useState([])

    function addToCart(item) {
        setItems(prevState =>[...prevState, item])
    }

    function itemsWithQuanities(items) {
        return items.reduce((acc, item) => {
            const found = acc.find(_item => _item.apiId === item.apiId)
            if (found) {
                found.quantity = found.quantity + 1
            } else {
                acc.push({
                    quantity: 1,
                        ...item
                })
            }
            return acc
        }, [])
    }
    return (
        <CartContext.Provider
            value={{
                items: itemsWithQuanities(items),
                addToCart
            }}
        >
            {children}
        </CartContext.Provider>
        )
}