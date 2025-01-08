import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import { Update } from '@mui/icons-material';
import Login from './components/Login';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹"
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        // Check authentication on initial load and on token change
        if (token) {
            checkAuth();
        }
    }, [token]); // This will run on token change

    const checkAuth = async () => {
        if (!token) return;

        try {
            const response = await axios.get(`${backendUrl}/api/user/check-auth`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in Authorization header
                }
            });
            if(response.data.success){
                console.log("User is authenticated");
            }
        } catch (error) {
            console.error("Authentication check failed:", error);
            setToken(''); // If auth fails, clear the token
            localStorage.removeItem('token');
        }
    };

    const handleLogout = () => {
        setToken(''); // Clear the token from state
    };

    return (
        <div className='bg-dark min-h-screen'>
            <ToastContainer/>
            {!token ? (  // If no token, show the Login component
                <Login />
            ) : (
                <>
                <ToastContainer />
                    <NavBar onLogout={handleLogout}/>
                    <hr className='px-4' />
                    <div className='flex w-full'>
                        <SideBar />
                        <div className='w-[70%] mx-auto ml-[max(5vm,25px)] my-8 text-base'>
                            <Routes>
                                <Route path="/add" element={<Add token={token} />}  />
                                <Route path='/list' element={<List token={token} />}  />
                                <Route path='/orders' element={<Orders token={token} />}  />
                                <Route path='/update' element={<Update token={token} />}  /> 
                            </Routes>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
