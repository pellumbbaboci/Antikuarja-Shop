import express from 'express'
import {
  getProductById,
  getProducts,
  getRelatedProducts,
} from '../controllers/productControllers.js'

const router = express.Router()
/**
 * @swagger
 * /api/products/related:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of products.
 */

router.route('/related').get(getRelatedProducts)
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of products.
 */
router.route('/').get(getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 */
router.route('/:id').get(getProductById)

export default router
