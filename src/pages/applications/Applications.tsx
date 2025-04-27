import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, PlusCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Application } from '../../types/application';
import { applications } from '../../utils/mockData';

const Applications = () => {
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setUserApplications(applications);
      setLoading(false);
    };

    fetchApplications();
  }, []);

  const filteredApplications = userApplications.filter(app => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">My Applications</h1>
          <p className="text-neutral-600">Track and manage your job applications</p>
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

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 border-neutral-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>

            <Button 
              variant="outline"
              icon={<Filter className="h-4 w-4" />}
            >
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-neutral-900">Senior Software Engineer</div>
                  <div className="text-sm text-neutral-500">Full-time</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-neutral-900">Tech Corp</div>
                  <div className="text-sm text-neutral-500">San Francisco, CA</div>
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
                    to={`/applications/${application.id}`}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplications.length === 0 && (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">No Applications Found</h3>
            <p className="text-neutral-600 mb-4">Start your job search journey by submitting your first application</p>
            <Link to="/applications/new">
              <Button 
                variant="primary"
                size="sm"
                icon={<PlusCircle className="h-4 w-4" />}
              >
                New Application
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;