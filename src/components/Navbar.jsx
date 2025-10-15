import React, {useState} from 'react'
import Logo from '../assets/react.svg'
import Menu from '../assets/menu.svg'
import{Link} from 'react-router-dom' 
import '../styles/Navbar.css'

function Navbar() {
  const [openLinks,setOpenLinks] = useState(false)
  const toggleNavbar = () => {
    setOpenLinks(!openLinks)
  }

  return (
    <div className='Navbar'>
      <div className='logo'>
        <img src={Logo} alt='logo react' />
        <h2 className='name-site'>Shopmix</h2>
      </div>
      
      <div className='links'>
        <Link to='/'>Accueil</Link>
        <Link to='/'>A propos</Link>
        <Link to='/'>Contact</Link>
        <Link to='/'>Blog</Link>
        <button className='btn'>Connexion</button>   
      </div>
      
        <div className='right-links'>     
        <button onClick={toggleNavbar}>
        <img className='menu' src={Menu}/>
        </button>
        <div className='mobile-links' id={openLinks ? 'open' : 'close'}>
          <Link to='/'>Accueil</Link>
          <Link to='/'>A propos</Link>
          <Link to='/'>Contact</Link>
          <Link to='/'>Blog</Link>
          <button className='btn'>Connexion</button>   
        </div>
        </div>
      
    </div>
  )
}

export default Navbar
