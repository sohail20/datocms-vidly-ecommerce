import Product from './components/Product';
import { ProductType } from './types';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { base_url } from './helper';

const snipcartApiToken =
  process.env.REACT_APP_SNIPCART_API_KEY ||
  'OWE3MmZmMjQtNTk3Yi00OThhLWEwMmUtZDY4ZWM4NzIwYzZiNjM2NjM0Mzc1NzE0MTUwNzI1';

export default function App() {

  const [products, setProducts] = useState<ProductType[] | null>(null);

  const fetchProducts = useCallback(async () => {
    const productData = await axios({
      url: `${base_url}product/allPosts`,
      method: "GET"
    }) as unknown as any
    setProducts(productData.data.data.allProducts);
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container">
      <main className="main">
        <h1>E-Commerce built with React + SnipCart + DatoCMS</h1>
        <form onSubmit={(e)=>{
          e.preventDefault()
          console.log(e.target)
          }}>
          <input id="email" name="email" placeholder="Email" type="email"/>
          <input id="full-name" name="full-name" placeholder="Full Name" type="text"/>
          <input type="submit" value="Submit"/>
        </form>
        <div className="grid">
          {products &&
            products.map((product, i) => <Product product={product} key={i} />)}
        </div>
      </main>
      <div
        id="snipcart"
        data-config-modal-style="side"
        data-api-key={snipcartApiToken}
        hidden
      ></div>
    </div>
  );
}
