import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [bestSellers,setBestSellers] = useState([])

    useEffect(() => {
      const bestProduct = products.filter((item)=>(item.bestseller))
      setBestSellers(bestProduct.slice(0,6))
    }, [products])
    console.log(bestSellers);
    
  return (

      <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gold'>
  Indulge in the art of refined elegance. Our best-selling fragrances are crafted to envelop you in timeless sophistication, where every note tells a story of opulence and allure.
</p>
      </div>
      {/* RENDERING THE PRODUCTS */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
    {
      bestSellers.map((item,index)=>(
        <ProductItem
        key={index}
        id={item._id}
        name={item.name}
        subCategory={item.subCategory}
        price={item.price} // Pass the 50ml price
        image={item.image}
        fragranceNotes={item.fragranceNotes} // Add fragranceNotes here
      />
      
      ))
    }
      </div>
      </div>
 
  )
}

export default LatestCollection
