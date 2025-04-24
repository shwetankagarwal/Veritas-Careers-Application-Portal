import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  PlusCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { applications, interviews, getStatusInfo } from '../../utils/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState('Good day');
  
  // Update greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Get upcoming interviews
  const upcomingInterviews = interviews.filter(interview => 
    interview.status === 'scheduled' &&
    new Date(`${interview.scheduledDate}T${interview.startTime}`) > new Date()
  ).sort((a, b) => 
    new Date(`${a.scheduledDate}T${a.startTime}`).getTime() - 
    new Date(`${b.scheduledDate}T${b.startTime}`).getTime()
  ).slice(0, 3);

  // Calculate application statistics
  const totalApplications = applications.length;
  const submittedApplications = applications.filter(app => 
    app.status !== 'draft'
  ).length;
  const interviewsScheduled = applications.filter(app => 
    app.status === 'interview_scheduled'
  ).length;
  const recentApplications = [...applications].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">{greeting}, {user?.name}</h1>
          <p className="text-neutral-600">Here's an overview of your application journey</p>
        </div>
        <Link to="/applications/new">
          <Button 
            variant="primary"
            icon={<PlusCircle className="h-5 w-5" />}
          >
            New Application
          </Button>
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Applications</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{totalApplications}</p>
          <p className="text-neutral-500 mt-1">{submittedApplications} submitted</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Interviews</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{interviewsScheduled}</p>
          <p className="text-neutral-500 mt-1">{upcomingInterviews.length} upcoming</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-accent-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Progress</h3>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${(submittedApplications / Math.max(totalApplications, 1)) * 100}%` }}
            ></div>
          </div>
          <p className="text-neutral-500 mt-2">Application progress</p>
        </motion.div>
      </div>
      
      {/* Recent Applications */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
          <Link to="/applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {recentApplications.map((application) => {
                  const statusInfo = getStatusInfo(application.status);
                  return (
                    <tr key={application.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-neutral-900">Senior Software Engineer</div>
                        <div className="text-sm text-neutral-500">Engineering</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {new Date(application.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                        <Link 
                          to={`/applications/${application.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500">You haven't applied to any positions yet.</p>
            <Button 
              variant="primary" 
              className="mt-4"
              icon={<PlusCircle className="h-5 w-5" />}
            >
              Start an Application
            </Button>
          </div>
        )}
      </div>
      
      {/* Upcoming Interviews */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Upcoming Interviews</h2>
          <Link to="/interviews" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {upcomingInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingInterviews.map((interview) => (
              <motion.div 
                key={interview.id}
                className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">Software Engineer Interview</p>
                    <p className="text-sm text-neutral-600">
                      {interview.interviewType === 'video' ? 'Video Interview' : interview.interviewType === 'phone' ? 'Phone Interview' : 'In-person Interview'}
                    </p>
                  </div>
                  <div className={`rounded-full p-1.5 ${
                    new Date(`${interview.scheduledDate}T${interview.startTime}`) < new Date(Date.now() + 24 * 60 * 60 * 1000)
                      ? 'bg-error-100'
                      : 'bg-accent-100'
                  }`}>
                    <Clock className={`h-5 w-5 ${
                      new Date(`${interview.scheduledDate}T${interview.startTime}`) < new Date(Date.now() + 24 * 60 * 60 * 1000)
                        ? 'text-error-600'
                        : 'text-accent-600'
                    }`} />
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-neutral-500 mr-2" />
                    <span className="text-sm text-neutral-700">
                      {new Date(interview.scheduledDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-neutral-500 mr-2" />
                    <span className="text-sm text-neutral-700">
                      {new Date(`2000-01-01T${interview.startTime}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })} - {new Date(`2000-01-01T${interview.endTime}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  {interview.meetingLink && (
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Join Meeting <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-500">No upcoming interviews scheduled.</p>
          </div>
        )}
      </div>
      
      {/* Action Steps */}
      <div className="bg-gradient-to-tr from-primary-500 to-primary-700 p-6 rounded-xl text-white">
        <h2 className="text-xl font-semibold mb-4">Your Next Steps</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Complete your profile</p>
              <p className="text-sm text-white/80">Enhance your chances by completing your profile</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Upload your latest resume</p>
              <p className="text-sm text-white/80">Keep your resume updated with your latest experience</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Prepare for upcoming interviews</p>
              <p className="text-sm text-white/80">Review the job description and practice your responses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;