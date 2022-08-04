import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import About from './pages/About';
import Store from './pages/Store';
import Home from './pages/Home';
import Navbar from './layouts/Navbar/Navbar';
import ShoppingCartProvider from './context/ShoppingCartContext';

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className='mb-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/store' element={<Store />} />
            <Route path='about' element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
