import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/home.jsx'
import {Route, Routes} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollToTopButton from './components/ScrollToTopButton.jsx'
import Carousel from './components/carousel/carousel.jsx'

function App() {
 
  return (
    <>
    <Navbar />
    <Carousel/>
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/placeorder' element={<PlaceOrder/>} />
        <Route exact path='/cart' element={<Cart/>} />
      </Routes> 
      
    </div>
      <ScrollToTopButton/>
      <Footer/> 
    </>
  )
}

export default App
