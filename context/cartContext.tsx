"use client";

import { Product } from '@/models/Product';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

// Define the CartProduct type, including the product details that you need
interface CartProduct {
  id: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

interface ProductDetails{
  _id:string;
  name:string;
  images:string[];
  price:number;
  
}

interface CartContextType {
  cart: CartProduct[];
  productDetails:ProductDetails[];
  addToCart: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Define the props for the CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

// Initialize the context with an undefined value (which will be checked when using the context)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Fetch product details by ids
const fetchProductDetails = async (ids: string[]): Promise<Product[]> => {
  try {
    const response = await fetch(`/api/getCartProducts?ids=${ids.join(',')}`);
    const data = await response.json();
    return data.success ? data.products : [];
  } catch (error) {
    console.error("Error fetching product details:", error);
    return [];
  }
};

// CartProvider to provide the cart state to the rest of the app
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]); // Store product details

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      
      // Fetch product details for the products already in the cart
      const ids = parsedCart.map((item: CartProduct) => item.id);
      fetchProductDetails(ids).then((products) => {
        setProductDetails(products);
      });
    }
  }, []);

  // Update cart in localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }
  }, [cart]);

  // Add or update a product in the cart
  const addToCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === id);
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        toast.success("Product added to cart.");
        return updatedCart;
      }

      toast.success("Product added to cart.");
      return [...prevCart, { id, quantity }];
    });

    // Fetch the new product details for the added product
    fetchProductDetails([id]).then((products) => {
      setProductDetails((prevDetails) => [...prevDetails, ...products]);
    });
  };

  // Remove a product from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    setProductDetails((prevDetails) => prevDetails.filter((item) => item.id !== id));
    toast.success("Product removed from cart.");
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      // toast.success("Product quantity updated in cart.");
      return updatedCart;
    });
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    setProductDetails([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cart, productDetails, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
