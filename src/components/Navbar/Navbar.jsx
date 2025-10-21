import React from 'react'
import {assets} from '../../assets/frontend_assets/assets.js'
import{Link} from 'react-router-dom' 
import './Navbar.css'


function Navbar() {

  return (
    <div className='Navbar'>
        <img className='logo' src={assets.logo} alt='logo shopmix' />
      
        <div className='links'>
          <Link to='/'>Accueil</Link>
          <Link to='/'>Produits</Link>
          <Link to='/'>Mobile</Link>
          <Link to='/'>Contact</Link> 
        </div>

        <div className='navbar-right'>
          <img src={assets.search_icon} alt='search' className='search-icon' />
          <div className='navbar-search-icon'>
            <img src={assets.basket_icon} alt='basket' className='basket-icon' />
            <div className="dot"></div>
          </div>
          <button>Sign In</button>
        </div>
    </div>
  )
}

export default Navbar
