import Product from './components/Product';
// import { ProductType } from './types';
// import { useCallback, useEffect, useState } from 'react';
import { useQuerySubscription } from "react-datocms";

import './App.css';
// import axios from 'axios';
// import { base_url } from './helper';
// import SingleForm from './components/Forms/SingleForm';

// const snipcartApiToken =
//   process.env.REACT_APP_SNIPCART_API_KEY ||
//   'OWE3MmZmMjQtNTk3Yi00OThhLWEwMmUtZDY4ZWM4NzIwYzZiNjM2NjM0Mzc1NzE0MTUwNzI1';

export default function App() {

  const { status, error, data } = useQuerySubscription({
    query: `
      query {
        allProducts {
          id
          name
          _status
          _firstPublishedAt
          image {
            url
            title
            alt
          }
        }
        _allProductsMeta {
          count
        }
      }`,
    variables: { first: 10 },
    token: "f2a4acd4d4892a7759d70199fc1413",
  });

  // const [products, setProducts] = useState<ProductType[] | null>(null);

  // const fetchProducts = useCallback(async () => {
  //   const productData = await axios({
  //     url: `${base_url}product/allPosts`,
  //     method: "GET"
  //   }) as unknown as any
  //   setProducts(productData.data.data.allProducts);
  // }, [setProducts]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const statusMessage = {
    connecting: "Connecting to DatoCMS...",
    connected: "Connected to DatoCMS, receiving live updates!",
    closed: "Connection closed",
  };

  return (
    <div className="container">

      <div>
        <p>Connection status: {statusMessage[status]}</p>
        {error && (
          <div>
            <h1>Error: {error.code}</h1>
            <div>{error.message}</div>
            {error.response && (
              <pre>{JSON.stringify(error.response, null, 2)}</pre>
            )}
          </div>
        )}
        <div className="grid">
          {data && (
            <>
              {data.allProducts.map((product: any, i: number) => (
                <Product product={product} key={i} />
              ))}
            </>
          )}
        </div>
      </div>
      {/* <main className="main">
        <h1>E-Commerce built with React + SnipCart + DatoCMS</h1>
        <div className="grid">
          {products &&
            products.map((product, i) => <Product product={product} key={i} />)}
        </div>
      </main>

      <SingleForm/>
      <div
        id="snipcart"
        data-config-modal-style="side"
        data-api-key={snipcartApiToken}
        hidden
      ></div> */}
    </div>
  );
}
