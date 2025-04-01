
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const { toast } = useToast();

  const toggleLanguage = (value: string) => {
    if (value) {
      const newLang = value as 'en' | 'ar';
      setLanguage(newLang);
      toast({
        title: newLang === 'en' ? 'Language Changed' : 'تم تغيير اللغة',
        description: newLang === 'en' ? 'Website language is now English' : 'لغة الموقع الآن هي العربية',
      });
    }
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
          <Link to="/" className="text-sm font-medium text-foreground hover:text-jam3a-purple transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-jam3a-purple transition-colors">
            About Us
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium text-foreground hover:text-jam3a-purple transition-colors">
            How It Works
          </Link>
          <Link to="/sellers" className="text-sm font-medium text-foreground hover:text-jam3a-purple transition-colors">
            For Sellers
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ToggleGroup 
            type="single" 
            value={language} 
            onValueChange={toggleLanguage}
            className="bg-gray-50 border rounded-full shadow-sm p-1"
          >
            <ToggleGroupItem value="en" aria-label="Toggle English" className="rounded-full data-[state=on]:bg-jam3a-purple data-[state=on]:text-white">
              EN
            </ToggleGroupItem>
            <ToggleGroupItem value="ar" aria-label="Toggle Arabic" className="rounded-full data-[state=on]:bg-jam3a-purple data-[state=on]:text-white">
              AR
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="ghost" size="icon" className="text-foreground hover:text-jam3a-purple transition-colors">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-jam3a-purple transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 border border-gray-200 shadow-md">
              <DropdownMenuItem className="hover:bg-jam3a-purple-50">
                <Link to="/login" className="w-full flex items-center">Sign In</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-jam3a-purple-50">
                <Link to="/register" className="w-full flex items-center">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-jam3a-purple-50">
                <Link to="/my-jam3a" className="w-full flex items-center">My Jam3a Deals</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-jam3a-purple-50">
                <Link to="/admin" className="w-full flex items-center">Admin Panel</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="bg-jam3a-purple hover:bg-jam3a-deep-purple transition-colors">
            <Link to="/start-jam3a" className="text-white">Join/Start a Jam3a</Link>
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
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/sellers" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              For Sellers
            </Link>
            <Link 
              to="/login" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              to="/admin" 
              className="text-lg font-medium p-2 hover:bg-jam3a-purple-50 rounded transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <Button 
              className="bg-jam3a-purple hover:bg-jam3a-deep-purple mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link to="/start-jam3a" className="text-white">Join/Start a Jam3a</Link>
            </Button>
            <div className="flex justify-center items-center mt-4 p-2">
              <ToggleGroup 
                type="single" 
                value={language} 
                onValueChange={toggleLanguage}
                className="w-full max-w-xs border rounded-lg shadow-sm p-1"
              >
                <ToggleGroupItem value="en" className="flex-1 data-[state=on]:bg-jam3a-purple data-[state=on]:text-white">
                  <Globe className="h-4 w-4 mr-1 inline-block" /> English
                </ToggleGroupItem>
                <ToggleGroupItem value="ar" className="flex-1 data-[state=on]:bg-jam3a-purple data-[state=on]:text-white">
                  <Globe className="h-4 w-4 mr-1 inline-block" /> العربية
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
