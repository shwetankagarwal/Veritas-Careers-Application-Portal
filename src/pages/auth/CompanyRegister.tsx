import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Building, Loader } from 'lucide-react';
import { useCompany } from '../../contexts/CompanyContext';
import Button from '../../components/ui/Button';

const registerSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  industry: z.string().min(2, 'Industry is required'),
  size: z.string().min(1, 'Company size is required'),
  location: z.string().min(2, 'Location is required'),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const CompanyRegister = () => {
  const navigate = useNavigate();
  const { register: registerCompany } = useCompany();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      email: '',
      password: '',
      confirmPassword: '',
      industry: '',
      size: '',
      location: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await registerCompany(data.companyName, data.email, data.password);
      navigate('/company/dashboard');
    } catch (err) {
      setError('There was an error creating your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-neutral-900 mb-2">Register your company</h2>
      <p className="text-neutral-600 mb-8">Create an account to start hiring top talent</p>
      
      {error && (
        <div className="bg-error-50 text-error-700 p-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-1">
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.companyName ? 'border-error-500' : 'border-neutral-300'}
            `}
            placeholder="Your Company Name"
            {...register('companyName')}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-error-600">{errors.companyName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Company Email
          </label>
          <input
            id="email"
            type="email"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.email ? 'border-error-500' : 'border-neutral-300'}
            `}
            placeholder="company@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-1">
            Industry
          </label>
          <select
            id="industry"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.industry ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('industry')}
          >
            <option value="">Select industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-error-600">{errors.industry.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-1">
            Company Size
          </label>
          <select
            id="size"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.size ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('size')}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
          {errors.size && (
            <p className="mt-1 text-sm text-error-600">{errors.size.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
            Location
          </label>
          <input
            id="location"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.location ? 'border-error-500' : 'border-neutral-300'}
            `}
            placeholder="City, Country"
            {...register('location')}
          />
          {errors.location && (
            <p className="mt-1 text-sm text-error-600">{errors.location.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.password ? 'border-error-500' : 'border-neutral-300'}
            `}
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.confirmPassword ? 'border-error-500' : 'border-neutral-300'}
            `}
            placeholder="••••••••"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              {...register('terms')}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-neutral-700">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </a>
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-error-600">{errors.terms.message}</p>
            )}
          </div>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader className="animate-spin" /> : <Building />}
        >
          {isSubmitting ? 'Creating account...' : 'Create company account'}
        </Button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-600">
          Already have an account?{' '}
          <Link to="/company/login" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default CompanyRegister;