import React, { useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { food_list } from '../assets/frontend_assets/assets';

const StoreContextProvider = (props) => {
  const { children } = props;
  const [CartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    console.log('addToCart called', id); // debug
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      return { ...prev, [id]: prevQty + 1 };
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      if (prevQty <= 1) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: prevQty - 1 };
    });
  };

  useEffect(() => {
    console.log('CartItems updated:', CartItems);
  }, [CartItems]);

  const contextValue = {
    food_list,
    cartItems: CartItems,
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
