import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-2 border-yellow-500 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/faqs" className="text-black hover:text-yellow-500 transition duration-300">
              FAQs
            </Link>
            <Link href="/privacy-policy" className="text-black hover:text-yellow-500 transition duration-300">
              Privacy Policy
            </Link>
            <a href="https://www.buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer" className="text-black hover:text-yellow-500 transition duration-300">
              Buy me a coffee
            </a>
          </div>
          <div className="text-black text-sm">
            © {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
