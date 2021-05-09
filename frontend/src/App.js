import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Header />
      <Container className='text-center py3'>
        <main className='py-3'>
          <h1>Welcome to shop</h1>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default App;
