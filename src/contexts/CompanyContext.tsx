import React, { createContext, useState, useContext, useEffect } from "react";
import { Company } from "../types/company";

interface CompanyContextType {
    company: Company | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error("useCompany must be used within a CompanyProvider");
    }
    return context;
};

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored company data in localStorage
        const storedCompany = localStorage.getItem("veritasCompany");
        if (storedCompany) {
            setCompany(JSON.parse(storedCompany));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockCompany: Company = {
            id: "1",
            name: "Tech Corp",
            email,
            industry: "Technology",
            size: "1000+",
            location: "San Francisco, CA",
        };

        setCompany(mockCompany);
        localStorage.setItem("veritasCompany", JSON.stringify(mockCompany));
        setLoading(false);
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newCompany: Company = {
            id: Date.now().toString(),
            name,
            email,
            industry: "",
            size: "",
            location: "",
        };

        setCompany(newCompany);
        localStorage.setItem("veritasCompany", JSON.stringify(newCompany));
        setLoading(false);
    };

    const logout = () => {
        setCompany(null);
        localStorage.removeItem("veritasCompany");
    };

    const value = {
        company,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!company,
    };

    return (
        <CompanyContext.Provider value={value}>
            {children}
        </CompanyContext.Provider>
    );
};
