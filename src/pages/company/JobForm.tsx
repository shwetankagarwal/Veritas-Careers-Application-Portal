import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const jobSchema = z.object({
    title: z.string().min(2, "Job title is required"),
    description: z.string().min(10, "Job description is required"),
    location: z.string().min(2, "Location is required"),
    type: z.enum(["full-time", "part-time", "contract", "internship"]),
    experience: z.string().min(2, "Experience requirement is required"),
    requirements: z.string().min(10, "Requirements are required"),
    responsibilities: z.string().min(10, "Responsibilities are required"),
    salaryMin: z.string().optional(),
    salaryMax: z.string().optional(),
    currency: z.string().optional(),
    deadline: z.string().min(2, "Application deadline is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

const JobForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<JobFormValues>({
        resolver: zodResolver(jobSchema),
    });

    const onSubmit = async (data: JobFormValues) => {
        // In a real app, this would make an API call to create the job
        console.log(data);
        navigate("/company/jobs");
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link
                    to="/company/jobs"
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Jobs
                </Link>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                    Post New Job
                </h1>
                <p className="text-neutral-600">
                    Create a new job listing to find the perfect candidate
                </p>
            </div>

            <motion.div
                className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${errors.title ? "border-error-500" : "border-neutral-300"}
                `}
                                placeholder="e.g. Senior Software Engineer"
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Job Description *
                            </label>
                            <textarea
                                rows={5}
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${
                      errors.description
                          ? "border-error-500"
                          : "border-neutral-300"
                  }
                `}
                                placeholder="Describe the role and responsibilities"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${errors.location ? "border-error-500" : "border-neutral-300"}
                `}
                                placeholder="e.g. San Francisco, CA or Remote"
                                {...register("location")}
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Employment Type *
                            </label>
                            <select
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${errors.type ? "border-error-500" : "border-neutral-300"}
                `}
                                {...register("type")}
                            >
                                <option value="">Select type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                            {errors.type && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.type.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Experience Required *
                            </label>
                            <input
                                type="text"
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${
                      errors.experience
                          ? "border-error-500"
                          : "border-neutral-300"
                  }
                `}
                                placeholder="e.g. 3+ years"
                                {...register("experience")}
                            />
                            {errors.experience && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Application Deadline *
                            </label>
                            <input
                                type="date"
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${errors.deadline ? "border-error-500" : "border-neutral-300"}
                `}
                                {...register("deadline")}
                            />
                            {errors.deadline && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.deadline.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Requirements *
                            </label>
                            <textarea
                                rows={4}
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${
                      errors.requirements
                          ? "border-error-500"
                          : "border-neutral-300"
                  }
                `}
                                placeholder="List the key requirements for this position"
                                {...register("requirements")}
                            />
                            {errors.requirements && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.requirements.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Responsibilities *
                            </label>
                            <textarea
                                rows={4}
                                className={`
                  w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500
                  ${
                      errors.responsibilities
                          ? "border-error-500"
                          : "border-neutral-300"
                  }
                `}
                                placeholder="List the key responsibilities for this position"
                                {...register("responsibilities")}
                            />
                            {errors.responsibilities && (
                                <p className="mt-1 text-sm text-error-600">
                                    {errors.responsibilities.message}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <h3 className="text-lg font-medium text-neutral-800 mb-4">
                                Salary Range (Optional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                        Minimum
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                                        placeholder="e.g. 50000"
                                        {...register("salaryMin")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                        Maximum
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                                        placeholder="e.g. 80000"
                                        {...register("salaryMax")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                        Currency
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                                        {...register("currency")}
                                    >
                                        <option value="">
                                            Select currency
                                        </option>
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="INR">INR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/company/jobs")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            icon={<Save className="h-4 w-4" />}
                        >
                            Post Job
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default JobForm;
