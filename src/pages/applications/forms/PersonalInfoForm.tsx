import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from '../../../components/ui/Button';

// Form schema
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  panNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  data: any;
  onSave: (data: PersonalInfoFormValues) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || '',
      city: data.city || '',
      state: data.state || '',
      zipCode: data.zipCode || '',
      country: data.country || '',
      panNumber: data.panNumber || '',
      dateOfBirth: data.dateOfBirth || '',
      gender: data.gender || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.firstName ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error-600">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.lastName ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error-600">{errors.lastName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.email ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
            Phone *
          </label>
          <input
            id="phone"
            type="tel"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.phone ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error-600">{errors.phone.message}</p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
            Address *
          </label>
          <input
            id="address"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.address ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('address')}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-error-600">{errors.address.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
            City *
          </label>
          <input
            id="city"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.city ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('city')}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-error-600">{errors.city.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
            State/Province *
          </label>
          <input
            id="state"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.state ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('state')}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-error-600">{errors.state.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
            ZIP/Postal Code *
          </label>
          <input
            id="zipCode"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.zipCode ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('zipCode')}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-error-600">{errors.zipCode.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
            Country *
          </label>
          <input
            id="country"
            type="text"
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
              ${errors.country ? 'border-error-500' : 'border-neutral-300'}
            `}
            {...register('country')}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-error-600">{errors.country.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="panNumber" className="block text-sm font-medium text-neutral-700 mb-1">
            PAN Number
          </label>
          <input
            id="panNumber"
            type="text"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
            {...register('panNumber')}
          />
        </div>
        
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700 mb-1">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
            {...register('dateOfBirth')}
          />
        </div>
        
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-neutral-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
            {...register('gender')}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Save & Continue
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;