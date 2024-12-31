import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  return (
    <div className='border-t pt-12'>
      <div className='text-2xl'>
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {
          products.slice(1, 4).map((item, index) => {
            const price = item.price["50ml"]; // or you can dynamically use the selected size
            return (
              <div 
                key={index} 
                className='py-4 border-t border-b text-buttontxt flex flex-col md:flex-row md:items-center md:justify-between gap-4'
              >
                <div className='flex items-start gap-6 text-sm'>
                  <img src={item.image[0]} alt="" className='w-16 sm:w-20' />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gold'>
                      <p className='text-lg'>{currency}{price}</p>
                      <p>Quantity: 1</p>
                      <p>Size: 50ml</p>
                    </div>
                    <p>Date: <span className='text-gray-400'>25, July 2077</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-center justify-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-green-500'></div>
                    <p className='text-sm md:text-base'>Ready to Ship</p>
                  </div>
                  <button className='border px-4 py-2 rounded-md text-buttontxt bg-dark hover:bg-lighterDark transition-colors ease-in-out duration-200'>
                    Track Order
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Orders
