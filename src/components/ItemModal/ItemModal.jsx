import React, { useContext, useState} from 'react'
import './ItemModal.css'
import { StoreContext } from '../../context/StoreContext'
import SimilarItems from '../FoodItem/SimilarItem';
import { assets } from '../../assets/frontend_assets/assets';

function ItemModal({ item, onClose}){
    const [quantity, setQuantity] = useState(0);
    const { addToCart, removeFromCart, lastQty} = useContext(StoreContext);
    

    return(
        <div className='modal-overlay'>
            <div className='modal-content'>
            <div>
                <button
                onClick={onClose}
                className='modal-close'>
                    <img src={assets.close} alt='close' />
                </button>
                <div className='modal-element'>
                   <img
                    src={item.image}
                    alt={item.name}
                    className='modal-image'
                    />
                <div className='flex-1'>
                        <h2 className='modal-name'>{item.name}</h2>
                        <p className='modal-desc'>{item.description}</p>
                        <p className='modal-price'>
                            {item.price} 
                        </p>
                        
                            

                        {/* Quantité + panier */}
                        <div className='counter'>
                            <button
                                onClick={() => {
                                    setQuantity(q => q - 1)
                                    }}
                            >
                                <img src={assets.remove_icon_red}/>
                            </button>

                            <span >{quantity}</span>
                             
                                 <button
                                    onClick={() => {
                                        setQuantity(q => q + 1)
                                        }}
                                >
                                    <img src={assets.add_icon_green}/>
                                </button>
                        </div>
                        <div className='modal-actions'>
                                <button
                                    onClick={() => {addToCart(item._id, quantity);
                                        setQuantity(0)
                                        console.log({quantity})
                            
                                    }}
                                    className='btn-primary'
                                >
                                    Ajouter au panier
                                </button>
                                 <button
                                    onClick={() => {
                                        removeFromCart(item._id, lastQty);
                                        setQuantity(0)
                                        console.log({lastQty})
                                    }}
                                    className='btn-secondary'
                                >
                                    Vider
                                </button>
                        </div>
                            </div>
                        </div>
                    </div>

        {/* Produits similaires 
                    <div >
                        <SimilarItems _id= {item._id }
                        category={item.category} />
                    </div> */}
                </div>
      </div>

  );
}

export default ItemModal;

                
                    
    
