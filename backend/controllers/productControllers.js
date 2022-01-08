import Product from '../models/product.js'
import asyncHandler from 'express-async-handler'

/**  
     @desc Fetch all products
     @route GET /api/products
     @access public
*/
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch all products
// @route GET /api/products/related
// @access public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc Fetch a single product
// @route GET /api/products:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc create a review
// @route POST /api/products:id/reviews
// @access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewd = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

    if (alreadyReviewd) {
      res.status(400)
      throw new Error('Product already reviewd')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProductById, getProducts, getRelatedProducts, createProductReview }
