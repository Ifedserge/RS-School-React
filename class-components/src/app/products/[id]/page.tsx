import { useRouter } from 'next/router';
import React from 'react';

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Product {id}</h1>
      <p>This is the detail page for product {id}.</p>
    </div>
  );
};

export default ProductPage;
