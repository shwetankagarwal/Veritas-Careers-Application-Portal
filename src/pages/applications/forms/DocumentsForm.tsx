import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, X, PlusCircle, Paperclip } from 'lucide-react';
import Button from '../../../components/ui/Button';

interface DocumentsFormProps {
  data: any;
  onSave: (data: any) => void;
}

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
}

const DocumentsForm: React.FC<DocumentsFormProps> = ({ data, onSave }) => {
  const [files, setFiles] = useState<Record<string, FileItem[]>>(
    data && Object.keys(data).length > 0
      ? {
          resume: data.resume ? [mockFileFromName(data.resume, 'resume')] : [],
          coverLetter: data.coverLetter ? [mockFileFromName(data.coverLetter, 'coverLetter')] : [],
          panCard: data.panCard ? [mockFileFromName(data.panCard, 'panCard')] : [],
          idProof: data.idProof ? [mockFileFromName(data.idProof, 'idProof')] : [],
          certificates: data.certificates ? data.certificates.map((name: string) => mockFileFromName(name, 'certificates')) : [],
        }
      : {
          resume: [],
          coverLetter: [],
          panCard: [],
          idProof: [],
          certificates: [],
        }
  );
  
  // Mock file generation for demonstration purposes
  function mockFileFromName(name: string, category: string): FileItem {
    return {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name,
      size: Math.floor(Math.random() * 5 * 1024 * 1024), // Random size up to 5MB
      type: name.endsWith('.pdf') ? 'application/pdf' : 'application/msword',
      progress: 100,
      status: 'completed',
      url: `https://example.com/files/${name}`,
    };
  }
  
  // Handle file selection
  const handleFileSelect = (category: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading' as const,
      }));
      
      // For single-file categories, replace existing files
      if (category !== 'certificates') {
        setFiles({ ...files, [category]: newFiles });
      } else {
        // For certificates, append to existing
        setFiles({ ...files, [category]: [...files[category], ...newFiles] });
      }
      
      // Simulate upload progress
      newFiles.forEach(file => {
        simulateFileUpload(category, file.id);
      });
    }
  };
  
  // Simulate file upload with progress
  const simulateFileUpload = (category: string, fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20);
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles[category]];
          const fileIndex = updatedFiles.findIndex(f => f.id === fileId);
          if (fileIndex !== -1) {
            updatedFiles[fileIndex] = { 
              ...updatedFiles[fileIndex],
              progress: 100,
              status: 'completed',
              url: `https://example.com/files/${updatedFiles[fileIndex].name}`,
            };
          }
          return { ...prevFiles, [category]: updatedFiles };
        });
      } else {
        setFiles(prevFiles => {
          const updatedFiles = [...prevFiles[category]];
          const fileIndex = updatedFiles.findIndex(f => f.id === fileId);
          if (fileIndex !== -1) {
            updatedFiles[fileIndex] = { 
              ...updatedFiles[fileIndex],
              progress,
            };
          }
          return { ...prevFiles, [category]: updatedFiles };
        });
      }
    }, 200);
  };
  
  // Remove a file
  const handleRemoveFile = (category: string, fileId: string) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles[category].filter(file => file.id !== fileId);
      return { ...prevFiles, [category]: updatedFiles };
    });
  };
  
  // Save all document data
  const handleSave = () => {
    const documentsData = {
      resume: files.resume.length > 0 ? files.resume[0].name : undefined,
      coverLetter: files.coverLetter.length > 0 ? files.coverLetter[0].name : undefined,
      panCard: files.panCard.length > 0 ? files.panCard[0].name : undefined,
      idProof: files.idProof.length > 0 ? files.idProof[0].name : undefined,
      certificates: files.certificates.map(file => file.name),
    };
    
    onSave(documentsData);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {/* Resume */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            Resume/CV *
          </label>
          <div className={`
            border-2 border-dashed rounded-lg p-6
            ${files.resume.length > 0 ? 'border-primary-200 bg-primary-50' : 'border-neutral-300 hover:border-primary-300'}
            transition-colors cursor-pointer
          `}>
            {files.resume.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center" 
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                <p className="text-sm font-medium text-neutral-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  PDF or Word document (max. 5MB)
                </p>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect('resume', e)}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {files.resume.map(file => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-md mr-3">
                        <File className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                        <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {file.status === 'uploading' ? (
                        <div className="w-24 bg-neutral-200 rounded-full h-1.5 mr-3">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full" 
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      ) : file.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                      ) : (
                        <span className="text-xs text-error-600 mr-2">Error</span>
                      )}
                      <button 
                        onClick={() => handleRemoveFile('resume', file.id)}
                        className="p-1 hover:bg-neutral-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Replace resume
                  <input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileSelect('resume', e)}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Cover Letter */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            Cover Letter
          </label>
          <div className={`
            border-2 border-dashed rounded-lg p-6
            ${files.coverLetter.length > 0 ? 'border-primary-200 bg-primary-50' : 'border-neutral-300 hover:border-primary-300'}
            transition-colors cursor-pointer
          `}>
            {files.coverLetter.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center" 
                onClick={() => document.getElementById('cover-letter-upload')?.click()}
              >
                <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                <p className="text-sm font-medium text-neutral-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  PDF or Word document (max. 5MB)
                </p>
                <input
                  id="cover-letter-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect('coverLetter', e)}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {files.coverLetter.map(file => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-md mr-3">
                        <File className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                        <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {file.status === 'uploading' ? (
                        <div className="w-24 bg-neutral-200 rounded-full h-1.5 mr-3">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full" 
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      ) : file.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                      ) : (
                        <span className="text-xs text-error-600 mr-2">Error</span>
                      )}
                      <button 
                        onClick={() => handleRemoveFile('coverLetter', file.id)}
                        className="p-1 hover:bg-neutral-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => document.getElementById('cover-letter-upload')?.click()}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Replace cover letter
                  <input
                    id="cover-letter-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileSelect('coverLetter', e)}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* PAN Card */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            PAN Card *
          </label>
          <div className={`
            border-2 border-dashed rounded-lg p-6
            ${files.panCard.length > 0 ? 'border-primary-200 bg-primary-50' : 'border-neutral-300 hover:border-primary-300'}
            transition-colors cursor-pointer
          `}>
            {files.panCard.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center" 
                onClick={() => document.getElementById('pan-card-upload')?.click()}
              >
                <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                <p className="text-sm font-medium text-neutral-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Image or PDF (max. 2MB)
                </p>
                <input
                  id="pan-card-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect('panCard', e)}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {files.panCard.map(file => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-md mr-3">
                        <File className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                        <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {file.status === 'uploading' ? (
                        <div className="w-24 bg-neutral-200 rounded-full h-1.5 mr-3">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full" 
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      ) : file.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                      ) : (
                        <span className="text-xs text-error-600 mr-2">Error</span>
                      )}
                      <button 
                        onClick={() => handleRemoveFile('panCard', file.id)}
                        className="p-1 hover:bg-neutral-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => document.getElementById('pan-card-upload')?.click()}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Replace PAN card
                  <input
                    id="pan-card-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect('panCard', e)}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* ID Proof */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700">
            ID Proof *
          </label>
          <div className={`
            border-2 border-dashed rounded-lg p-6
            ${files.idProof.length > 0 ? 'border-primary-200 bg-primary-50' : 'border-neutral-300 hover:border-primary-300'}
            transition-colors cursor-pointer
          `}>
            {files.idProof.length === 0 ? (
              <div 
                className="flex flex-col items-center justify-center" 
                onClick={() => document.getElementById('id-proof-upload')?.click()}
              >
                <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                <p className="text-sm font-medium text-neutral-900">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Image or PDF (max. 2MB)
                </p>
                <input
                  id="id-proof-upload"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect('idProof', e)}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {files.idProof.map(file => (
                  <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                    <div className="flex items-center">
                      <div className="bg-primary-100 p-2 rounded-md mr-3">
                        <File className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                        <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {file.status === 'uploading' ? (
                        <div className="w-24 bg-neutral-200 rounded-full h-1.5 mr-3">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full" 
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      ) : file.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                      ) : (
                        <span className="text-xs text-error-600 mr-2">Error</span>
                      )}
                      <button 
                        onClick={() => handleRemoveFile('idProof', file.id)}
                        className="p-1 hover:bg-neutral-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-neutral-500" />
                      </button>
                    </div>
                  </div>
                ))}
                <button 
                  className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => document.getElementById('id-proof-upload')?.click()}
                >
                  <PlusCircle className="h-4 w-4 mr-1" /> Replace ID proof
                  <input
                    id="id-proof-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileSelect('idProof', e)}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Certificates */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-neutral-700">
              Additional Certificates
            </label>
            <button 
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
              onClick={() => document.getElementById('certificate-upload')?.click()}
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Certificate
            </button>
            <input
              id="certificate-upload"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              multiple
              onChange={(e) => handleFileSelect('certificates', e)}
            />
          </div>
          
          {files.certificates.length === 0 ? (
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
              <Paperclip className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600">
                No certificates uploaded yet. Click "Add Certificate" to upload.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {files.certificates.map(file => (
                <motion.div 
                  key={file.id} 
                  className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-2 rounded-md mr-3">
                      <File className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{file.name}</p>
                      <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {file.status === 'uploading' ? (
                      <div className="w-24 bg-neutral-200 rounded-full h-1.5 mr-3">
                        <div 
                          className="bg-primary-600 h-1.5 rounded-full" 
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    ) : file.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                    ) : (
                      <span className="text-xs text-error-600 mr-2">Error</span>
                    )}
                    <button 
                      onClick={() => handleRemoveFile('certificates', file.id)}
                      className="p-1 hover:bg-neutral-100 rounded-full"
                    >
                      <X className="h-4 w-4 text-neutral-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Save & Continue Button */}
      <div className="pt-4 flex justify-end">
        <Button onClick={handleSave} variant="primary">
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default DocumentsForm;