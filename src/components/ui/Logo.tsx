import { BarChart3, User } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-10 w-10' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-primary-500 rounded-lg flex items-center justify-center">
        <div className="relative flex items-center">
          <User className="h-8 w-8 text-accent-400" />
          <div className="ml-2">
            <BarChart3 className="h-8 w-8 text-secondary-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;