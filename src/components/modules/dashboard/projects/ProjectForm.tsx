"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TProjectFormData } from "@/types/project.type";
import { TagsInput } from "@/components/ui/TagsInput";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface ProjectFormProps {
    onSubmit: (data: TProjectFormData) => Promise<void>;
    initialData?: Partial<TProjectFormData>;
}

export function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<TProjectFormData>({
        defaultValues: initialData || {
            title: "",
            description: "",
            techStack: [],
            liveUrl: "",
            githubUrl: "",
            image: null,
            isTeam: false,
            teamSize: undefined,
            roleInTeam: "",
            startDate: undefined,
            endDate: undefined,
        },
    });

    const onSubmitHandler: SubmitHandler<TProjectFormData> = async (data) => {
        try {
            await onSubmit(data);
            // console.log('in project form : ',data);
        } catch (error) {
            // console.log(error);
            toast.error((error instanceof Error ? error.message : 'An error occurred while submitting'))
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-6"
        >

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                        id="title"
                        // className="bg-white"
                        className="bg-background"
                        placeholder="Awesome Portfolio App"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-sm text-destructive">{errors.title.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <Label htmlFor="image">Project Image</Label>
                    <Input
                        id="image"
                        type="file"
                        className="bg-background"
                        accept="image/*"
                        {...register("image", {
                            required: "Image is required",
                            validate: {
                                fileSize: (value: FileList | null) =>
                                    !value || !value[0] || value[0].size < 5 * 1024 * 1024 || "File must be under 5MB",
                                fileType: (value: FileList | null) =>
                                    !value || !value[0] || ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(value[0].type) ||
                                    "Only JPG, PNG, WEBP, or GIF allowed",
                            },
                        })}
                    />
                    {errors.image && (
                        <p className="text-sm text-destructive">{errors.image.message}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Live URL */}
                <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                        id="liveUrl"
                        type="url"
                        className="bg-white"
                        {...register("liveUrl", {
                            required: "Live URL is required",
                            // pattern: {
                            //     value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            //     message: "Please enter a valid URL",
                            // },
                        })}
                        placeholder="https://example.com"
                    />
                    {errors.liveUrl && (
                        <p className="text-sm text-destructive">{errors.liveUrl.message}</p>
                    )}
                </div>

                {/* GitHub URL */}
                <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                        id="githubUrl"
                        type="url"
                        className="bg-white"
                        {...register("githubUrl", {
                            required: "GitHub URL is required",
                            // pattern: {
                            //     value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            //     message: "Please enter a valid URL",
                            // },
                        })}
                        placeholder="https://github.com/username/repo"
                    />
                    {errors.githubUrl && (
                        <p className="text-sm text-destructive">{errors.githubUrl.message}</p>
                    )}
                </div>
            </div>

            {/* Is Team Project */}
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isTeam"
                        {...register("isTeam")}
                        className="w-4 h-4"
                    />
                    <Label htmlFor="isTeam">Is this a team project?</Label>
                </div>
            </div>

            {/* Conditional Team Fields */}
            {watch("isTeam") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Input
                            id="teamSize"
                            type="number"
                            min={1}
                            className="bg-white"
                            {...register("teamSize", {
                                validate: (value) =>
                                    !watch("isTeam") || (value && +value > 0) || "Team size is required",
                            })}
                        />
                        {errors.teamSize && (
                            <p className="text-sm text-destructive">{errors.teamSize.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="roleInTeam">Your Role</Label>
                        <Input
                            id="roleInTeam"
                            className="bg-white"
                            placeholder="e.g., Frontend Developer"
                            {...register("roleInTeam", {
                                validate: (value) =>
                                    !watch("isTeam") || !!value || "Role is required",
                            })}
                        />
                        {errors.roleInTeam && (
                            <p className="text-sm text-destructive">{errors.roleInTeam.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            type="date"
                            className="bg-white"
                            {...register("startDate", {
                                validate: (value) =>
                                    !watch("isTeam") || !!value || "Start date is required",
                            })}
                        />
                        {errors.startDate && (
                            <p className="text-sm text-destructive">{errors.startDate.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            type="date"
                            className="bg-white"
                            {...register("endDate", {
                                validate: (value) =>
                                    !watch("isTeam") || !!value || "End date is required",
                            })}
                        />
                        {errors.endDate && (
                            <p className="text-sm text-destructive">{errors.endDate.message}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
                <Label>Tech Stack (Tags)</Label>
                <TagsInput
                    value={watch("techStack")}
                    onChange={(tags) => setValue("techStack", tags)}
                    placeholder="Type and press enter to add tags"
                />
                {errors.techStack && (
                    <p className="text-sm text-destructive">{errors.techStack.message}</p>
                )}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    rows={5}
                    className="bg-white"
                    placeholder="Describe your project features, tech, and purpose..."
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-1/2 md:w-1/3">
                    {isSubmitting ? "Submitting..." : "Submit Project"}
                </Button>
            </div>
        </form>
    );
};
