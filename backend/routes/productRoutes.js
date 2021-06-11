import express from 'express'
import {
  getProductById,
  getProducts,
  getRelatedProducts,
} from '../controllers/productControllers.js'

const router = express.Router()

router.route('/related').get(getRelatedProducts)
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
