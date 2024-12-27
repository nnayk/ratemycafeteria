import React from 'react';

interface NavbarProps {
  isLoggedIn: boolean; // New prop to track login state
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onLogoutClick: () => void; // New prop for logout action
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLoginClick, onRegisterClick, onLogoutClick }) => {
  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          RateMyCafeteria
        </div>
        <div>
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => console.log('Navigate to Profile')} // Replace with actual navigation logic
                className="bg-white text-black px-4 py-2 rounded-md mr-2 hover:bg-yellow-100 transition duration-300"
              >
                Profile
              </button>
              <button 
                onClick={onLogoutClick}
                className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={onLoginClick}
                className="bg-white text-black px-4 py-2 rounded-md mr-2 hover:bg-yellow-100 transition duration-300"
              >
                Login
              </button>
              <button 
                onClick={onRegisterClick}
                className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
