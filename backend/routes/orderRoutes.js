import express from 'express'
import {
  addOrderItems,
  getLastThreeOrders,
  getOrderById,
  getOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js '

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, getOrders)
router.route('/lastThree').get(protect, getLastThreeOrders)
router.route('/:id').get(protect, getOrderById)

export default router
