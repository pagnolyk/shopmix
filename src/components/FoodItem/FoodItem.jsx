import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets';
import {StoreContext} from '../../context/StoreContext';

function FoodItem({id, name, image, price,description}) {

  const {cartItems={},addToCart=()=>{}, removeFromCart= ()=>{} } =  useContext(StoreContext);


  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-img" />

        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
          :<div className='food-item-counter'>
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
              <p>{cartItems[id]}</p>
              <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green} alt=""/>
          </div>
        }
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
