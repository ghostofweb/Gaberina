import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const List = () => {
  const [list, setList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchList = async () => {
    console.log("Fetching product list...");
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Response received:", response.data.products);
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

  // Delete product handler
  const deleteProduct = async () => {
    try {
      const id = productToDelete;
      const response = await axios.post(`${backendUrl}/api/products/remove`, {id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setList(prevList => prevList.filter(item => item._id !== id));  // Remove the deleted product from state
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
      setOpenDialog(false); // Close the dialog after deleting
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product.");
      setOpenDialog(false); // Close the dialog if there's an error
    }
  };

  // Open confirmation dialog
  const handleOpenDialog = (productId) => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2 text-2xl font-semibold text-gold">All Products</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item) => (
          <div key={item._id} className="bg-lighterDark rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Product Image */}
            <div className="w-full h-48 overflow-hidden">
              <img src={item.image[0]} alt={item.name} className="object-cover w-full h-full" />
            </div>
            
            {/* Product Details */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-white">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.category}</p>
              <div className="text-sm text-white">
                {/* Displaying 50ml and 100ml prices */}
                <p>50ml: {currency} {item.price['50ml']}</p>
                <p>100ml: {currency} {item.price['100ml']}</p>
              </div>
            </div>

            {/* Delete Action Button */}
            <div className="p-4 mt-auto flex justify-end">
              <button 
                onClick={() => handleOpenDialog(item._id)} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this product? This action cannot be undone.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={deleteProduct} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default List;
