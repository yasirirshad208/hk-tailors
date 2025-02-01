"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFacebookSquare, FaInstagram, FaPinterestSquare, FaRegUser } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { AiOutlineClose, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useCart } from '@/context/cartContext';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { signOut, useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { clearCart, productDetails, cart, updateQuantity } = useCart();
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const { data: session } = useSession();

  const user: User = session?.user;


  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if(searchTerm === ''){
      return
    }
    if (searchTerm.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchTerm)}`);
      toggleSearchBar(); // Close search bar after navigation
    }
  };

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <header>
      {/* Navbar */}
      <div className='flex items-center justify-between md:px-10 px-5 py-2'>
        <div className='items-center gap-4 hidden md:flex'>
          <Link href="#"> <FaFacebookSquare className='text-[22px]' /> </Link>
          <Link href="#"> <FaInstagram className='text-[22px]' /> </Link>
          <Link href="#"> <FaPinterestSquare className='text-[22px]' /> </Link>
        </div>
        <div className='md:text-[72px] text-[32px] font-[200] font-exo'>
          <Link href="/">HK Tailors</Link>
        </div>
        <div className='flex items-center md:gap-6 gap-4'>
          <div className='text-[20px] cursor-pointer' onClick={toggleSearchBar}> <CiSearch strokeWidth={"1"} /> </div>
          <div className='text-[20px] cursor-pointer'>
            {!session ? (
              <Link href="/login"> <FaRegUser /> </Link>
            ) : (
              <span onClick={() => signOut()}><RiLogoutBoxLine /></span>
            )

            }
          </div>
          <div className='text-[22px] cursor-pointer flex items-center gap-1.5' onClick={toggleCart}>
            <IoCartOutline />
            <span className='text-[16px]'>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className='flex items-center justify-center md:text-[16px] text-[15px] md:py-5 py-4 border border-[#ebebeb] gap-6 font-exo'>
        <Link href="/collections/Cotton">Cotton</Link>
        <Link href="/collections/Linen">Linen</Link>
        <Link href="/collections/Laces">Laces</Link>
        <Link href="/collections/Stitching">Stitching</Link>
        {user?.isAdmin &&(
                <Link href="/admin/products">Admin</Link>
              )}
      </div>

      {/* Search Bar */}
      <div
      className={`fixed top-0 right-0 w-80 bg-white p-3 transform ${
        isSearchOpen ? 'translate-y-0' : '-translate-y-full'
      } transition-transform duration-300 z-50 shadow-md`}
    >
      <div className='flex justify-between items-center pr-4'>
      <CiSearch strokeWidth={"1"}  className='text-xl cursor-pointer' onClick={handleSearch} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for products..."
          className='w-full px-4 py-2 focus:outline-none text-black'
        />
        <AiOutlineClose className='text-xl cursor-pointer ml-2' onClick={toggleSearchBar} />
      </div>
    </div>

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 w-80 h-full bg-white transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>
        <div className='p-5 flex justify-between items-center border-b'>
          <h2 className='text-[18px] font-semibold'>Your Cart</h2>
          <AiOutlineClose className='text-xl cursor-pointer' onClick={toggleCart} />
        </div>
        <div className='text-[15px] text-black hover:underline text-right mr-5 mt-1 cursor-pointer' onClick={clearCart}>
          Clear
        </div>
        {/* Cart Items */}
        <div className='overflow-y-auto max-h-[calc(100vh-140px)] p-5 !pt-3 space-y-4'>
          {cart.map(cartItem => {
            const item = productDetails.find(product => product._id === cartItem.id); // Find the matching product details
            if (!item) return null; // If the product isn't found, return null

            return (
              <div key={item._id} className='flex items-center justify-between'>
                <img src={item.images[0]} alt="img" className='w-16 h-16 object-cover' />
                <div className='flex-1 ml-4'>
                  <h4 className='text-[16px]'>{item.name}</h4>
                  <div className='flex justify-between items-center mt-1'>
                    <div className='flex items-center gap-2'>
                      <div className='p-[1px] border border-[#ebebeb] rounded-sm'>
                        <AiOutlineMinus
                          className='text-[13px] cursor-pointer'
                          onClick={() => updateQuantity(item._id, -1)}
                        />
                      </div>
                      <p className='mx-2 text-[14px] text-gray-600'>{cartItem.quantity}</p>
                      <div className='p-[1px] border border-[#ebebeb] rounded-sm'>
                        <AiOutlinePlus
                          className='text-[13px] cursor-pointer'
                          onClick={() => updateQuantity(item._id, 1)}
                        />
                      </div>
                    </div>
                    <p className='text-[15px]'>${cartItem.quantity * item.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Checkout Button */}
        <div className='p-5 border-t fixed bottom-0 left-0 w-full bg-white'>
          <button className='w-full bg-black text-white py-2.5 text-center text-[15px]'>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isCartOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={toggleCart}></div>
      )}
    </header>
  );
};

export default Navbar;
