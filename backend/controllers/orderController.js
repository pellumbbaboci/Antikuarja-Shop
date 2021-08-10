import Order from '../models/order.js'
import asyncHandler from 'express-async-handler'

/**  
     @desc Fetch all my orders
     @route GET /api/orders
     @access private
*/
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

/**  
     @desc Fetch all my orders
     @route GET /api/orders
     @access private
*/
const getLastThreeOrders = asyncHandler(async (req, res) => {
  const lastThreeOrders = await Order.find({
    user: req.user._id,
    createdAt: { $lt: new Date() },
  })
    .sort({ _id: -1 })
    .limit(3)
  res.json(lastThreeOrders)
})

/**  
     @desc Create new order
     @route POST /api/order
     @access private
*/
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(200).json(createdOrder)
  }
})

export { addOrderItems, getOrders, getLastThreeOrders }
