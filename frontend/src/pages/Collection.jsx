import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const Collection = () => {
  const {products} = useContext(ShopContext)
  const[showFilter,setShowFilter] = useState(false)
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [fpCopy, setFpCopy] = useState([]);
  const [sortType, setSortType] = useState('relevent');

const toggleCategory = (e) => {
  if (category.includes(e.target.value)){
    setCategory(prev=> prev.filter((item) => item !== e.target.value));
    
  }
  else {
    setCategory(prev=> [...prev, e.target.value]);
  }
}
const toggleSubCategory = (e) => {
  if (subCategory.includes(e.target.value)){
    setSubCategory(prev=> prev.filter((item) => item !== e.target.value));
  }
  else{
    setSubCategory(prev=> [...prev, e.target.value])
  }
}

const applyFilter = () => {
  let productsCopy = products.slice();

  // Filter by category
  if (category.length > 0) {
    productsCopy = productsCopy.filter((item) => category.includes(item.category));
  }

  // Filter by subCategory (string comparison)
  if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
      subCategory.includes(item.subCategory) // Compare the subCategory as a string
    );
  }

  setFilterProduct(productsCopy);
};

const sortProduct = () => {
  console.log('Sorting products by:', sortType);
  let sortedProducts = [...filterProduct];  // Use filtered products instead of fpCopy
  if (sortType === 'relevent') {
    // Reset to the original order
    setFilterProduct(products);
    return;
  }
  switch (sortType) {
    case 'low-high':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
      break; // No sorting needed for relevant
  }

  setFilterProduct(sortedProducts);  // Update the filtered products after sorting
};

useEffect(() => {
  applyFilter();  // Filter products when category or subcategory change
}, [category, subCategory]);

useEffect(() => {
  sortProduct();  // Sort products when sortType changes
}, [sortType, filterProduct]);  // Add filterProduct as a dependency

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gold'>
{/* filter OPTIONS BETWEEN OIL OR spray */}
<div className='min-w-60'>
  <p className='my-2 text-xl flex items-center cursor-pointer text-champagne font-bold gap-2 '  onClick={()=>{
    setShowFilter(!showFilter)
  }}>FILTERS
  <img src={assets.dropdown_icon} className={`h-3 transform transition-transform duration-300 sm:hidden ${showFilter ? 'rotate-90':''}`} alt="" />
  </p>

  {/* category yo */}
  <div className={`border border-gold pl-5 py-3 my-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
<p className='mb-3 text-sm font-medium font-times text-champagne'>CATEGORIES</p>
 <div className='flex flex-col gap-2 text-sm font-light text-gold'>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className=" border border-gold rounded bg-lighterDark accent-champagne" value={'Oil'} onChange={toggleCategory}/> Oil
      </p> 
      <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className=" border border-gold rounded bg-lighterDark accent-champagne" value={'Perfume'} onChange={toggleCategory}/> Perfume
      </p> 
    </div>
  </div>
  {/* SUBcategory Filter */}
  <div className={`border border-gold pl-5 py-3 my-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
<p className='mb-3 text-sm font-medium font-times text-champagne'>TYPES</p>
 <div className='flex flex-col gap-2 text-sm font-light text-gold'>
 <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Floral'} onChange={toggleSubCategory} /> Floral
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Oud'} onChange={toggleSubCategory}/> Oud
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Citrus'} onChange={toggleSubCategory}/> Citrus
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Leather'} onChange={toggleSubCategory}/> Leather
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Amber'} onChange={toggleSubCategory}/> Amber
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Vanilla'} onChange={toggleSubCategory}/> Vanilla
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Fruity'} onChange={toggleSubCategory}/> Fruity
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Spicy'} onChange={toggleSubCategory}/> Spicy
    </p>
    <p className='flex font-semibold gap-2'>
      <input type="checkbox" color='red' className="border border-gold rounded bg-lighterDark accent-champagne" value={'Musk'} onChange={toggleSubCategory}/> Musk
    </p>
    </div>
  </div>
</div>
{/* PRODUCTS */}
<div className='flex-1'>
<div className='flex justify-between text-base sm:text-2xl mb-4'>
<Title text1='OUR' text2='COLLECTIONS' />
{/* SORTING */}
<select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gold text-buttontxt text-sm px-2 bg-lighterDark'>
  <option value="relevent">Sort by: Relevant</option>
  <option value="low-high">Sort by: Low-High</option>
  <option value="high-low">Sort by: High-Low</option>
</select>

</div>
{/* Products here */}
<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cold-4 gap-3 gap-y-6'>
  {
    filterProduct.map((item,index)=>(
      <ProductItem key={index} id={item.name} name={item.name} subCategory={item.subCategory} price={item.price} image={item.image} />
    ))
  }
</div>
</div>
    </div>
  )
}

export default Collection