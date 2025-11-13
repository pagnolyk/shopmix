import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets';
import {StoreContext} from '../../context/StoreContext';

function FoodItem({ name, image, price,description}) {



  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-img" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p className='food-item-name'>{name}</p>
        </div>
        <img src={assets.rating_starts} alt="rating stars" />
        <p className="food-item-price">{price}</p>
        <p className="food-item-desc">{description}</p>
        
      </div>
    </div>
  )
}
export default FoodItem
