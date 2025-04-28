import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  isCompanyLayout?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isCompanyLayout = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      <Navbar onMenuClick={() => setSidebarOpen(true)} isCompanyLayout={isCompanyLayout} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              className="fixed inset-0 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={handleCloseSidebar}
              />
              <motion.div
                className="relative flex flex-col w-80 max-w-[80%] h-full bg-white shadow-xl"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              >
                <Sidebar onClose={handleCloseSidebar} isCompanyLayout={isCompanyLayout} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 bg-white shadow-md">
          <Sidebar onClose={() => {}} isCompanyLayout={isCompanyLayout} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-neutral-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;