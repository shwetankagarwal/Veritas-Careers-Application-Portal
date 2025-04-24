import { motion } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Logo className="h-20 w-20" />
        </motion.div>
        <motion.h2 
          className="mt-4 text-2xl font-bold text-primary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Veritas Careers
        </motion.h2>
        <motion.div 
          className="mt-6 w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "16rem" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-primary-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;