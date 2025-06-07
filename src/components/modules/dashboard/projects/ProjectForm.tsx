"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import { TProjectFormData } from "@/types/project.type";

const ProjectForm = ({
    onSubmit,
    initialData,
}: {
    onSubmit: (data: TProjectFormData) => Promise<void>;
    initialData?: Partial<TProjectFormData>;
}) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TProjectFormData>({
        defaultValues: initialData || {
            title: "",
            description: "",
            techStack: [],
            liveUrl: "",
            githubUrl: "",
            image: null,
        },
    });

    const [techInput, setTechInput] = useState("");

    const handleAddTech = () => {
        if (techInput.trim() && !watch("techStack").includes(techInput.trim())) {
            setValue("techStack", [...watch("techStack"), techInput.trim()]);
            setTechInput("");
        }
    };

    const handleRemoveTech = (tech: string) => {
        setValue(
            "techStack",
            watch("techStack").filter((t) => t !== tech)
        );
    };

    const { watch, setValue } = useForm<TProjectFormData>();

    const onSubmitHandler: SubmitHandler<TProjectFormData> = async (data) => {
        try {
            await onSubmit(data);
            reset();
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-6 max-w-2xl mx-auto"
        >
            {/* Title */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Project Title
                </label>
                <input
                    id="title"
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    rows={4}
                    {...register("description", { required: "Description is required" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            {/* Tech Stack */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
                <div className="mt-1 flex gap-2">
                    <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        placeholder="Add a technology"
                    />
                    <button
                        type="button"
                        onClick={handleAddTech}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add
                    </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {watch("techStack")?.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                            {tech}
                            <button
                                type="button"
                                onClick={() => handleRemoveTech(tech)}
                                className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="hidden"
                    {...register("techStack", { required: "At least one technology is required" })}
                />
                {errors.techStack && (
                    <p className="mt-1 text-sm text-red-600">{errors.techStack.message}</p>
                )}
            </div>

            {/* Live URL */}
            <div>
                <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700">
                    Live URL
                </label>
                <input
                    id="liveUrl"
                    type="url"
                    {...register("liveUrl", {
                        required: "Live URL is required",
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid URL",
                        },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="https://example.com"
                />
                {errors.liveUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.liveUrl.message}</p>
                )}
            </div>

            {/* GitHub URL */}
            <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                    GitHub URL
                </label>
                <input
                    id="githubUrl"
                    type="url"
                    {...register("githubUrl", {
                        required: "GitHub URL is required",
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid URL",
                        },
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && (
                    <p className="mt-1 text-sm text-red-600">{errors.githubUrl.message}</p>
                )}
            </div>

            {/* Image Upload */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Project Image
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Submitting..." : "Submit Project"}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;