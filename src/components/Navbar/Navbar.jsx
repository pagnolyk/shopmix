import React, { useState } from 'react'
import {assets} from '../../assets/frontend_assets/assets.js'
import './Navbar.css'
import { useNavigate,Link } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';


function Navbar() {
  const [menu, setMenu]=useState("menu");
  const Navigate = useNavigate();
  const gotoLogin = () => {
    Navigate('/Login');
  }
   const { getTotalCartItems } = useContext(StoreContext);

  return (
    <>
    <div className='navbar'>
       <Link to='/'><img className='logo' src={assets.logo} alt='logo shopmix' /></Link>

        <ul className="navbar-menu">
          
            <div><a href='/' onClick={()=>setMenu("Accueil")} className={menu==="Accueil"?"active":""}>Accueil</a></div>
            <div><a href='#explore-menu' onClick={()=>setMenu("Produits")} className={menu==="Produits"?"active":""}>Produits</a></div>
            <div><a href='#footer' onClick={()=>setMenu("Contact")} className={menu==="Contact"?"active":""}>Contact</a></div>
         
        </ul>

        <div className='navbar-right'>
          <div className='navbar-search-icon'>
            <Link to='/cart' ><img src={assets.shopping_cart} alt='basket' className='basket-icon' />
             { getTotalCartItems() > 0 && (
            <span className="cart-count">{getTotalCartItems()}</span>
          )}</Link>
          
          </div>
          <button onClick={gotoLogin}>Sign In</button>
        </div>
    </div>
    </>
  )
}

export default Navbar
