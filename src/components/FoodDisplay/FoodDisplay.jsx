import React, { useContext, useState} from 'react'
import './FoodDisplay.css'
import ItemModal from '../ItemModal/ItemModal'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


function FoodDisplay({category}) {

  const { food_list } = useContext(StoreContext)
  const [selectedItem, setSelectedItem] = useState(null);
  
  return (
    <div className='food-display' id='food-display'>
      <h2>Les nouveautés</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          if(category==='All' || category===item.category){
    
          return(
            <div key={item._id} onClick={()=> setSelectedItem(item)}>
               <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description}
                image={item.image}/>
            </div>
          )
          }
        })}
      </div>
        {/* pop-up*/}
        {selectedItem && 
          <ItemModal
            item = {selectedItem}
            onClose={() => setSelectedItem(null)}
          />
          
        }
    </div>
      
  )
}

export default FoodDisplay
