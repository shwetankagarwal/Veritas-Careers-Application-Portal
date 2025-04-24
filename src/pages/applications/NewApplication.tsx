import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import PersonalInfoForm from './forms/PersonalInfoForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import DocumentsForm from './forms/DocumentsForm';
import ReviewForm from './forms/ReviewForm';

// Step interface
interface Step {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
}

const NewApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    education: [],
    experience: [],
    documents: {}
  });
  
  // Define form steps
  const steps: Step[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Provide your contact and personal details',
      component: <PersonalInfoForm 
        data={formData.personalInfo} 
        onSave={(data) => {
          setFormData({...formData, personalInfo: data});
          setCurrentStep(1);
        }} 
      />
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Add your educational background',
      component: <EducationForm 
        data={formData.education} 
        onSave={(data) => {
          setFormData({...formData, education: data});
          setCurrentStep(2);
        }} 
      />
    },
    {
      id: 'experience',
      title: 'Work Experience',
      description: 'Share your professional experience',
      component: <ExperienceForm 
        data={formData.experience} 
        onSave={(data) => {
          setFormData({...formData, experience: data});
          setCurrentStep(3);
        }} 
      />
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Upload your resume and other documents',
      component: <DocumentsForm 
        data={formData.documents} 
        onSave={(data) => {
          setFormData({...formData, documents: data});
          setCurrentStep(4);
        }} 
      />
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Review your application before submission',
      component: <ReviewForm 
        data={formData} 
        onSubmit={() => {
          // Simulate form submission
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }} 
      />
    }
  ];

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Apply for Position</h1>
        <p className="text-neutral-600">Complete all steps to submit your application</p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <div 
                className={`
                  relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                  ${index <= currentStep ? 'bg-primary-600' : 'bg-neutral-200'}
                  ${index < currentStep ? 'cursor-pointer' : ''}
                `}
                onClick={() => {
                  if (index < currentStep) {
                    setCurrentStep(index);
                  }
                }}
              >
                <span 
                  className={`
                    text-sm font-medium
                    ${index <= currentStep ? 'text-white' : 'text-neutral-600'}
                  `}
                >
                  {index + 1}
                </span>
              </div>
              <p 
                className={`
                  mt-2 text-xs font-medium text-center
                  ${index <= currentStep ? 'text-primary-600' : 'text-neutral-500'}
                `}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress line */}
        <div className="relative h-0.5 bg-neutral-200">
          <div 
            className="absolute h-0.5 bg-primary-600 transition-all"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Step Description */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-neutral-200">
        <h2 className="text-xl font-semibold text-neutral-800 mb-2">
          {steps[currentStep].title}
        </h2>
        <p className="text-neutral-600">
          {steps[currentStep].description}
        </p>
      </div>
      
      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200"
      >
        {steps[currentStep].component}
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 0 && (
          <Button variant="outline" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <span></span> // Empty span to maintain flex spacing
        )}
      </div>
    </div>
  );
};

export default NewApplication;