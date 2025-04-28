import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Menu, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCompany } from '../../contexts/CompanyContext';
import Logo from '../ui/Logo';

interface NavbarProps {
  onMenuClick: () => void;
  isCompanyLayout?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isCompanyLayout = false }) => {
  const { user, logout } = useAuth();
  const { company } = useCompany();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentUser = isCompanyLayout ? company : user;
  const dashboardPath = isCompanyLayout ? '/company/dashboard' : '/dashboard';

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-neutral-600 lg:hidden"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to={dashboardPath} className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <Logo className="h-9 w-auto" />
              <span className="ml-2 text-xl font-semibold text-primary-600 hidden md:block">
                Veritas Careers {isCompanyLayout ? 'Business' : ''}
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full text-neutral-600 hover:bg-neutral-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white"></span>
            </button>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center space-x-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="font-medium text-neutral-700 hidden md:block">
                  {currentUser?.name || 'User'}
                </span>
              </button>
              
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg py-1 z-50"
                >
                  <Link 
                    to={isCompanyLayout ? '/company/profile' : '/profile'} 
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link 
                    to={isCompanyLayout ? '/company/settings' : '/settings'} 
                    className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <button 
                    className="flex w-full items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;