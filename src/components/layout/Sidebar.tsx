import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileEdit, 
  Calendar, 
  FileText, 
  User, 
  X, 
  PlusCircle,
  Building,
  Users,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  isCompanyLayout?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, isCompanyLayout = false }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const userNavigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Applications', path: '/applications', icon: FileEdit },
    { name: 'Interviews', path: '/interviews', icon: Calendar },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const companyNavigationItems = [
    { name: 'Dashboard', path: '/company/dashboard', icon: Building },
    { name: 'Applications', path: '/company/applications', icon: Users },
    { name: 'Jobs', path: '/company/jobs', icon: Briefcase },
  ];

  const navigationItems = isCompanyLayout ? companyNavigationItems : userNavigationItems;

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <div className="flex items-center justify-between p-4 lg:hidden">
        <span className="text-lg font-semibold text-neutral-800">Navigation</span>
        <button 
          className="p-2 text-neutral-600 rounded-md hover:bg-neutral-100"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex-1 px-4 pt-5 pb-4 overflow-y-auto">
        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 rounded-md transition-colors
                ${isActive(item.path) 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-neutral-600 hover:bg-neutral-100'}
              `}
              onClick={onClose}
            >
              <item.icon className={`
                h-5 w-5 mr-3
                ${isActive(item.path) ? 'text-primary-700' : 'text-neutral-500'}
              `} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      {isCompanyLayout ? (
        <div className="p-4">
          <Link
            to="/company/jobs/new"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors shadow-sm"
            onClick={onClose}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">Post New Job</span>
          </Link>
        </div>
      ) : (
        <div className="p-4">
          <Link
            to="/applications/new"
            className="flex items-center justify-center w-full px-4 py-3 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors shadow-sm"
            onClick={onClose}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            <span className="font-medium">New Application</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;