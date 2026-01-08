import React from 'react'
import { Toaster } from 'react-hot-toast'
import{Routes,Route,Link,useLocation}from 'react-router-dom'

import Header from './components/Header'
import Categorysection from './components/Categorysection'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Western from './pages/Western'
import Bags from './pages/Bags'
import Shoes from './pages/Shoes'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

import Wishlist from './pages/Wishlist'
import Payment from './pages/Payment'
import Thankyou from './pages/Thankyou'
import ProtectedRoute from './pages/ProtectedRoute'
import Footer from './components/Footer'
import Orders from './pages/Orders'

import AdminLayout from './admin/AdminLayout'
import ProductList from './admin/ProductList'
import Order from './admin/Order'
import Users from './admin/Users'
import Dashboard from './admin/Dashboard'







function App() {
  const location = useLocation();
    const hideHeaderFooter = location.pathname.startsWith("/admin");


  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Toaster position="top-center" reverseOrder={false} />
      <main className="pt-24 min-h-screen">
        <Routes key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category" element={<Categorysection />} />
          <Route path="/category/western" element={<Western />} />
          <Route path="/category/bags" element={<Bags />} />
          <Route path="/category/shoes" element={<Shoes />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/footer" element={<Footer />} />

          <Route path="/admin" element={ <ProtectedRoute><AdminLayout/> </ProtectedRoute>}>
            <Route index element={<Dashboard/>}/>
            <Route path="list" element={<ProductList />} />
            <Route path="orders" element={<Order />} />
            <Route path="users" element={<Users />} />
          </Route>
       

          
        </Routes>
      </main>

    </>
      )
}

export default App
