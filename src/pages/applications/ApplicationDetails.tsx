import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { applications, getStatusInfo, interviews } from '../../utils/mockData';
import { Application, Interview } from '../../types/application';

const ApplicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationInterviews, setApplicationInterviews] = useState<Interview[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchApplicationDetails = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundApp = applications.find(app => app.id === id);
      setApplication(foundApp || null);
      
      if (foundApp) {
        const appInterviews = interviews.filter(interview => interview.applicationId === foundApp.id);
        setApplicationInterviews(appInterviews);
      }
      
      setLoading(false);
    };
    
    fetchApplicationDetails();
  }, [id]);
  
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
        <Link to="/dashboard">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }
  
  const statusInfo = getStatusInfo(application.status);
  
  // Get the next interview if there's one scheduled
  const nextInterview = applicationInterviews.find(interview => 
    interview.status === 'scheduled' && 
    new Date(`${interview.scheduledDate}T${interview.startTime}`) > new Date()
  );

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Your application has been submitted and is awaiting review. We\'ll notify you when there are updates.';
      case 'under_review':
        return 'Your application is currently being reviewed by our recruitment team. We\'ll be in touch soon with next steps.';
      case 'interview_scheduled':
        return 'Congratulations! You\'ve been selected for an interview. Please check your upcoming interviews section for details.';
      case 'hired':
        return 'Congratulations! You\'ve been selected for the position. Please check your documents section for your offer letter.';
      case 'rejected':
        return 'We appreciate your interest, but we\'ve decided to pursue other candidates at this time. We encourage you to apply for future positions.';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/dashboard" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Senior Software Engineer Application</h1>
            <p className="text-neutral-600">Applied on {new Date(application.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}</p>
          </div>
          <span className={`
            px-3 py-1 inline-flex items-center rounded-full text-sm font-medium
            ${statusInfo.color}
          `}>
            {statusInfo.label}
          </span>
        </div>
      </div>
      
      {/* Application Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Application Overview</h2>
        
        <div className="space-y-6">
          {/* Application Timeline */}
          <div className="relative">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Application Timeline</h3>
            <div className="ml-4 border-l-2 border-neutral-200 pl-6 pb-1 space-y-6 relative">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -left-[38px] top-0">
                  <div className="bg-success-500 h-6 w-6 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-base font-medium text-neutral-800">Application Submitted</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  {new Date(application.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="absolute -left-[38px] top-0">
                  <div className="bg-success-500 h-6 w-6 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-base font-medium text-neutral-800">Application Under Review</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  {new Date(application.updatedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="absolute -left-[38px] top-0">
                  {application.status === 'interview_scheduled' ? (
                    <div className="bg-success-500 h-6 w-6 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-neutral-300 h-6 w-6 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <h4 className="text-base font-medium text-neutral-800">Interview Scheduled</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  {application.status === 'interview_scheduled' 
                    ? 'January 25, 2025' 
                    : 'Pending'}
                </p>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="absolute -left-[38px] top-0">
                  <div className="bg-neutral-300 h-6 w-6 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-base font-medium text-neutral-800">Offer Decision</h4>
                <p className="text-sm text-neutral-600 mt-1">Pending</p>
              </motion.div>
            </div>
          </div>
          
          {/* Current Status */}
          <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
            <h3 className="text-base font-medium text-neutral-800 mb-2">Current Status</h3>
            <p className="text-neutral-700">
              {getStatusMessage(application.status)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Next Steps / Upcoming Interview */}
      {nextInterview && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-primary-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Upcoming Interview</h2>
              <p className="text-primary-600">Your interview has been scheduled!</p>
            </div>
            <Button 
              variant="primary"
              icon={<ExternalLink className="h-4 w-4" />}
              onClick={() => window.open(nextInterview.meetingLink, '_blank')}
            >
              Join Interview
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Date</p>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-neutral-600 mr-2" />
                <p className="text-neutral-800">
                  {new Date(nextInterview.scheduledDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Time</p>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-neutral-600 mr-2" />
                <p className="text-neutral-800">
                  {new Date(`2000-01-01T${nextInterview.startTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })} - {new Date(`2000-01-01T${nextInterview.endTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">Type</p>
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 text-neutral-600 mr-2" />
                <p className="text-neutral-800">
                  {nextInterview.interviewType === 'video' 
                    ? 'Video Interview' 
                    : nextInterview.interviewType === 'phone' 
                      ? 'Phone Interview' 
                      : 'In-person Interview'}
                </p>
              </div>
            </div>
          </div>
          
          {nextInterview.interviewers && nextInterview.interviewers.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-500 mb-2">Interviewers</p>
              <div className="flex flex-wrap gap-2">
                {nextInterview.interviewers.map((interviewer, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-800"
                  >
                    {interviewer}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-neutral-700">
                Be sure to test your camera and microphone before the interview. Arrive 5 minutes early to ensure a smooth start.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Application Documents</h2>
        
        <div className="space-y-4">
          {application.documents.resume && (
            <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Resume/CV</p>
                  <p className="text-sm text-neutral-500">{application.documents.resume}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Download
              </Button>
            </div>
          )}
          
          {application.documents.coverLetter && (
            <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Cover Letter</p>
                  <p className="text-sm text-neutral-500">{application.documents.coverLetter}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Download
              </Button>
            </div>
          )}
          
          {application.documents.panCard && (
            <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-lg border border-neutral-200">
              <div className="flex items-center">
                <div className="bg-primary-100 p-2 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">PAN Card</p>
                  <p className="text-sm text-neutral-500">{application.documents.panCard}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Download
              </Button>
            </div>
          )}
          
          {/* Offer Letter (shown only when applicable) */}
          {application.status === 'hired' && (
            <div className="flex items-center justify-between bg-success-50 p-4 rounded-lg border border-success-200">
              <div className="flex items-center">
                <div className="bg-success-100 p-2 rounded-md mr-3">
                  <FileText className="h-5 w-5 text-success-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">Offer Letter</p>
                  <p className="text-sm text-success-600">Ready to download</p>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="sm"
                icon={<Download className="h-4 w-4" />}
              >
                Download
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        {application.status !== 'rejected' && application.status !== 'hired' && (
          <Button 
            variant="outline" 
            icon={<XCircle className="h-4 w-4" />}
          >
            Withdraw Application
          </Button>
        )}
        <Button 
          variant="primary"
          icon={<MessageCircle className="h-4 w-4" />}
        >
          Contact Recruiter
        </Button>
      </div>
    </div>
  );
};

export default ApplicationDetails;