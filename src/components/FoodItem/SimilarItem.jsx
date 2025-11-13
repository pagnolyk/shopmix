import React from 'react'
import './SimilarItem.css'
import { food_list } from '../../assets/frontend_assets/assets';
import FoodItem from './FoodItem';

function SimilarItems({ _id, category }){
    const similar = food_list.filter(i => i.category === category && i._id !== _id).slice(0, 4);
    return (
        <div className='food-item'>
            <h2>Articles Similaires</h2>
            <div className='food-item-img-container'>
                {similar.map((i) => <FoodItem key={i._id} id={i._id} name={i.name} price={i.price} description={i.description}
                image={i.image}/>)}
            </div>

        </div>
    )
}
export default SimilarItems;