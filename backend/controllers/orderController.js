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
     @desc Fetch three of  my orders
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
     @desc Fetch order by ID
     @route GET /api/orders/:id
     @access private
*/
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
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

/**  
     @desc Update Order to Paid
     @route PUT /api/orders/:id/pay
     @access private
*/
const updateOrdertoPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrders,
  getLastThreeOrders,
  getOrderById,
  updateOrdertoPaid,
}
