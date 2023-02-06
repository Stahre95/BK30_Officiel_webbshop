import React, { useEffect } from 'react';
import Link from 'next/link';
import {AiOutlineShopping}  from 'react-icons/ai';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';



const Navbar = ({media}) => {
  const { showCart, setShowCart, totalQuantities} = useStateContext();

  useEffect(() => {
    console.log(media)
  })

  return (
    <div className="navbar-container">
      <div className='logo'>
        <img src={media.Navbar.logo.src} alt="Västerås BK30 logo" className="merch-logo"/>
        <Link href="/">
          OFFICIEL WEBBSHOP
        </Link>
      </div>

      <button type="button" className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;
