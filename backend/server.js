import express from 'express'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import Product from './models/product.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running ...')
})

// @desc Fetch all Related products
// @route GET /api/products/related
// @access public

app.get(
  '/api/products/related',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// catch 404 and forward to error handler
app.use(notFound)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
)
