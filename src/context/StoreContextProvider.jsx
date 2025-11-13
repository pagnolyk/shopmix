import React, { useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { food_list } from '../assets/frontend_assets/assets';

const StoreContextProvider = (props) => {
  const { children } = props;
  const [CartItems, setCartItems] = useState({});
  const[lastQty, setLastQty] = useState(0)
  

<<<<<<< HEAD
  // Helper: try to extract a numeric price from an item
  const parsePrice = (item) => {
    if (!item) return 0;
    if (typeof item.price_figure === 'number') return item.price_figure;
    if (typeof item.price === 'number') return item.price;
    if (typeof item.price === 'string') {
      // Remove non-digits
      const digits = item.price.replace(/[^0-9.-]+/g, '');
      const n = parseFloat(digits);
      return Number.isFinite(n) ? n : 0;
    }
    return 0;
  };

  // Add to cart: accepts optional quantity (default 1)
  const addToCart = (id, quantity = 1) => {
    if (!id || quantity <= 0) return;
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      return { ...prev, [id]: prevQty + quantity };
=======
  const addToCart = (id, qty = 1) => {
    console.log('addToCart called', id); // debug
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      const newQty = prevQty + qty;
      console.log('nouvelle quantite:', newQty)
      setLastQty(newQty)
      return { ...prev, [id]: newQty };
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
    });
   
  };

<<<<<<< HEAD
  const getTotalCartItems = () => {
    let total = 0;
    for (let item in CartItems) {
      total += CartItems[item];
    }
    return total;
  };


  // Remove quantity (default 1). If resulting qty <=0 remove the key.
  const removeFromCart = (id, quantity = 1) => {
    if (!id || quantity <= 0) return;
=======
  const removeFromCart = (id, qty = 1) => {
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      const newQty = prevQty - quantity;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
<<<<<<< HEAD
      return { ...prev, [id]: newQty };
    });
  };

  const clearCart = () => setCartItems({});

  // Compute total price of cart (sum of unit price * qty)
  const getCartTotalPrice = () => {
    let total = 0;
    for (const id in CartItems) {
      const qty = CartItems[id] || 0;
      const item = food_list.find(it => (it._id || it.id) === id);
      const unit = parsePrice(item);
      total += unit * qty;
    }
    return total;
  };

  const getItemPrice = (id) => {
    const item = food_list.find(it => (it._id || it.id) === id);
    return parsePrice(item);
  };

=======
      const newQty = prevQty - qty;
      console.log('nouvelle quantite:', newQty)
      setLastQty(newQty)
      return { ...prev, [id]: newQty };
    });
  };
    
>>>>>>> 52d662d985a7edd0caaa6838cb11862ac69eeae9
  useEffect(() => {
    console.log('CartItems updated:', CartItems);
  }, [CartItems]);

  const contextValue = {
    food_list,
    cartItems: CartItems,
    lastQty,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getCartTotalPrice,
    getItemPrice,
    clearCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
