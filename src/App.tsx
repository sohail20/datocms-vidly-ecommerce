import Product from './components/Product';
import { ProductType } from './types';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { base_url } from './helper';
import { AnyRecord } from 'dns';

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

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const myForm = event.target;
    const formData: any = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
  };

  return (
    <div className="container">
      <main className="main">
        <h1>E-Commerce built with React + SnipCart + DatoCMS</h1>
        <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
          <p>
            <label>Your Name: <input type="text" name="name" /></label>
          </p>
          <p>
            <label>Your Email: <input type="email" name="email" /></label>
          </p>
          <p>
            <label>Your Role: <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
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
