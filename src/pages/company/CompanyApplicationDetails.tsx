import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Download,
  Check,
  X,
  Video,
  MessageSquare
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Application } from '../../types/application';
import { applications } from '../../utils/mockData';

const CompanyApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    startTime: '',
    endTime: '',
    type: 'video',
    meetLink: '',
    interviewers: [''],
  });

  useEffect(() => {
    const fetchApplication = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const foundApp = applications.find(app => app.id === id);
      setApplication(foundApp || null);
      setLoading(false);
    };

    fetchApplication();
  }, [id]);

  const handleScheduleInterview = async () => {
    // In a real app, this would make an API call to schedule the interview
    const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
    setInterviewDetails(prev => ({ ...prev, meetLink }));
    setShowScheduleModal(false);
    
    // Update application status
    if (application) {
      const updatedApp = {
        ...application,
        status: 'interview_scheduled',
        interviews: [
          ...(application.interviews || []),
          {
            id: Date.now().toString(),
            applicationId: application.id,
            scheduledDate: interviewDetails.date,
            startTime: interviewDetails.startTime,
            endTime: interviewDetails.endTime,
            interviewType: interviewDetails.type,
            meetingLink: meetLink,
            interviewers: interviewDetails.interviewers,
            status: 'scheduled',
          },
        ],
      };
      setApplication(updatedApp);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Application Not Found</h2>
        <p className="text-neutral-600 mb-6">The application you're looking for doesn't exist or has been removed.</p>
        <Link to="/company/applications">
          <Button variant="primary">Back to Applications</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/company/applications" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Applications
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Application Review</h1>
            <p className="text-neutral-600">
              Submitted on {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            {application.status !== 'interview_scheduled' && (
              <Button 
                variant="primary"
                icon={<Calendar className="h-4 w-4" />}
                onClick={() => setShowScheduleModal(true)}
              >
                Schedule Interview
              </Button>
            )}
            <Button 
              variant="outline"
              icon={<MessageSquare className="h-4 w-4" />}
            >
              Message Candidate
            </Button>
          </div>
        </div>
      </div>

      {/* Candidate Information */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Candidate Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-neutral-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Full Name</p>
                <p className="text-neutral-900">
                  {application.personalInfo.firstName} {application.personalInfo.lastName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-neutral-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Email</p>
                <p className="text-neutral-900">{application.personalInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-neutral-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Phone</p>
                <p className="text-neutral-900">{application.personalInfo.phone}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-neutral-500 mr-2" />
              <div>
                <p className="text-sm font-medium text-neutral-500">Resume</p>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                  <Download className="h-4 w-4 mr-1" /> Download Resume
                </button>
              </div>
            </div>
            
            {application.documents.coverLetter && (
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-neutral-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-neutral-500">Cover Letter</p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                    <Download className="h-4 w-4 mr-1" /> Download Cover Letter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interview Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Schedule Interview</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                    value={interviewDetails.startTime}
                    onChange={(e) => setInterviewDetails(prev => ({ ...prev, startTime: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                    value={interviewDetails.endTime}
                    onChange={(e) => setInterviewDetails(prev => ({ ...prev, endTime: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Interview Type
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                  value={interviewDetails.type}
                  onChange={(e) => setInterviewDetails(prev => ({ ...prev, type: e.target.value as 'video' | 'phone' | 'in_person' }))}
                >
                  <option value="video">Video Interview</option>
                  <option value="phone">Phone Interview</option>
                  <option value="in_person">In-person Interview</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Interviewers
                </label>
                {interviewDetails.interviewers.map((interviewer, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                      placeholder="Interviewer name"
                      value={interviewer}
                      onChange={(e) => {
                        const newInterviewers = [...interviewDetails.interviewers];
                        newInterviewers[index] = e.target.value;
                        setInterviewDetails(prev => ({ ...prev, interviewers: newInterviewers }));
                      }}
                    />
                    {index === interviewDetails.interviewers.length - 1 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setInterviewDetails(prev => ({
                          ...prev,
                          interviewers: [...prev.interviewers, '']
                        }))}
                      >
                        Add
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newInterviewers = interviewDetails.interviewers.filter((_, i) => i !== index);
                          setInterviewDetails(prev => ({ ...prev, interviewers: newInterviewers }));
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline"
                onClick={() => setShowScheduleModal(false)}
                icon={<X className="h-4 w-4" />}
              >
                Cancel
              </Button>
              <Button 
                variant="primary"
                onClick={handleScheduleInterview}
                icon={<Check className="h-4 w-4" />}
              >
                Schedule Interview
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Interview Details (if scheduled) */}
      {application.status === 'interview_scheduled' && application.interviews && application.interviews.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Interview Details</h2>
          
          {application.interviews.map((interview, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-neutral-600 mr-2" />
                    <p className="text-neutral-800">{interview.scheduledDate}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Time</p>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-neutral-600 mr-2" />
                    <p className="text-neutral-800">
                      {interview.startTime} - {interview.endTime}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-1">Type</p>
                  <div className="flex items-center">
                    <Video className="h-5 w-5 text-neutral-600 mr-2" />
                    <p className="text-neutral-800">
                      {interview.interviewType === 'video' 
                        ? 'Video Interview' 
                        : interview.interviewType === 'phone' 
                        ? 'Phone Interview' 
                        : 'In-person Interview'}
                    </p>
                  </div>
                </div>
              </div>
              
              {interview.interviewers && (
                <div>
                  <p className="text-sm font-medium text-neutral-500 mb-2">Interviewers</p>
                  <div className="flex flex-wrap gap-2">
                    {interview.interviewers.map((interviewer, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-800"
                      >
                        {interviewer}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {interview.meetingLink && (
                <div className="pt-4 border-t border-neutral-200">
                  <Button 
                    variant="primary"
                    icon={<Video className="h-4 w-4" />}
                    onClick={() => window.open(interview.meetingLink, '_blank')}
                  >
                    Join Google Meet
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyApplicationDetails;