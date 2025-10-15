import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/home.jsx'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

function App() {
 
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
    </Router>
      <h1 style={{color: 'blueviolet'}}> Bienvenue sur Shopmix </h1>
      <p>
        Le meilleur site de vente en ligne.
      </p>
    </>
  )
}

export default App
