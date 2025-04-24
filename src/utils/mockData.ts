import { Application, ApplicationStatus, Job, Interview } from '../types/application';

// Sample job listings
export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    description: 'We are looking for a Senior Software Engineer to join our team and help build our next-generation products.',
    requirements: [
      'At least 5 years of experience in software development',
      'Proficiency in JavaScript, TypeScript, and React',
      'Experience with backend technologies like Node.js, Express',
      'Excellent problem-solving skills',
    ],
    responsibilities: [
      'Design and implement new features for our web applications',
      'Collaborate with cross-functional teams to define, design, and ship new features',
      'Identify and address performance bottlenecks',
      'Mentor junior developers',
    ],
    postedDate: '2025-01-15',
    deadline: '2025-02-28',
    isActive: true,
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    description: 'We are seeking a Product Manager to help us define and execute our product strategy.',
    requirements: [
      'At least 3 years of experience in product management',
      'Strong analytical and problem-solving skills',
      'Excellent communication skills',
      'Experience with agile methodologies',
    ],
    responsibilities: [
      'Define the product vision and strategy',
      'Work with engineering, design, and other teams to deliver features',
      'Conduct market research and competitive analysis',
      'Gather and prioritize product requirements',
    ],
    postedDate: '2025-01-20',
    deadline: '2025-03-10',
    isActive: true,
  },
];

// Sample application data
export const applications: Application[] = [
  {
    id: '1',
    userId: '1',
    jobId: '1',
    status: 'interview_scheduled',
    createdAt: '2025-01-20T10:30:00Z',
    updatedAt: '2025-01-25T14:45:00Z',
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      panNumber: 'ABCDE1234F',
      dateOfBirth: '1990-01-15',
      gender: 'Female',
    },
    educationInfo: [
      {
        id: '1',
        institution: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2015-09-01',
        endDate: '2017-06-01',
        gpa: '3.8',
      },
      {
        id: '2',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2011-09-01',
        endDate: '2015-06-01',
        gpa: '3.7',
      },
    ],
    experienceInfo: [
      {
        id: '1',
        company: 'Tech Innovations Inc',
        position: 'Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2017-07-01',
        endDate: '2021-12-31',
        description: 'Developed and maintained web applications using React and Node.js.',
      },
      {
        id: '2',
        company: 'Digital Solutions Ltd',
        position: 'Junior Developer',
        location: 'San Francisco, CA',
        startDate: '2016-05-01',
        endDate: '2017-06-30',
        description: 'Assisted in the development of web applications and fixed bugs.',
      },
    ],
    documents: {
      resume: 'resume_jane_doe.pdf',
      coverLetter: 'cover_letter_jane_doe.pdf',
      panCard: 'pan_jane_doe.pdf',
      idProof: 'id_proof_jane_doe.pdf',
      certificates: ['certificate1.pdf', 'certificate2.pdf'],
    },
    interviews: [
      {
        id: '1',
        applicationId: '1',
        scheduledDate: '2025-01-27',
        startTime: '10:00',
        endTime: '11:00',
        interviewType: 'video',
        meetingLink: 'https://meet.example.com/abc123',
        interviewers: ['John Smith', 'Sarah Johnson'],
        status: 'scheduled',
      },
    ],
  },
  {
    id: '2',
    userId: '1',
    jobId: '2',
    status: 'submitted',
    createdAt: '2025-01-22T09:15:00Z',
    updatedAt: '2025-01-22T09:15:00Z',
    personalInfo: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
      panNumber: 'ABCDE1234F',
      dateOfBirth: '1990-01-15',
      gender: 'Female',
    },
    educationInfo: [
      {
        id: '1',
        institution: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: '2015-09-01',
        endDate: '2017-06-01',
        gpa: '3.8',
      },
    ],
    experienceInfo: [
      {
        id: '1',
        company: 'Tech Innovations Inc',
        position: 'Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2017-07-01',
        endDate: '2021-12-31',
        description: 'Developed and maintained web applications using React and Node.js.',
      },
    ],
    documents: {
      resume: 'resume_jane_doe.pdf',
      coverLetter: 'cover_letter_jane_doe.pdf',
    },
  },
];

// Sample interviews data
export const interviews: Interview[] = [
  {
    id: '1',
    applicationId: '1',
    scheduledDate: '2025-01-27',
    startTime: '10:00',
    endTime: '11:00',
    interviewType: 'video',
    meetingLink: 'https://meet.example.com/abc123',
    interviewers: ['John Smith', 'Sarah Johnson'],
    status: 'scheduled',
  },
  {
    id: '2',
    applicationId: '1',
    scheduledDate: '2025-01-30',
    startTime: '14:00',
    endTime: '15:00',
    interviewType: 'phone',
    interviewers: ['Mark Wilson'],
    status: 'scheduled',
  },
];

// Get application status label and color
export const getStatusInfo = (status: ApplicationStatus) => {
  const statusMap: Record<ApplicationStatus, { label: string; color: string }> = {
    draft: { 
      label: 'Draft', 
      color: 'bg-neutral-100 text-neutral-700' 
    },
    submitted: { 
      label: 'Submitted', 
      color: 'bg-secondary-100 text-secondary-700' 
    },
    under_review: { 
      label: 'Under Review', 
      color: 'bg-secondary-100 text-secondary-700' 
    },
    shortlisted: { 
      label: 'Shortlisted', 
      color: 'bg-success-100 text-success-700' 
    },
    interview_scheduled: { 
      label: 'Interview Scheduled', 
      color: 'bg-accent-100 text-accent-700' 
    },
    hired: { 
      label: 'Hired', 
      color: 'bg-success-100 text-success-700' 
    },
    rejected: { 
      label: 'Rejected', 
      color: 'bg-error-100 text-error-700' 
    },
  };
  
  return statusMap[status];
};