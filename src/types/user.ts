export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'admin' | 'recruiter';
  profile?: UserProfile;
}

export interface UserProfile {
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  education?: EducationDetails[];
  experience?: ExperienceDetails[];
  skills?: string[];
}

export interface EducationDetails {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface ExperienceDetails {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
}