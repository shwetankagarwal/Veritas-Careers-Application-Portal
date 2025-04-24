import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import Button from '../../../components/ui/Button';

// Form schema
const educationSchema = z.object({
  institution: z.string().min(2, 'Institution name is required'),
  degree: z.string().min(2, 'Degree is required'),
  field: z.string().min(2, 'Field of study is required'),
  startDate: z.string().min(2, 'Start date is required'),
  endDate: z.string().min(2, 'End date is required'),
  gpa: z.string().optional(),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationFormProps {
  data: any[];
  onSave: (data: any[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onSave }) => {
  const [education, setEducation] = useState<any[]>(data || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    },
  });
  
  const handleAddEducation = (formData: EducationFormValues) => {
    if (editIndex !== null) {
      // Update existing education
      const updatedEducation = [...education];
      updatedEducation[editIndex] = { ...formData, id: education[editIndex].id };
      setEducation(updatedEducation);
      setEditIndex(null);
    } else {
      // Add new education
      setEducation([...education, { ...formData, id: Date.now().toString() }]);
    }
    
    setIsAdding(false);
    reset();
  };
  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setIsAdding(true);
    reset({
      institution: education[index].institution,
      degree: education[index].degree,
      field: education[index].field,
      startDate: education[index].startDate,
      endDate: education[index].endDate,
      gpa: education[index].gpa || '',
    });
  };
  
  const handleDelete = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };
  
  const handleCancel = () => {
    setIsAdding(false);
    setEditIndex(null);
    reset();
  };
  
  const handleSave = () => {
    onSave(education);
  };

  return (
    <div className="space-y-6">
      {/* Education List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-neutral-800">Education Information</h3>
          {!isAdding && (
            <Button 
              variant="outline" 
              size="sm"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setIsAdding(true)}
            >
              Add Education
            </Button>
          )}
        </div>
        
        {education.length === 0 && !isAdding ? (
          <div className="bg-neutral-50 p-6 rounded-md text-center">
            <p className="text-neutral-600 mb-4">No education information added yet.</p>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setIsAdding(true)}
            >
              Add Education
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {education.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className="bg-white border border-neutral-200 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-3 md:mb-0">
                  <h4 className="font-medium text-neutral-800">{edu.institution}</h4>
                  <p className="text-neutral-600 text-sm">{edu.degree} in {edu.field}</p>
                  <p className="text-neutral-500 text-sm">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-neutral-500 text-sm">GPA: {edu.gpa}</p>}
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
              {editIndex !== null ? 'Edit Education' : 'Add Education'}
            </h3>
            
            <form onSubmit={handleSubmit(handleAddEducation)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="institution" className="block text-sm font-medium text-neutral-700 mb-1">
                    Institution *
                  </label>
                  <input
                    id="institution"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.institution ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="University or College Name"
                    {...register('institution')}
                  />
                  {errors.institution && (
                    <p className="mt-1 text-sm text-error-600">{errors.institution.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-neutral-700 mb-1">
                    Degree *
                  </label>
                  <input
                    id="degree"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.degree ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="Bachelor's, Master's, etc."
                    {...register('degree')}
                  />
                  {errors.degree && (
                    <p className="mt-1 text-sm text-error-600">{errors.degree.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="field" className="block text-sm font-medium text-neutral-700 mb-1">
                    Field of Study *
                  </label>
                  <input
                    id="field"
                    type="text"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.field ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    placeholder="Computer Science, Business, etc."
                    {...register('field')}
                  />
                  {errors.field && (
                    <p className="mt-1 text-sm text-error-600">{errors.field.message}</p>
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
                  <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                    End Date *
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className={`
                      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                      ${errors.endDate ? 'border-error-500' : 'border-neutral-300'}
                    `}
                    {...register('endDate')}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-error-600">{errors.endDate.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="gpa" className="block text-sm font-medium text-neutral-700 mb-1">
                    GPA (Optional)
                  </label>
                  <input
                    id="gpa"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    placeholder="3.5"
                    {...register('gpa')}
                  />
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

export default EducationForm;