import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import ShippingScreen from './screens/ShippingScreen'

const App = () => {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container className='text py3'>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
