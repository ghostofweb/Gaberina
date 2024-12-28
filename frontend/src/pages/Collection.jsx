import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import SearchBar from '../components/SearchBar'
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
const [showFilter, setShowFilter] = useState(false);
const [filterProduct, setFilterProduct] = useState([]);
const [category, setCategory] = useState([]);
const [subCategory, setSubCategory] = useState([]);
const [sortType, setSortType] = useState('relevant');

const toggleCategory = (e) => {
  const value = e.target.value;
  setCategory((prev) =>
    prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
  );
};

const toggleSubCategory = (e) => {
  const value = e.target.value;
  setSubCategory((prev) =>
    prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
  );
};

const getFilteredProducts = () => {
  let productsCopy = [...products];

  if (showSearch && search) {
    productsCopy = productsCopy.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category.length > 0) {
    productsCopy = productsCopy.filter((item) => category.includes(item.category));
  }

  if (subCategory.length > 0) {
    productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
  }

  return productsCopy;
};

const getSortedProducts = (productsList) => {
  let sortedProducts = [...productsList];

  switch (sortType) {
    case 'low-high':
      sortedProducts.sort((a, b) => a.price["50ml"] - b.price["50ml"]);
      break;
    case 'high-low':
      sortedProducts.sort((a, b) => b.price["50ml"] - a.price["50ml"]);
      break;
    case 'relevant':
    default:
      break; // Do nothing
  }

  return sortedProducts;
};

// Combine filtering and sorting in one effect
useEffect(() => {
  const filteredProducts = getFilteredProducts(); // Apply filters
  const sortedProducts = getSortedProducts(filteredProducts); // Apply sorting
  setFilterProduct(sortedProducts); // Update state only once
}, [products, category, subCategory, search, showSearch, sortType]);



return (
  <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gold">
    {/* filter OPTIONS BETWEEN OIL OR spray */}
    <div className="min-w-60">
      <p className="my-2 text-xl flex items-center cursor-pointer text-champagne font-bold gap-2">
        FILTERS
        <img
          src={assets.dropdown_icon}
          onClick={() => setShowFilter(!showFilter)}
          className={`h-3 transform transition-transform duration-300 sm:hidden ${showFilter ? 'rotate-90' : ''} cursor-pointer hover:scale-110 hover:opacity-80`}
          alt=""
        />
      </p>

      {/* category yo */}
      <div className={`border border-gold pl-5 py-3 my-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
        <p className="mb-3 text-sm font-medium font-times text-champagne">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gold">
          <p className="flex font-semibold gap-2">
            <input type="checkbox" className="border border-gold rounded bg-lighterDark accent-champagne" value="Oil" onChange={toggleCategory} /> Oil
          </p>
          <p className="flex font-semibold gap-2">
            <input type="checkbox" className="border border-gold rounded bg-lighterDark accent-champagne" value="Perfume" onChange={toggleCategory} /> Perfume
          </p>
        </div>
      </div>

      {/* SUBcategory Filter */}
      <div className={`border border-gold pl-5 py-3 my-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
        <p className="mb-3 text-sm font-medium font-times text-champagne">TYPES</p>
        <div className="flex flex-col gap-2 text-sm font-light text-gold">
          {['Floral', 'Oud', 'Citrus', 'Leather', 'Amber', 'Vanilla', 'Fruity', 'Spicy', 'Musk'].map((type) => (
            <p key={type} className="flex font-semibold gap-2">
              <input
                type="checkbox"
                className="border border-gold rounded bg-lighterDark accent-champagne"
                value={type}
                onChange={toggleSubCategory}
              /> {type}
            </p>
          ))}
        </div>
      </div>
    </div>

    {/* PRODUCTS */}
    <div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1="OUR" text2="COLLECTIONS" />
        {/* SORTING */}
        <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="border-2 border-gold text-buttontxt text-sm px-2 bg-lighterDark">
          <option value="relevant">Sort by: Relevant</option>
          <option value="low-high">Sort by: Low-High</option>
          <option value="high-low">Sort by: High-Low</option>
        </select>
      </div>

      {/* Products here */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 gap-y-6">
        {filterProduct.map((item) => (
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
    </div>
  </div>
);
}

export default Collection