'use client';

import React from 'react';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-black mb-4 text-center">Privacy Policy</h1>
        <h2 className="text-2xl font-semibold text-black mb-2">1. Information We Collect</h2>
        <p className="text-black mb-4">We collect personal information, user-generated content, and automatically collected data to enhance our services.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">3. Use of Information</h2>
        <p className="text-black mb-4">Your information helps us improve our website and communicate important updates.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">4. Data Security</h2>
        <p className="text-black mb-4">We implement security measures such as SSL encryption and firewalls. However, we cannot guarantee the security of information from unauthorized entry or use, hardware or software failure, or other circumstances outside of our control.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">5. Sharing Your Information</h2>
        <p className="text-black mb-4">We do not sell or trade your personal data. Third-party services may be used for app hosting and analytics.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">6. Children's Privacy</h2>
        <p className="text-black mb-4">Our website is not intended for children under 13, and we do not knowingly collect data from them.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">7. Legal Compliance</h2>
        <p className="text-black mb-4">We comply with privacy laws like GDPR and CCPA. You may have rights regarding your data.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">8. Changes to this Privacy Policy</h2>
        <p className="text-black mb-4">We may update this policy, and any changes will be posted on this page.</p>

        <h2 className="text-2xl font-semibold text-black mb-2">Contact Us</h2>
        <p className="text-black">If you have any questions, contact us at ratemycafeteria@gmail.com.</p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

