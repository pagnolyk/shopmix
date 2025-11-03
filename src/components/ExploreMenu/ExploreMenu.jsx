import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets.js' 



function ExploreMenu({category,setCategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 className='explore-menu-title'>Découvrez nos produits</h1>
      <p className='explore-menu-text'></p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return(
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index}>
            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
            <p>{item.menu_name}</p>
          </div>
          )})}

      </div>
      <div className="explore-menu-divider">Plus d’articles à découvrir</div>
    </div>
  )
}

export default ExploreMenu
