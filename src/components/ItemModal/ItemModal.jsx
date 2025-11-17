import React, { useContext, useState } from 'react'
import './ItemModal.css'
import { StoreContext } from '../../context/StoreContext'
import SimilarItems from '../FoodItem/SimilarItem'
import { assets } from '../../assets/frontend_assets/assets'

function ItemModal({ item, onClose }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, removeFromCart, cartItems } = useContext(StoreContext)

  const idKey = item?._id || item?.id

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">
          <img src={assets.close} alt="close" />
        </button>

        <div className="modal-element">
          {item?.image ? (
            <img src={item.image} alt={item.name} className="modal-image" />
          ) : (
            <div className="modal-image no-image">Image non disponible</div>
          )}

          <div className="flex-1">
            <h2 className="modal-name">{item?.name}</h2>
            <p className="modal-desc">{item?.description}</p>
            <p className="modal-price">{item?.price}</p>

            <div className="counter">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <img src={assets.remove_icon_red} alt="-" />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>
                <img src={assets.add_icon_green} alt="+" />
              </button>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => {
                  if (!addToCart || quantity <= 0 || !idKey) return
                  addToCart(idKey, quantity)
                  setQuantity(1)
                }}
                className="btn-primary"
                disabled={!addToCart || quantity <= 0}
              >
                Ajouter au panier
              </button>

              <button
                onClick={() => {
                  const qtyToRemove = (cartItems && cartItems[idKey]) || 0
                  if (qtyToRemove > 0 && removeFromCart) removeFromCart(idKey, qtyToRemove)
                  setQuantity(1)
                }}
                className="btn-secondary"
              >
                Vider
              </button>
            </div>
          </div>
        </div>

        <div className="similar-items">
          <SimilarItems _id={idKey} category={item?.category} />
        </div>
      </div>
    </div>
  )
}

export default ItemModal
