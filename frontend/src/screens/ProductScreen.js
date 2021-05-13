import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
  //const product = products.find((prod) => prod._id === match.params.id)

  const [product, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [match.params.id])

  return (
    <>
      <LinkContainer to='/'>
        <Button variant='dark'>Go Back</Button>
      </LinkContainer>

      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} rounded fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price} </ListGroup.Item>
            <ListGroup.Item>Description: {product.description} </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <Row>
            <Col>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <strong>Price: ${product.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0 ? true : false}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
