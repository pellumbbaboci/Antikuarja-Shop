import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import Product from './models/product.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDefinition from './swaggerDef.js'
import cors from 'cors'

const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./server.js', './routes/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.set('trust proxy', true)

const allowedOrigins = [
  'http://localhost:3000/',
  'https://bestshopeverapp.herokuapp.com/',
  'https://antikuarja.herokuapp.com/',
]
app.use(
  cors({
    origin: allowedOrigins,
  })
)

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use('/api/config/paypal', (res, req) =>
  req.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: API running
   *     description: Making sure that API is running.
   */
  app.get('/', (req, res) => {
    res.send('API running ...')
  })
}

// catch 404 and forward to error handler
app.use(notFound)

// error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
)
