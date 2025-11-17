import React, { useContext, useState, useEffect } from 'react'
import './FoodDisplay.css'
import ItemModal from '../ItemModal/ItemModal'
import { StoreContext } from '../../context/StoreContext'
import '../FoodItem/FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'


function FoodDisplay({category}) {

  const { food_list } = useContext(StoreContext)
  const [selectedItem, setSelectedItem] = useState(null);
   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch("http://localhost/backend/api/product.php")
        .then((response) => response.json())
        .then((data) => {
          // Replace backend image names with local images from food_list when possible
          const mapped = data.map((p) => {
            const id = p.id || p._id || String(p.id);
            const local = food_list.find((f) => String(f._id) === String(id));
            return {
              ...p,
              // use local image when available, otherwise keep backend value
              image: local ? local.image : p.image,
              // unify field names
              name: p.name || p.nom || (local && local.name) || "Sans nom",
              description: p.description || p.desc || (local && local.description) || "",
              price: p.price || p.prix || (local && local.price) || (local && local.price_figure) || p.prix
            };
          });
          setProducts(mapped);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erreur API :", error);
          setLoading(false);
        });
    }, [food_list]);
  
    if (loading) {
      return <p>Chargement...</p>;
    }
  
  
  return (

    <div className='food-display' id='food-display'>
      <h2>Les nouveautés</h2>
      <div className='food-display-list'>

        {products
          .filter((p) => category === 'All' || category === p.category)
          .map((p) => (
            
            <div key={p.id || p._id} onClick={() => setSelectedItem(p)} className='food-item'>
              {p.image ? (
                // local images imported via assets are module paths
                <img src={p.image} width="150" alt={p.name} className="food-item-img"/>
              ) : (
                <div style={{ width: 150, height: 100, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No image</div>
              )}
              <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p className='food-item-name'>{p.name}</p>
                </div>
                <img src={assets.rating_starts} alt="rating stars" />
                <p className="food-item-desc">{p.description}</p>
                <p className="food-item-price">{p.price}</p>
            </div>
            </div>
          
          ))
        }
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
