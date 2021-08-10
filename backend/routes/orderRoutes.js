import express from 'express'
import { addOrderItems, getOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js '

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, getOrders)

export default router
