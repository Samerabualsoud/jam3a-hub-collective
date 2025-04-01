import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Globe, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    // In a production app, we would also change the document direction and load translations
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-jam3a-purple">
              <Users className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Jam3a</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            About Us
          </Link>
          <Link to="/start-jam3a" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            Start a Jam3a
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            How It Works
          </Link>
          <Link to="/sellers" className="text-sm font-medium text-foreground hover:text-jam3a-purple">
            For Sellers
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground" 
            onClick={toggleLanguage}
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Toggle language</span>
            <span className="ml-2 text-xs font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="text-foreground">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/login" className="w-full">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/register" className="w-full">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/my-jam3a" className="w-full">My Jam3a Deals</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/admin" className="w-full">Admin Panel</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-jam3a-purple hover:bg-jam3a-deep-purple">
            <Link to="/start-jam3a" className="text-white">Start a Jam3a</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white md:hidden">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/start-jam3a" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Start a Jam3a
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/sellers" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              For Sellers
            </Link>
            <Link 
              to="/login" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              to="/admin" 
              className="text-lg font-medium p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <Button 
              className="bg-jam3a-purple hover:bg-jam3a-deep-purple mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/start-jam3a" className="text-white">Start a Jam3a</Link>
            </Button>
            <div className="flex justify-between items-center mt-4 p-2">
              <Button 
                variant="outline" 
                onClick={toggleLanguage}
                className="flex items-center gap-2"
              >
                <Globe className="h-5 w-5" />
                Switch to {language === 'en' ? 'Arabic' : 'English'}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
