import React, { useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { food_list } from '../assets/frontend_assets/assets';

const StoreContextProvider = (props) => {
  const { children } = props;
  const [CartItems, setCartItems] = useState({});
  const[lastQty, setLastQty] = useState(0)
  

  const addToCart = (id, qty = 1) => {
    console.log('addToCart called', id); // debug
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      const newQty = prevQty + qty;
      console.log('nouvelle quantite:', newQty)
      setLastQty(newQty)
      return { ...prev, [id]: newQty };
    });
   
  };

  const removeFromCart = (id, qty = 1) => {
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      if (prevQty <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      const newQty = prevQty - qty;
      console.log('nouvelle quantite:', newQty)
      setLastQty(newQty)
      return { ...prev, [id]: newQty };
    });
  };
    
  useEffect(() => {
    console.log('CartItems updated:', CartItems);
  }, [CartItems]);

  const contextValue = {
    food_list,
    cartItems: CartItems,
    lastQty,
    addToCart,
    removeFromCart
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
