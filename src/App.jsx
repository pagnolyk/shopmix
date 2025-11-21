import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import Carousel from './components/carousel/carousel.jsx'
import Login from './components/Login/LoginPopup.jsx'
import Register  from './components/Login/SignUp.jsx'
import Dashboard from './admin/Dashboard.jsx'
import AdminAddProduct from './admin/AdminAddProduct.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AdminEditProduct from './admin/AdminEditProduct.jsx'
import { useContext } from 'react'
import { StoreContext } from './context/StoreContext'
import Profile from './pages/Profil/Profil.jsx'
import AdminOrders from './admin/AdminOrders.jsx'

function App() {
  const location = useLocation()
  const path = location.pathname.toLowerCase()

  const showLayout1 = path === '/'  || path === '/cart' || path === '/placeorder'|| path==='/search';
  const showLayout2 = path === '/';
  const showLayout = path === '/'  || path === '/cart' || path === '/placeorder';

  return (
    <>
       {useContext(StoreContext)?.itemsLoading && (
        <div className="global-loader">
          <div className="loader-box">Chargement des produits…</div>
        </div>
      )}
      {showLayout1 && <Navbar />}
      {showLayout2 && <Carousel />}
      
      <div className={showLayout ? "home-page" : "other-page"}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/placeorder' element={<PlaceOrder/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AdminAddProduct />} />
          <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
          <Route path='/profil' element={<Profile/>}/>
          <Route path='/admin/orders' element={<AdminOrders/>}/>
        </Routes>
      </div>
      
      {showLayout && <ScrollToTopButton/>}
      {showLayout && <Footer/>}
    </>
  )
}

export default App
