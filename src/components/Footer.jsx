import React from 'react';
import {AiFillInstagram, AiFillFacebook} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Västerås BK30 ALL rights reserved</p>
      <p className="icons">
        <a href="https://www.instagram.com/vasteras_bk30_officiell/" target="_blank"><AiFillInstagram /></a>
        <a href="https://www.facebook.com/vasterasbk30fotboll" target="_blank"><AiFillFacebook /></a>
      </p>
    </div>
  );
}

export default Footer;
