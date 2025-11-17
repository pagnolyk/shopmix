import React, { useContext, useState } from 'react'
import './SimilarItem.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from './FoodItem'
import ItemModal from '../ItemModal/ItemModal'

function SimilarItems({ _id, category }){
    const { food_list = [] } = useContext(StoreContext)
    const [selectedItem, setSelectedItem] = useState(null)
    if (!category) return null

    const similar = food_list.filter(i => i.category === category && String(i._id) !== String(_id)).slice(0, 6)

    if (!similar.length) return null

    return (
        <div className='similar-items-block'>
            <h2>Articles similaires</h2>
            <div className='similar-items-list'>
                {similar.map((i) => (
                    <div key={i._id} className='similar-item-wrapper' onClick={() => setSelectedItem(i)}>
                        <FoodItem
                            name={i.name}
                            image={i.image}
                            price={i.price}
                            description={i.description}
                        />
                    </div>
                ))}
            </div>

            {selectedItem && (
                <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}

        </div>
    )
}
export default SimilarItems;