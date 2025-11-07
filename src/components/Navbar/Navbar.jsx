import React, { useState } from 'react'
import {assets} from '../../assets/frontend_assets/assets.js'
import './Navbar.css'
import Login from '../Login/LoginPopup.jsx';

function Navbar() {
  const [menu, setMenu]=useState("menu");

  return (
    <>
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt='logo shopmix' />

        <ul className="navbar-menu">
          
            <div><a href='/' onClick={()=>setMenu("Accueil")} className={menu==="Accueil"?"active":""}>Accueil</a></div>
            <div><a href='#explore-menu' onClick={()=>setMenu("Produits")} className={menu==="Produits"?"active":""}>Produits</a></div>
            <div><a href='#footer' onClick={()=>setMenu("Contact")} className={menu==="Contact"?"active":""}>Contact</a></div>
         
        </ul>

        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <img src={assets.shopping_cart} alt='basket' className='basket-icon' />
            <div className="dot"></div>
          </div>
          <button>Sign In</button>
        </div>
    </div>
    </>
  )
}

export default Navbar
