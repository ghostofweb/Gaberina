import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      console.log("Products in context:", products);
      console.log("Selected Category:", category);

      // Filter products by the same category
      const relatedProducts = products.filter(
        (item) => item.category === category
      );

      console.log("Related Products:", relatedProducts.slice(0, 5));

      // Update state with the related products (limit to 5)
      setRelated(relatedProducts.slice(0, 6));
    }
  }, [products, category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 gap-y-6">
       {related.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            subCategory={item.subCategory}
            price={item.price} // Pass the 50ml price
            image={item.image}
            fragranceNotes={item.fragranceNotes} // Add fragranceNotes here
          />
        ))}
    </div>
  );
};

export default RelatedProducts;
