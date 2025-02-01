"use client"
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import AddToCart from './Addtocart';

const Quantity = ({ qty, id }: { qty: number, id:string }) => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity state

    // Handle decrement
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Handle increment
    const handleIncrement = () => {
        if (qty !== quantity) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div >
            <div className='text-[15px] mb-2'>Quantity</div>
            <div className="flex items-center gap-6">
                <button
                    className="text-[15px] text-black border rounded-[5px] p-1"
                    onClick={handleDecrement}
                    disabled={quantity <= 1} // Disable if quantity is at its minimum
                >
                    <FaMinus />
                </button>
                <div>{quantity}</div>
                <button
                    className="text-[15px] text-black border rounded-[5px] p-1"
                    onClick={handleIncrement}
                >
                    <FaPlus />
                </button>
            </div>

            <div className="mt-8 md:w-[50%] w-full">
                <AddToCart id={id} quantity={quantity} />
            </div>
        </div>
    );
};

export default Quantity;
