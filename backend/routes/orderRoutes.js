import express from 'express'
import {
  addOrderItems,
  getLastThreeOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js '

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/').get(protect, getOrders)
router.route('/lastThree').get(protect, getLastThreeOrders)

export default router
