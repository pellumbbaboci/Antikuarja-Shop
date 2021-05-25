import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { relatedProducts } from '../actions/productActions'
import { useEffect } from 'react'
import Loader from './Loader'
import Message from './Message'

const RelatedProducts = () => {
  const dispatch = useDispatch()

  const productsRelated = useSelector((state) => state.productRelated)

  const { loading, error, products } = productsRelated

  useEffect(() => {
    dispatch(relatedProducts())
  }, [dispatch])

  // make related products by category (now they are just sorted by rating)

  return (
    <>
      <h2>Related Products</h2>
      <Carousel pause='hover' className='bg-blue'>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
}

export default RelatedProducts
