import './Cart.css'
import { useContext,useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list = [], removeFromCart, getItemPrice, getCartTotalPrice } = useContext(StoreContext);

  const subtotal = getCartTotalPrice();
  const shipping = 2000;
  const total = subtotal + shipping;
  const Navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false); 

  useEffect(() => {
    fetch("http://localhost/backend/api/product.php")
      .then((response) => response.json())
      .then((data) => {
        const mapped = data.map((p) => {
          const id = p.id || p._id || String(p.id);
          const local = food_list.find((f) => String(f._id) === String(id));
          return {
            ...p,
            image: local ? local.image : p.image,
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

  const format = (n) => n.toLocaleString('fr-FR');

  return (
    <div className='cart'>
      <div className="cart-title"><h1>Votre Panier</h1></div>
      <div className="cart-items">

        <div className="cart-items-title">
          <p>Article</p>
          <p>Nom</p>
          <p>Prix</p>
          <p>Quantité</p>
          <p>Total</p>
          <p>Actions</p>
        </div>
        <br/>

        {products.map((p, index) => {
          const idKey = p._id || p.id;
          const qty = cartItems[idKey] || 0;
          if (qty > 0) {
            const unit = getItemPrice(idKey) || 0;
            const lineTotal = unit * qty;

            return (
              <div key={p.id || index}>
                <div className="cart-items-item">
                  <img src={p.image} alt={p.name} className='cart-item-image'/>
                  <p className='cart-item-name'>{p.name}</p>
                  <p className='cart-item-price'>{format(unit)} XAF</p>
                  <p className='cart-item-quantity'>{qty}</p>
                  <p className='cart-item-total'>{format(lineTotal)} XAF</p>
                  <button className='cart-item-remove' onClick={() => removeFromCart(idKey)}>
                    <img src={assets.close}/>
                  </button>
                </div>
              </div>
            )
          }
          return null;
        })}

        <div className="cart-summary">
          <p>Sous-total : {format(subtotal)} XAF</p>
          <p>Livraison : {format(shipping)} XAF</p>
          <p className='cart-total'><span style={{color:'black',fontSize:'30px',fontWeight:'bolder'}}>Total  : </span> <span style={{fontWeight:'bolder',fontSize:'30px'}}>  {format(total)} XAF</span></p>
        </div>

        <button onClick={() => setShowPopup(true)} className='cart-button'>
          Proccéder au paiement
        </button>
      </div>

    
      {showPopup && (
        <div className="payment-popup-overlay">
          <div className="payment-popup">
            <h2>Informations Paiement</h2>

            <button className="close-btn" onClick={() => setShowPopup(false)}>x</button>


            <input type="text" placeholder="Nom complet" required/>
            <input type='phone' placeholder='Numero de Telephone' required/>
            <input type="text" placeholder="Adresse de livraison" required/>

            <select>
              <option>Mobile Money</option>
              <option>Carte Bancaire</option>
              <option>Paiement à la livraison</option>
            </select>

            <div className="popup-total">
              <span>Total :</span>
              <strong>{format(total)} XAF</strong>
            </div>

            <button className="confirm-btn" onClick={() => {
              alert("Commande validée !");
              setShowPopup(false);
              
            }}>
              Valider le paiement
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;
