import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;

    case 'ADD_TO_CART': {
      const { product, size, quantity, customImage } = action.payload;
      const existingItemIndex = state.findIndex(
        item => item.productId === product._id && item.size === size
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...state, {
          productId: product._id,
          name: product.name,
          price: product.price,
          size,
          quantity,
          customImage: customImage || '',
          images: product.images || []
        }];
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(item => !(item.productId === productId && item.size === size));
      }
      return state.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
    }

    case 'REMOVE_FROM_CART': {
      const { productId, size } = action.payload;
      return state.filter(item => !(item.productId === productId && item.size === size));
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, quantity = 1, customImage = '') => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, size, quantity, customImage }
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, size, quantity }
    });
  };

  const removeFromCart = (productId, size) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId, size }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};