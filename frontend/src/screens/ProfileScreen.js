import React, { useState, useEffect } from 'react'
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Nav,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateProfile } from '../actions/userActions'
import { listLastThreeOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userProfileUpdate = useSelector((state) => state.userProfileUpdate)
  const { success } = userProfileUpdate

  const orderListLastThree = useSelector((state) => state.orderListLastThree)
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = orderListLastThree

  console.log(orders)

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listLastThreeOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateProfile({ id: user._id, name, email, password }))
      setName(name)
      setEmail(email)
    }
  }

  return (
    <Col md={12}>
      <Row>
        <h2>My Profile</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Row>
      <hr></hr>
      <Row>
        {/*  TODO: redirect to all orders page */}
        <Nav className='justify-content-end'>
          <Link to='/'>See all your orders from here</Link>
        </Nav>
        <h2>My Last Three Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Container>
            <Row>
              {orders.map((order, idx) => (
                <Col md={4}>
                  <ListGroup variant='flush' className='my-2'>
                    <ListGroup.Item key={idx}>
                      <h2>Shipping</h2>
                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant='success'>
                          Delivered on {order.deliveredAt}
                        </Message>
                      ) : (
                        <Message variant='danger'>Not Delivered</Message>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item key={idx}>
                      <h2>Payment Method</h2>
                      <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant='success'>
                          Paid on{' '}
                          {`${order.paidAt.split('T')[0]} Time: ${order.paidAt
                            .split('T')[1]
                            .substring(0, 5)}`}
                        </Message>
                      ) : (
                        <Message variant='danger'>Not Paid</Message>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item key={idx}>
                      <h2>Order Items</h2>
                      {order.orderItems.length === 0 ? (
                        <Message>Your Cart is empty</Message>
                      ) : (
                        <ListGroup variant='flush'>
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={3}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                  />
                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4}>
                                  {item.price} X {item.qty} ={' '}
                                  {(item.qty * item.price).toFixed(2)}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                    <LinkContainer
                      to={`/order/${order._id}`}
                      className='d-grid'
                    >
                      <Button className='btn-sm' variant='light'>
                        Go To Order
                      </Button>
                    </LinkContainer>
                  </ListGroup>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Row>
    </Col>
  )
}

export default ProfileScreen
