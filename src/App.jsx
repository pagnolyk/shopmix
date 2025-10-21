import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/home.jsx'
import {Route, Routes} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'

function App() {
 
  return (
    <>
    <div className="app">
    
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/placeorder' element={<PlaceOrder/>} />
        <Route exact path='/cart' element={<Cart/>} />
      </Routes>
    
     
      </div>
    </>
  )
}

export default App
