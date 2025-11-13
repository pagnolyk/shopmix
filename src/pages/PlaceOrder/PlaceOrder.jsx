import {React,useContext} from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function placeOrder() {

  const {getCartTotalPrice } = useContext(StoreContext);
  
  const subtotal = getCartTotalPrice();
  const shipping = 2000; 
  const total = subtotal + shipping;
  const Navigate= useNavigate();

  return (

    <div className='place-order'>
    <form className='place-order-form'>
      <div className="place-order-left">
        <p className="title">Informations</p>
        <div className="multi-fields">
          <input type='text' placeholder='Nom'/>
          <input type='text' placeholder='Prénom'/>
        </div>

        <div className="multi-fields">
          <input type='mail' placeholder='Adresse E-mail'/>
          <input type='text' placeholder='Ville'/>
          <input type='text' placeholder='Quartier'/>
          <input type='text' placeholder='Téléphone'/>
        </div>    
      </div>
      <div className="place-order-right">
         <div className="cart-summary">
          <p>Sous-total: {subtotal.toLocaleString('fr-FR')} XAF</p>
          <p>Livraison: {shipping.toLocaleString('fr-FR')} XAF</p>
          <p className='cart-total'>Total: {total.toLocaleString('fr-FR')} XAF</p>
        </div>
        <button onClick={()=>{Navigate('/placeorder')}} className='cart-button'>Paiement</button>

      </div>
      
    </form>
    </div>
  )
}

export default placeOrder
