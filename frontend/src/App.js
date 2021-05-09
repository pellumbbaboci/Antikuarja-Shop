import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />

      <main className='py-3'>
        <Container className='text-center py3'>
          <HomeScreen />
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default App;
