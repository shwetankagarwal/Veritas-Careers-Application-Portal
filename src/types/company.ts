export interface Company {
    id: string;
    name: string;
    email: string;
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
    description?: string;
    logo?: string;
}

export interface Job {
    id: string;
    companyId: string;
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    experience: string;
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    status: "draft" | "published" | "closed";
    createdAt: string;
    updatedAt: string;
    deadline: string;
}

export interface JobApplication {
    id: string;
    jobId: string;
    candidateId: string;
    status:
        | "pending"
        | "reviewing"
        | "shortlisted"
        | "rejected"
        | "interview_scheduled"
        | "hired";
    interview?: {
        scheduledAt: string;
        meetLink: string;
        duration: number;
        interviewers: string[];
    };
    createdAt: string;
    updatedAt: string;
}
