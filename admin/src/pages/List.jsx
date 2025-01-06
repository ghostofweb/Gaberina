import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    console.log("Fetching product list..."); // Log to check if the function is called
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Response received:", response.data.products); // Log the response data
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching products");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
    <p className='mb-2'>
      All Product List
    </p>
    </>
  );
}

export default List;
