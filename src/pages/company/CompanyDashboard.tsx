import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  PlusCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { useCompany } from '../../contexts/CompanyContext';
import Button from '../../components/ui/Button';
import { Job, JobApplication } from '../../types/company';

const CompanyDashboard = () => {
  const { company } = useCompany();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API calls
      await Promise.all([
        // Fetch jobs
        new Promise(resolve => setTimeout(resolve, 800)),
        // Fetch applications
        new Promise(resolve => setTimeout(resolve, 800))
      ]);

      // Mock data
      setJobs([
        {
          id: '1',
          companyId: company?.id || '',
          title: 'Senior Software Engineer',
          description: 'We are looking for a Senior Software Engineer...',
          requirements: ['5+ years experience', 'React expertise'],
          responsibilities: ['Lead development team', 'Architect solutions'],
          location: 'Remote',
          type: 'full-time',
          experience: '5+ years',
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deadline: '2025-03-31',
        }
      ]);

      setApplications([
        {
          id: '1',
          jobId: '1',
          candidateId: '1',
          status: 'interview_scheduled',
          interview: {
            scheduledAt: '2025-02-28T10:00:00Z',
            meetLink: 'https://meet.google.com/abc-defg-hij',
            duration: 60,
            interviewers: ['John Doe', 'Jane Smith']
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ]);

      setLoading(false);
    };

    fetchData();
  }, [company?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Company Dashboard</h1>
          <p className="text-neutral-600">Manage your job listings and applications</p>
        </div>
        <Link to="/company/jobs/new">
          <Button 
            variant="primary"
            icon={<PlusCircle className="h-5 w-5" />}
          >
            Post New Job
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
              <Briefcase className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Active Jobs</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{jobs.length}</p>
          <p className="text-neutral-500 mt-1">
            {jobs.filter(job => job.status === 'published').length} published
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Applications</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-900">{applications.length}</p>
          <p className="text-neutral-500 mt-1">
            {applications.filter(app => app.status === 'pending').length} new
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-accent-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-neutral-800">Interviews</h3>
          </div>
          <p className="text-3xl font-bold text-neutral-900">
            {applications.filter(app => app.status === 'interview_scheduled').length}
          </p>
          <p className="text-neutral-500 mt-1">scheduled this week</p>
        </motion.div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Applications</h2>
          <Link 
            to="/company/applications" 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {applications.map(application => {
                const job = jobs.find(j => j.id === application.jobId);
                return (
                  <tr key={application.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                          JD
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">John Doe</div>
                          <div className="text-sm text-neutral-500">john@example.com</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">{job?.title}</div>
                      <div className="text-sm text-neutral-500">{job?.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                        ${application.status === 'interview_scheduled' 
                          ? 'bg-success-100 text-success-800' 
                          : application.status === 'rejected'
                          ? 'bg-error-100 text-error-800'
                          : 'bg-warning-100 text-warning-800'}
                      `}>
                        {application.status.replace('_', ' ').charAt(0).toUpperCase() + 
                         application.status.slice(1).replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/company/applications/${application.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-neutral-900">Upcoming Interviews</h2>
          <Link 
            to="/company/interviews" 
            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
          >
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {applications.filter(app => app.status === 'interview_scheduled').length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">No Upcoming Interviews</h3>
            <p className="text-neutral-600">You haven't scheduled any interviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications
              .filter(app => app.status === 'interview_scheduled')
              .map(application => {
                const job = jobs.find(j => j.id === application.jobId);
                return (
                  <div 
                    key={application.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                        JD
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900">John Doe</h3>
                        <p className="text-sm text-neutral-500">{job?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-neutral-900">
                          {new Date(application.interview?.scheduledAt || '').toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {new Date(application.interview?.scheduledAt || '').toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="primary"
                        size="sm"
                        icon={<ArrowRight className="h-4 w-4" />}
                        onClick={() => window.open(application.interview?.meetLink, '_blank')}
                      >
                        Join
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;