import React, { useState } from 'react';
import Title from '../components/Title';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (currentState === "Sign Up" && !formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("All fields are required.");
      return;
    }

    setError('');
    // Add your form submission logic here
    alert(`${currentState} successful!`);
  };

  const handleForgotPassword = () => {
    // Logic for handling "Forgot Password"
    alert('Forgot Password clicked! Add your recovery flow here.');
  };

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
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 mt-4 text-center rounded-md bg-gold text-dark font-medium hover:bg-champagne transition duration-300"
        >
          {currentState}
        </button>
      </form>

      {currentState === "Login" && (
        <p
          className="mt-4 text-sm text-gold cursor-pointer hover:text-champagne transition duration-300"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </p>
      )}

      <p className="mt-6 text-sm text-lightGray">
        {currentState === "Sign Up"
          ? "Already have an account?"
          : "Don't have an account?"}
        <span
          onClick={() => {
            setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up");
            setError('');
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
