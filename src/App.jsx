import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/home.jsx'
import { Route, Routes, useLocation } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import Carousel from './components/carousel/carousel.jsx'
import Login from './components/Login/LoginPopup.jsx'


function App() {
  const location = useLocation()
  const path = location.pathname.toLowerCase()

  const showLayout1 = path === '/'  || path === '/cart' || path === '/placeorder';
  const showLayout2 = path === '/';
  const showLayout = path === '/'  || path === '/cart' || path === '/placeorder' || path === '/login';

  return (
    <>
      {showLayout1 && <Navbar />}
      {showLayout2 && <Carousel />}

      <div className={showLayout ? "home-page" : "other-page"}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/placeorder' element={<PlaceOrder/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </div>

      {showLayout && <ScrollToTopButton/>}
      {showLayout && <Footer/>}
    </>
  )
}

export default App
