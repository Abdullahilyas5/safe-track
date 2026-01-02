import React from 'react'

type props = {
    amount: number
}   

export const CheckoutPage = ({amount}:props) => {
  return (
    <div>CheckoutPage {amount}</div>
  )
}
