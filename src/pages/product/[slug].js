import React, {useState} from 'react';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { client, urlFor } from '../../lib/client';
import { HeroBanner, Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products, bannerData }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

    const handleBuyNow = () => {
      onAdd(product, qty);

      setShowCart(true);
    }

  return (
    <div>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    <img src ={urlFor(image && image[0])} className="product-detail-image"/>
                </div>
                <div className="small-images-container">
                    {image?.map((item, i) => (
                        <img key={i} src={urlFor(item)} className={i === index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)} />





                    ))}
                    </div>
            </div>

            <div className="product-detail-desc">
                <h1>{name}</h1>
                {/*<div className="reviews">
                    <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
                <p>
                    (20)
                </p>
                    </div>*/}
            <h4>Beskrivning:</h4>
            <p>{details}</p>
            <p className="price">{price} SEK</p>
            <div className="quantity">
                <h3>Antal:</h3>
                <p className="quantity-desc">
                    <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                    <span className="num">{qty}</span>
                    <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                </p>
            </div>
            <div className="buttons">
                <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Lägg till</button>
                <button type="button" className="buy-now" onClick={handleBuyNow}>Köp nu</button>
            </div>
            </div>
        </div>

        <div className="maylike-products-wrapper">
            <h2>Du kanske också gillar</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }

export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
  
    console.log(product);
  
    return {
      props: { product, products, bannerData}
    }
  }

  
export default ProductDetails;
