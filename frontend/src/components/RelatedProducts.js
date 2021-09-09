import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { relatedProducts } from '../actions/productActions'
import { useEffect } from 'react'

const RelatedProducts = () => {
  const dispatch = useDispatch()

  const productsRelated = useSelector((state) => state.productRelated)

  const { products } = productsRelated

  const cart = useSelector((state) => state.cart)

  const { cartItems } = cart

  useEffect(() => {
    dispatch(relatedProducts())
  }, [dispatch])

  return (
    <>
      <h2>Related Products</h2>
      <Carousel pause='hover' className='bg-dark'>
        {products.map((product) =>
          cartItems.map(
            (itemInCart) =>
              itemInCart.category === product.category && (
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
              )
          )
        )}
      </Carousel>
    </>
  )
}

export default RelatedProducts
