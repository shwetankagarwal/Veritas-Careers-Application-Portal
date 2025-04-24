import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

// Form schema
const experienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  location: z.string().min(2, 'Location is required'),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean().optional(),
  description: z.string().min(10, 'Please provide a description of your responsibilities'),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  data: any[];
  onSave: (data: any[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onSave }) => {
  const [experience, setExperience] = useState<any[]>(data || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    },
  });
  
  const isCurrent = watch('isCurrent');
  
  const handleAddExperience = (formData: ExperienceFormValues) => {
    if (editIndex !== null) {
      // Update existing experience
      const updatedExperience = [...experience];
      updatedExperience[editIndex] = { ...formData, id: experience[editIndex].id };
      setExperience(updatedExperience);
      setEditIndex(null);
    } else {
      // Add new experience
      setExperience([...experience, { ...formData, id: Date.now().toString() }]);
    }
    
    setIsAdding(false);
    reset();
  };
  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setIsAdding(true);
    const exp = experience[index];
    reset({
      company: exp.company,
      position: exp.position,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      isCurrent: exp.isCurrent || false,
      description: exp.description,
    });
  };
  
  const handleDelete = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditIndex(null);
    reset();
  };
  
  const handleSave = () => {
    onSave(experience);
  };

  return (
    <div className="space-y-6">
      {/* Experience List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-neutral-800">Work Experience</h3>
          {!isAdding && (
            <Button 
              variant="outline" 
              size="sm"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsAdding(true)}
            >
              Add Experience
            </Button>
          )}
        </div>
        
        {experience.length === 0 && !isAdding ? (
          <div className="bg-neutral-50 p-6 rounded-md text-center">
            <p className="text-neutral-600 mb-4">No work experience added yet.</p>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsAdding(true)}
            >
              Add Experience
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {experience.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="bg-white border border-neutral-200 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-3 md:mb-0">
                  <h4 className="font-medium text-neutral-800">{exp.position}</h4>
                  <p className="text-neutral-600 text-sm">{exp.company} - {exp.location}</p>
                  <p className="text-neutral-500 text-sm">
                    {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                  </p>
                  <p className="text-neutral-600 text-sm mt-1 line-clamp-2">{exp.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-1.5 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-md"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1.5 text-neutral-500 hover:text-error-600 hover:bg-error-50 rounded-md"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {/* Add/Edit Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            className="border border-neutral-200 rounded-md p-6 bg-neutral-50"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-medium text-neutral-800 mb-4">
              {editIndex !== null ? 'Edit Experience' : 'Add Experience'}
            </h3>
            
            <form onSubmit={handleSubmit(handleAddExperience)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                    Company *
                  </label>
                  <input
                    id="company"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.company ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="Company Name"
                    {...register('company')}
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-error-600">{errors.company.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-neutral-700 mb-1">
                    Position *
                  </label>
                  <input
                    id="position"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.position ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="Your Job Title"
                    {...register('position')}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-error-600">{errors.position.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                    Location *
                  </label>
                  <input
                    id="location"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.location ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="City, Country or Remote"
                    {...register('location')}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-error-600">{errors.location.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.startDate ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    {...register('startDate')}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-error-600">{errors.startDate.message}</p>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <input
                      id="isCurrent"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      {...register('isCurrent')}
                      onChange={(e) => {
                        setValue('isCurrent', e.target.checked);
                        if (e.target.checked) {
                          setValue('endDate', '');
                        }
                      }}
                    />
                    <label htmlFor="isCurrent" className="ml-2 block text-sm text-neutral-700">
                      I currently work here
                    </label>
                  </div>
                  
                  <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    End Date {!isCurrent && '*'}
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    disabled={isCurrent}
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.endDate ? 'border-error-500' : 'border-neutral-300'}
                      ${isCurrent ? 'bg-neutral-100 cursor-not-allowed' : ''}
                    `}
                    {...register('endDate')}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-error-600">{errors.endDate.message}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.description ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="Describe your responsibilities and achievements"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error-600">{errors.description.message}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editIndex !== null ? 'Update' : 'Add'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Save & Continue Button */}
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave} variant="primary">
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default ExperienceForm;