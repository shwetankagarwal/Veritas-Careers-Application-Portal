import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section (branding) */}
      <motion.div 
        className="bg-primary-500 w-full md:w-1/2 flex flex-col justify-center items-center p-8 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto flex flex-col items-center text-center">
          <Logo className="w-48 h-48 mb-8" />
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Accelerate Your Career Journey
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl opacity-90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Join Veritas Careers and discover opportunities that match your skills and ambitions.
          </motion.p>
          
          <motion.div 
            className="mt-8 p-6 bg-white/10 rounded-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-lg font-medium">
              "Veritas Careers helped me find my dream job in just 3 weeks! The application process was smooth and the team was incredibly supportive."
            </p>
            <p className="mt-4 font-medium">— Alex Chen, Software Engineer</p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right section (auth forms) */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 bg-white"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md p-8">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;