import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import CartPage from './Pages/CartPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ProductInfo from './Pages/ProductInfo';
import Register from './Pages/Register';
import {ProtectedRoutes} from './ProtectedRoutes';

function App() {
  return (

    <div className="App">
        <ToastContainer />

      <Router>
        <Routes>
          <Route path='/login'  element={<LoginPage/> } />
          <Route path='/register'  element={<Register/> } />

          <Route path='/' element={<ProtectedRoutes> <HomePage/> </ProtectedRoutes> } />
          <Route path='/productInfo/:id'  element={ <ProtectedRoutes > <ProductInfo/> </ProtectedRoutes> } />
          <Route path='/cart'  element={ <ProtectedRoutes> <CartPage/> </ProtectedRoutes> } />
        </Routes>
      </Router>
    </div>
    
  );
}

export default connect()(App);




