import React, { useState } from 'react';
import { loginUser } from '../auth';
import { UserCredential } from 'firebase/auth';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // New prop for handling success
}

export const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSuccessMessage('');
    // setErrorMessage('');

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
      setErrorMessage('Login failed. Please check your credentials.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
    </div>
  );
};

export default Login;
