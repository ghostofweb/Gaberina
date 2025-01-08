import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
const Login = () => {
  const [currentState, setCurrentState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setToken, backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const storeToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token); // Update the global context
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (currentState === "Sign Up" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
        style: { backgroundColor: "#1E1E1E", color: "#FDFBF6" },
      });
      return;
    }

    if (currentState === "Sign Up" && !formData.fullName.trim()) {
      toast.error("Full name is required.", {
        position: "top-right",
        style: { backgroundColor: "#1E1E1E", color: "#FDFBF6" },
      });
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required.", {
        position: "top-right",
        style: { backgroundColor: "#1E1E1E", color: "#FDFBF6" },
      });
      return;
    }

    const { fullName, email, password } = formData;

    try {
      let response;
      if (currentState === "Sign Up") {
        // Register user
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name: fullName,
          email,
          password,
        });
      } else {
        // Login user
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      const { success, token, message } = response.data;

      if (success && token) {
        storeToken(token); // Save token to localStorage and context
        toast.success(message || `${currentState} successful!`, {
          position: "top-right",
          style: { backgroundColor: "#1E1E1E", color: "#FDFBF6" },
        });
        navigate('/'); // Redirect to homepage
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, {
        position: "top-right",
        style: { backgroundColor: "#1E1E1E", color: "#FDFBF6" },
      });
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken); // Update context with the stored token
      navigate('/'); // Redirect to homepage
    }
  }, [setToken, navigate]);

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 text-buttontxt">
      <Title
        text1={currentState === "Sign Up" ? "CREATE" : "WELCOME"}
        text2={currentState === "Sign Up" ? "ACCOUNT" : "BACK"}
      />
      <p className="mt-2 text-lightGray">
        {currentState === "Sign Up"
          ? "Sign up to get started on your journey."
          : "Log in to access your account."}
      </p>

      <form className="flex flex-col gap-4 w-full mt-8" onSubmit={handleSubmit}>
        {currentState === "Sign Up" && (
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-lighterDark text-white placeholder-lightGray focus:ring-2 focus:ring-gold"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-md bg-lighterDark text-white placeholder-lightGray focus:ring-2 focus:ring-gold"
          required
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md bg-lighterDark text-white placeholder-lightGray focus:ring-2 focus:ring-gold"
            required
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </div>
        </div>
        {currentState === "Sign Up" && (
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md bg-lighterDark text-white placeholder-lightGray focus:ring-2 focus:ring-gold"
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gold"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 mt-4 text-center rounded-md bg-gold text-dark font-medium hover:bg-champagne transition duration-300"
        >
          {currentState}
        </button>
      </form>

      <p className="mt-6 text-sm text-lightGray">
        {currentState === "Sign Up"
          ? "Already have an account?"
          : "Don't have an account?"}
        <span
          onClick={() => {
            setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
            setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
          }}
          className="ml-1 text-gold cursor-pointer hover:text-champagne transition duration-300"
        >
          {currentState === "Sign Up" ? "Log in" : "Sign up"}
        </span>
      </p>
    </div>
  );
};

export default Login;
