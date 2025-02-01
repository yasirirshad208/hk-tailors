"use client"
import { useCart } from '@/context/cartContext';
import React, { useState } from 'react';

interface AddToCartProps {
  id: string;
  quantity: number;
}

const AddToCart: React.FC<AddToCartProps> = ({ id, quantity }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (isAdding) return; 
    setIsAdding(true);
    addToCart(id, quantity);

   
    setTimeout(() => {
      setIsAdding(false);
    }, 500); 
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding} // Disable button while adding
      className="px-6 py-2.5 text-white bg-black"
    >
      {isAdding ? 'Adding...' : 'Add To Cart'}
    </button>
  );
};

export default AddToCart;
