import React from 'react'
import './Header.css'

function header() {
  return (
    <div className='header'>
      <div className="header-contents">
        <h1> Bienvenue sur ShopMix </h1>
      <p>Le meilleur site de vente en ligne.</p>
        <button>Nos produits</button>
      </div>
    </div>
  )
}

export default header
