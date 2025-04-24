import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Edit2, Check, Loader } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface ReviewFormProps {
  data: any;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ data, onSubmit }) => {
  const [sections, setSections] = useState({
    personalInfo: true,
    education: true,
    experience: true,
    documents: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toggleSection = (section: keyof typeof sections) => {
    setSections({
      ...sections,
      [section]: !sections[section],
    });
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-neutral-50 cursor-pointer"
          onClick={() => toggleSection('personalInfo')}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-neutral-800">Personal Information</h3>
            {Object.keys(data.personalInfo).length > 0 && (
              <span className="ml-3 bg-success-100 text-success-800 text-xs font-medium py-0.5 px-2 rounded-full">
                Complete
              </span>
            )}
          </div>
          <button className="text-neutral-500">
            {sections.personalInfo ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {sections.personalInfo && Object.keys(data.personalInfo).length > 0 && (
          <div className="p-4 border-t border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-500">Name</p>
                <p className="text-base text-neutral-800">{data.personalInfo.firstName} {data.personalInfo.lastName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Email</p>
                <p className="text-base text-neutral-800">{data.personalInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Phone</p>
                <p className="text-base text-neutral-800">{data.personalInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Address</p>
                <p className="text-base text-neutral-800">
                  {data.personalInfo.address}, {data.personalInfo.city}, {data.personalInfo.state} {data.personalInfo.zipCode}, {data.personalInfo.country}
                </p>
              </div>
              {data.personalInfo.panNumber && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">PAN Number</p>
                  <p className="text-base text-neutral-800">{data.personalInfo.panNumber}</p>
                </div>
              )}
              {data.personalInfo.dateOfBirth && (
                <div>
                  <p className="text-sm font-medium text-neutral-500">Date of Birth</p>
                  <p className="text-base text-neutral-800">{data.personalInfo.dateOfBirth}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Education Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-neutral-50 cursor-pointer"
          onClick={() => toggleSection('education')}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-neutral-800">Education</h3>
            {data.education.length > 0 && (
              <span className="ml-3 bg-success-100 text-success-800 text-xs font-medium py-0.5 px-2 rounded-full">
                {data.education.length} {data.education.length === 1 ? 'entry' : 'entries'}
              </span>
            )}
          </div>
          <button className="text-neutral-500">
            {sections.education ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {sections.education && data.education.length > 0 && (
          <div className="p-4 border-t border-neutral-200 space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={edu.id} className={`${
                index !== data.education.length - 1 ? 'pb-4 border-b border-neutral-200' : ''
              }`}>
                <h4 className="font-medium text-neutral-800">{edu.institution}</h4>
                <p className="text-neutral-600 text-sm">{edu.degree} in {edu.field}</p>
                <p className="text-neutral-500 text-sm">{edu.startDate} - {edu.endDate}</p>
                {edu.gpa && <p className="text-neutral-500 text-sm">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Experience Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-neutral-50 cursor-pointer"
          onClick={() => toggleSection('experience')}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-neutral-800">Work Experience</h3>
            {data.experience.length > 0 && (
              <span className="ml-3 bg-success-100 text-success-800 text-xs font-medium py-0.5 px-2 rounded-full">
                {data.experience.length} {data.experience.length === 1 ? 'entry' : 'entries'}
              </span>
            )}
          </div>
          <button className="text-neutral-500">
            {sections.experience ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {sections.experience && data.experience.length > 0 && (
          <div className="p-4 border-t border-neutral-200 space-y-4">
            {data.experience.map((exp: any, index: number) => (
              <div key={exp.id} className={`${
                index !== data.experience.length - 1 ? 'pb-4 border-b border-neutral-200' : ''
              }`}>
                <h4 className="font-medium text-neutral-800">{exp.position}</h4>
                <p className="text-neutral-600 text-sm">{exp.company} - {exp.location}</p>
                <p className="text-neutral-500 text-sm">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </p>
                <p className="text-neutral-700 text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Documents Section */}
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div 
          className="flex justify-between items-center p-4 bg-neutral-50 cursor-pointer"
          onClick={() => toggleSection('documents')}
        >
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-neutral-800">Documents</h3>
            {Object.keys(data.documents).length > 0 && (
              <span className="ml-3 bg-success-100 text-success-800 text-xs font-medium py-0.5 px-2 rounded-full">
                {Object.values(data.documents).flat().filter(Boolean).length} files
              </span>
            )}
          </div>
          <button className="text-neutral-500">
            {sections.documents ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {sections.documents && Object.keys(data.documents).length > 0 && (
          <div className="p-4 border-t border-neutral-200">
            <div className="space-y-3">
              {data.documents.resume && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">Resume/CV</p>
                    <p className="text-sm text-neutral-500">{data.documents.resume}</p>
                  </div>
                  <Check className="h-5 w-5 text-success-500" />
                </div>
              )}
              
              {data.documents.coverLetter && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">Cover Letter</p>
                    <p className="text-sm text-neutral-500">{data.documents.coverLetter}</p>
                  </div>
                  <Check className="h-5 w-5 text-success-500" />
                </div>
              )}
              
              {data.documents.panCard && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">PAN Card</p>
                    <p className="text-sm text-neutral-500">{data.documents.panCard}</p>
                  </div>
                  <Check className="h-5 w-5 text-success-500" />
                </div>
              )}
              
              {data.documents.idProof && (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-700">ID Proof</p>
                    <p className="text-sm text-neutral-500">{data.documents.idProof}</p>
                  </div>
                  <Check className="h-5 w-5 text-success-500" />
                </div>
              )}
              
              {data.documents.certificates && data.documents.certificates.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Additional Certificates</p>
                  <ul className="space-y-1">
                    {data.documents.certificates.map((cert: string, index: number) => (
                      <li key={index} className="text-sm text-neutral-500 flex items-center">
                        <Check className="h-4 w-4 text-success-500 mr-2" /> {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Submit Section */}
      <div className="bg-white p-6 rounded-lg border border-neutral-200">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Ready to Submit Your Application?</h3>
          <p className="text-neutral-600 mb-6">
            Please review all the information above and make sure everything is correct before submitting your application.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center text-success-700">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Personal Information</span>
            </div>
            <div className="flex items-center text-success-700">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Education Details</span>
            </div>
            <div className="flex items-center text-success-700">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Experience Details</span>
            </div>
            <div className="flex items-center text-success-700">
              <Check className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Required Documents</span>
            </div>
          </div>
          
          <div className="space-x-4">
            <Button variant="outline" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button 
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader className="animate-spin" /> : undefined}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
          
          {isSubmitting && (
            <motion.div 
              className="mt-6 text-neutral-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>Please wait while we process your application...</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;