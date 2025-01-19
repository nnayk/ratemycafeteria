import React, { useState } from 'react';
import { loginUser } from '../auth';
import { UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { ForgotPassword } from './ForgotPassword'; // Import the ForgotPassword component

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State for forgot password modal


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.endsWith('.edu')) {
      setErrorMessage('Please provide a .edu email.');
      return;
    }

    try {
      const userCredential: UserCredential = await loginUser(email, password);
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      setTimeout(() => {
        clearInputs(); // Clear inputs before closing
        onClose();
      }, 1000);
    } catch (error) {
      setSuccessMessage(''); 
      if (error instanceof FirebaseError) {
        setErrorMessage('Login failed. Please check your credentials.');
      } else {
        setErrorMessage('Server error :(. Please try again later.');
      }
    }
  };

  // Function to clear email and password inputs
  const clearInputs = () => {
    setSuccessMessage('');
    setErrorMessage('');
    setEmail('');
    setPassword('');
  };

  // Clear inputs when modal is closed
  const handleClose = () => {
    clearInputs();
    onClose();
  };

  const handleForgotPasswordOpen = () => {
    clearInputs(); // Clear inputs when opening forgot password modal
    setIsForgotPasswordOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {successMessage && (
          <div className="p-2 mb-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-2 mb-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          {/* Forgot Password Link */}
          <div className="mb-4 text-right">
            <button 
              type="button" 
              className="text-blue-500 hover:underline"
              onClick={handleForgotPasswordOpen} // Replace with actual logic
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Login
            </button>
            <button type="button" onClick={handleClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              Close
            </button>
          </div>
        </form>
      </div>
      {/* Include the Forgot Password modal */}
      <ForgotPassword 
        isOpen={isForgotPasswordOpen} 
        onClose={() => setIsForgotPasswordOpen(false)} 
      />
    </div>
  );
};

export default Login;
