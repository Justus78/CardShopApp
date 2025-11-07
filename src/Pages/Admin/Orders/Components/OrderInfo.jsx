import React from 'react'

const OrderInfo = ( {order} ) => {
  return (
    <div className="space-y-3">
        <p><span className="text-purple-400 font-semibold">Order ID:</span> {order.id}</p>
        <p><span className="text-purple-400 font-semibold">Customer:</span> {order.username || "No username found"}</p>
        <p><span className="text-purple-400 font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
        <p><span className="text-purple-400 font-semibold">Total:</span> ${order.totalAmount}</p>
     </div>
  )
}

export default OrderInfo