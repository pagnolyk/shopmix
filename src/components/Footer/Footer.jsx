import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                 <img src={assets.logo} alt='' className='logo'/>
                 <p>blablabla</p>
                 <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                 </div>
            </div>
            <div className="footer-content-center">
                 <h2>Company</h2>
                 <ul>
                    <li>Accueil</li>
                    <li>A propos de nous</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                 </ul>
            </div>
            <div className="footer-content-right">
                 <h2>Get in touch</h2>
                  <ul>
                    <li>656 83 81 07</li>
                    <li>Shopmix@gmail.con</li>             
                 </ul>
            </div> 
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2025 Shopmix.com - All right Reserved. </p>
    </div>
  )
}

export default Footer
