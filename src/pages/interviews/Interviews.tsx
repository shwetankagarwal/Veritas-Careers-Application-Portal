import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Plus, Check, X, ExternalLink, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import { interviews } from '../../utils/mockData';
import { Interview } from '../../types/application';

const Interviews = () => {
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);
  const [pastInterviews, setPastInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchInterviews = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const now = new Date();
      
      const upcoming = interviews.filter(interview => 
        interview.status === 'scheduled' &&
        new Date(`${interview.scheduledDate}T${interview.startTime}`) > now
      ).sort((a, b) => 
        new Date(`${a.scheduledDate}T${a.startTime}`).getTime() - 
        new Date(`${b.scheduledDate}T${b.startTime}`).getTime()
      );
      
      const past = interviews.filter(interview => 
        interview.status === 'completed' || 
        (interview.status === 'scheduled' && new Date(`${interview.scheduledDate}T${interview.startTime}`) <= now)
      ).sort((a, b) => 
        new Date(`${b.scheduledDate}T${b.startTime}`).getTime() - 
        new Date(`${a.scheduledDate}T${a.startTime}`).getTime()
      );
      
      setUpcomingInterviews(upcoming);
      setPastInterviews(past);
      setLoading(false);
    };
    
    fetchInterviews();
  }, []);
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Helper function to format time
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Interview Schedule</h1>
        <p className="text-neutral-600">Manage your upcoming and past interviews</p>
      </div>
      
      {/* Upcoming Interviews */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Upcoming Interviews</h2>
          <Button 
            variant="outline" 
            size="sm"
            icon={<Calendar className="h-4 w-4" />}
          >
            Sync to Calendar
          </Button>
        </div>
        
        {upcomingInterviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">No Upcoming Interviews</h3>
            <p className="text-neutral-600 mb-4">You don't have any interviews scheduled at this time.</p>
            <Link to="/dashboard">
              <Button variant="primary" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <motion.div 
                key={interview.id}
                className="bg-white rounded-xl shadow-sm border border-primary-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">Technical Interview</h3>
                    <p className="text-primary-600">
                      {interview.interviewType === 'video' ? 'Video Interview' : 
                       interview.interviewType === 'phone' ? 'Phone Interview' : 
                       'In-Person Interview'}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {interview.meetingLink && (
                      <Button 
                        variant="primary"
                        size="sm"
                        icon={<ExternalLink className="h-4 w-4" />}
                        onClick={() => window.open(interview.meetingLink, '_blank')}
                      >
                        Join Meeting
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      size="sm"
                      icon={<X className="h-4 w-4" />}
                    >
                      Reschedule
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-b border-neutral-200">
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-neutral-600 mr-2" />
                      <p className="text-neutral-800">{formatDate(interview.scheduledDate)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-neutral-500 mb-1">Time</p>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-neutral-600 mr-2" />
                      <p className="text-neutral-800">
                        {formatTime(interview.startTime)} - {formatTime(interview.endTime)}
                      </p>
                    </div>
                  </div>
                  
                  {interview.interviewers && interview.interviewers.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-1">Interviewers</p>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-neutral-600 mr-2" />
                        <p className="text-neutral-800">
                          {interview.interviewers.join(', ')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Link 
                    to={`/applications/${interview.applicationId}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View Application <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Past Interviews */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Past Interviews</h2>
        
        {pastInterviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
            <p className="text-neutral-600">You don't have any past interviews.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {pastInterviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-neutral-900">Software Engineer</p>
                      <p className="text-xs text-neutral-500">Technical Interview</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-neutral-800">{formatDate(interview.scheduledDate)}</p>
                      <p className="text-xs text-neutral-500">
                        {formatTime(interview.startTime)} - {formatTime(interview.endTime)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-neutral-800">
                        {interview.interviewType === 'video' ? 'Video' : 
                         interview.interviewType === 'phone' ? 'Phone' : 
                         'In-Person'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                        ${interview.status === 'completed' 
                          ? 'bg-success-100 text-success-800' 
                          : interview.status === 'cancelled' 
                          ? 'bg-error-100 text-error-800'
                          : 'bg-neutral-100 text-neutral-800'}
                      `}>
                        {interview.status === 'completed' 
                          ? 'Completed' 
                          : interview.status === 'cancelled' 
                          ? 'Cancelled'
                          : 'Missed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/applications/${interview.applicationId}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;