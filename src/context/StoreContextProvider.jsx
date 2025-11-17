import React, { useEffect, useState } from 'react';
import { StoreContext } from './StoreContext';
import { food_list as staticFoodList } from '../assets/frontend_assets/assets';

// Backend endpoint (adjust port/path if needed)
const PRODUCTS_ENDPOINT = 'http://localhost/backend/api/products.php';

const StoreContextProvider = (props) => {
  const { children } = props;
  const [CartItems, setCartItems] = useState({});
  // items will hold products loaded from backend or fallback to static list
  const [items, setItems] = useState(staticFoodList || []);
  const [itemsLoading, setItemsLoading] = useState(true);
  const lastQty = 0;
  

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

  // Load products from backend and map images to local assets when possible
  React.useEffect(() => {
    fetch(PRODUCTS_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
        const mapped = data.map((p) => {
          const id = p._id || p.id || String(p.id);
          const local = staticFoodList.find((f) => String(f._id) === String(id));
          return {
            _id: id,
            name: p.name || p.nom || (local && local.name) || '',
            description: p.description || p.desc || (local && local.description) || '',
            price: p.price || p.prix || (local && (local.price || local.price_figure)) || p.prix || '',
            category: p.category || (local && local.category) || null,
            // prefer local module image when available so webpack can resolve it
            image: local ? local.image : (p.image || null)
          };
        });
        if (mapped.length) setItems(mapped);
        setItemsLoading(false);
      })
      .catch((err) => {
        // keep staticFoodList as fallback
        console.warn('Could not load products from backend, using static list.', err);
        setItems(staticFoodList || []);
        setItemsLoading(false);
      });
  }, []);

  // Add to cart: accepts optional quantity (default 1)
  const addToCart = (id, quantity = 1) => {
    if (!id || quantity <= 0) return;
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      return { ...prev, [id]: prevQty + quantity };
    });
   
  };

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
    setCartItems(prev => {
      const prevQty = prev[id] || 0;
      const newQty = prevQty - quantity;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const clearCart = () => setCartItems({});

  // Compute total price of cart (sum of unit price * qty)
  const getCartTotalPrice = () => {
    let total = 0;
    for (const id in CartItems) {
      const qty = CartItems[id] || 0;
      const item = items.find(it => String(it._id || it.id) === String(id));
      const unit = parsePrice(item);
      total += unit * qty;
    }
    return total;
  };

  const getItemPrice = (id) => {
    const item = items.find(it => String(it._id || it.id) === String(id));
    return parsePrice(item);
  };

  useEffect(() => {
    console.log('CartItems updated:', CartItems);
  }, [CartItems]);

  const contextValue = {
    // expose the loaded items (from backend) as `food_list` for compatibility
    food_list: items,
    cartItems: CartItems,
    lastQty,
    addToCart,
    removeFromCart,
    getTotalCartItems,
    getCartTotalPrice,
    getItemPrice,
    clearCart,
    itemsLoading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
