import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Upload, Check, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Document {
  id: string;
  name: string;
  type: 'resume' | 'cover_letter' | 'pan_card' | 'id_proof' | 'certificate' | 'offer_letter';
  status: 'approved' | 'pending' | 'rejected';
  uploadDate: string;
  fileSize: number;
  downloadUrl: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDocuments = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      setDocuments([
        {
          id: '1',
          name: 'resume_jane_doe.pdf',
          type: 'resume',
          status: 'approved',
          uploadDate: '2025-01-20T10:30:00Z',
          fileSize: 1245184, // in bytes
          downloadUrl: '#',
        },
        {
          id: '2',
          name: 'cover_letter_jane_doe.pdf',
          type: 'cover_letter',
          status: 'approved',
          uploadDate: '2025-01-20T10:35:00Z',
          fileSize: 845312, // in bytes
          downloadUrl: '#',
        },
        {
          id: '3',
          name: 'pan_jane_doe.pdf',
          type: 'pan_card',
          status: 'approved',
          uploadDate: '2025-01-20T10:40:00Z',
          fileSize: 524288, // in bytes
          downloadUrl: '#',
        },
        {
          id: '4',
          name: 'id_proof_jane_doe.pdf',
          type: 'id_proof',
          status: 'approved',
          uploadDate: '2025-01-20T10:45:00Z',
          fileSize: 655360, // in bytes
          downloadUrl: '#',
        },
        {
          id: '5',
          name: 'certificate1.pdf',
          type: 'certificate',
          status: 'approved',
          uploadDate: '2025-01-20T10:50:00Z',
          fileSize: 1048576, // in bytes
          downloadUrl: '#',
        },
        {
          id: '6',
          name: 'offer_letter_software_engineer.pdf',
          type: 'offer_letter',
          status: 'pending',
          uploadDate: '2025-01-27T14:30:00Z',
          fileSize: 1572864, // in bytes
          downloadUrl: '#',
        },
      ]);
      
      setLoading(false);
    };
    
    fetchDocuments();
  }, []);
  
  // Helper function to format bytes to human-readable size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Helper function to get document type label
  const getDocumentTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      resume: 'Resume/CV',
      cover_letter: 'Cover Letter',
      pan_card: 'PAN Card',
      id_proof: 'ID Proof',
      certificate: 'Certificate',
      offer_letter: 'Offer Letter',
    };
    
    return typeMap[type] || type;
  };
  
  // Get status badge style
  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return 'bg-success-100 text-success-800';
    } else if (status === 'pending') {
      return 'bg-warning-100 text-warning-800';
    } else {
      return 'bg-error-100 text-error-800';
    }
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
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Documents</h1>
          <p className="text-neutral-600">Access and manage all your application documents</p>
        </div>
        <Button 
          variant="primary"
          icon={<Upload className="h-4 w-4" />}
        >
          Upload New Document
        </Button>
      </div>
      
      {/* Key Documents Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">Key Documents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.filter(doc => 
            ['resume', 'pan_card', 'offer_letter'].includes(doc.type)
          ).map((document, index) => (
            <motion.div 
              key={document.id}
              className={`
                bg-white rounded-xl shadow-sm border p-6
                ${document.type === 'offer_letter' ? 'border-primary-200' : 'border-neutral-200'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`
                    p-3 rounded-md mr-3
                    ${document.type === 'offer_letter' ? 'bg-primary-100' : 'bg-neutral-100'}
                  `}>
                    <FileText className={`
                      h-6 w-6
                      ${document.type === 'offer_letter' ? 'text-primary-600' : 'text-neutral-600'}
                    `} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {getDocumentTypeLabel(document.type)}
                    </h3>
                    <p className="text-sm text-neutral-500">{document.name}</p>
                  </div>
                </div>
                <span className={`
                  px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                  ${getStatusBadge(document.status)}
                `}>
                  {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                <span>Uploaded on {formatDate(document.uploadDate)}</span>
                <span>{formatFileSize(document.fileSize)}</span>
              </div>
              
              {document.type === 'offer_letter' && document.status === 'pending' && (
                <div className="bg-warning-50 border border-warning-200 rounded-md p-3 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-warning-700">
                    Your offer letter is being prepared and will be available for download soon.
                  </p>
                </div>
              )}
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Eye className="h-4 w-4" />}
                >
                  View
                </Button>
                <Button 
                  variant={document.type === 'offer_letter' ? 'primary' : 'outline'}
                  size="sm"
                  icon={<Download className="h-4 w-4" />}
                  disabled={document.status === 'pending'}
                >
                  Download
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* All Documents */}
      <div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">All Documents</h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Document Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Uploaded
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
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-neutral-500 mr-3" />
                      <span className="text-sm font-medium text-neutral-900">
                        {document.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-800">
                      {getDocumentTypeLabel(document.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-neutral-800">
                      {formatDate(document.uploadDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full
                      ${getStatusBadge(document.status)}
                    `}>
                      {document.status === 'approved' && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      View
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;