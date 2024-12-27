import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../auth'; // Import your password reset function
import { FirebaseError } from 'firebase/app';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    try {
      await sendPasswordResetEmail(email); // Call your function to send reset email
      setMessage('A password reset email has been sent.');
      setEmail(''); // Clear the email input
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage('Failed to send reset email. Please check your credentials.');
      } else {
        setErrorMessage('Server error :(. Please try again later.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        {message && (
          <div className="p-2 mb-3 bg-green-100 text-green-700 rounded">
            {message}
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
          <div className="flex justify-between">
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Send
            </button>
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

