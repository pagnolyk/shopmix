import React, { useContext, useState} from 'react'
import './ItemModal.css'
import { StoreContext } from '../../context/StoreContext'
import SimilarItems from '../FoodItem/SimilarItem';
<<<<<<< 
import { assets } from '../../assets/frontend_assets/assets';
=======
>>>>>>> 52d662d985a7edd0caaa6838HEADcb11862ac69eeae9

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
<<<<<<< HEAD
                    <img src={assets.close} alt='close' />
                </button>
                <div className='modal-element'>
                   <img
=======
                    X
                </button>
                <div>
                    <img
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
                    src={item.image}
                    alt={item.name}
                    className='modal-image'
                    />
<<<<<<< HEAD
                <div className='flex-1'>
                        <h2 className='modal-name'>{item.name}</h2>
=======
                    <div className='flex-1'>
                        <h2>{item.name}</h2>
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
                        <p className='modal-desc'>{item.description}</p>
                        <p className='modal-price'>
                            {item.price} 
                        </p>
                        
                            

<<<<<<< HEAD
                        {/* Quantité + panier */}
=======
                    {/* Quantité + panier */}
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
                        <div className='counter'>
                            <button
                                onClick={() => {
                                    setQuantity(q => q - 1)
                                    }}
                            >
<<<<<<< HEAD
                                <img src={assets.remove_icon_red}/>
=======
                                −
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
                            </button>

                            <span >{quantity}</span>
                             
                                 <button
                                    onClick={() => {
                                        setQuantity(q => q + 1)
                                        }}
                                >
<<<<<<< HEAD
                                    <img src={assets.add_icon_green}/>
=======
                                    +
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
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

<<<<<<< HEAD
        {/* Produits similaires 
                    <div >
                        <SimilarItems _id= {item._id }
                        category={item.category} />
                    </div> */}
=======
        {/* Produits similaires */}
                    <div >
                        <SimilarItems _id= {item._id }
                        category={item.category} />
                    </div>
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
                </div>
      </div>

  );
}

export default ItemModal;

                
                    
    
