import './Cart.css'
<<<<<<< HEAD
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getItemPrice, getCartTotalPrice } = useContext(StoreContext);

  const subtotal = getCartTotalPrice();
  const shipping = 2000; 
  const total = subtotal + shipping;
  const Navigate=useNavigate();
=======
import ItemModal from '../../components/ItemModal/ItemModal'
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9

  return (
<<<<<<< HEAD
    <div className='cart'>
      <div className="cart-title"><h1>Votre Panier</h1></div>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Article</p>
          <p>Nom</p>
          <p>Prix</p>
          <p>Quantité</p>
          <p>Total</p>
          <p>Supprimer</p>
        </div>
        <br/>
        
        {food_list.map((item, index) => {
          const qty = cartItems[item._id] || 0;
          if (qty > 0) {
            const unit = getItemPrice(item._id) || 0;
            const lineTotal = unit * qty;
            const format = (n) => n.toLocaleString('fr-FR');
            return (
              <div key={item._id || index}>
                <div className="cart-items-item">
                  <img src={item.image} alt={item.name} className='cart-item-image'/>
                  <p className='cart-item-name'>{item.name}</p>
                  <p className='cart-item-price'>{format(unit)} XAF</p>
                  <p className='cart-item-quantity'>{qty}</p>
                  <p className='cart-item-total'>{format(lineTotal)} XAF</p>
                  <button className='cart-item-remove' onClick={() => removeFromCart(item._id)}><img src={assets.close}/></button>
                </div>
                
              </div>
            )
          }
          return null;
        })}

        <div className="cart-summary">
          <p>Sous-total: {subtotal.toLocaleString('fr-FR')} XAF</p>
          <p>Livraison: {shipping.toLocaleString('fr-FR')} XAF</p>
          <p className='cart-total'>Total: {total.toLocaleString('fr-FR')} XAF</p>
        </div>
        <button onClick={()=>{Navigate('/placeorder')}} className='cart-button'>Proccéder au paiement</button>
      </div>
=======
    <div>
      <ItemModal/>
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
    </div>
  )
}

export default Cart
