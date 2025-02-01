"use client"

import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const DeleteProduct = ({ id }: { id: string }) => {
const router = useRouter()
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/deleteProduct?id=${id}`);
        if (response.status === 200) {
          toast.success('Product deleted successfully');
          
          router.push("/admin/products", {scroll:false})
          
          // Reload the page without scroll
          
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete the product');
      }
    }
  };

  return (
    <span
      className="font-medium text-red-500 hover:underline cursor-pointer"
      onClick={handleDelete}
    >
      Delete
    </span>
  );
};

export default DeleteProduct;
