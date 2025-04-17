
import React from 'react';
import { Link } from 'react-router-dom';
import { SettingsIcon } from 'lucide-react';

const AdminButton = () => {
  return (
    <Link 
      to="/admin" 
      className="fixed bottom-6 right-6 z-50 bg-royal-blue text-white p-4 rounded-full shadow-xl hover:bg-royal-blue-dark transition-all duration-300 border-2 border-white flex items-center justify-center animate-pulse-soft"
      title="Admin Panel"
      aria-label="Admin Panel"
    >
      <SettingsIcon className="h-7 w-7" />
    </Link>
  );
};

export default AdminButton;
