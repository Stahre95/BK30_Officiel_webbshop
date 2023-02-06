import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

import media from '@/media/media';

const Layout = ({children}) => {
  return (
    <div className="layout">
      <Head>
        <title>BK30Shoppen</title>
      </Head>
      <header>
        <Navbar media={media}/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
