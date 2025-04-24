export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'shortlisted'
  | 'interview_scheduled'
  | 'hired'
  | 'rejected';

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  educationInfo: EducationInfo[];
  experienceInfo: ExperienceInfo[];
  documents: Documents;
  interviews?: Interview[];
  offers?: Offer[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  panNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}

export interface EducationInfo {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ExperienceInfo {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
}

export interface Documents {
  resume?: string;
  coverLetter?: string;
  panCard?: string;
  idProof?: string;
  certificates?: string[];
}

export interface Interview {
  id: string;
  applicationId: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  interviewType: 'phone' | 'video' | 'in_person';
  location?: string;
  meetingLink?: string;
  interviewers?: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
}

export interface Offer {
  id: string;
  applicationId: string;
  offerDate: string;
  position: string;
  salary: string;
  startDate: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  documentUrl: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDate: string;
  deadline: string;
  isActive: boolean;
}