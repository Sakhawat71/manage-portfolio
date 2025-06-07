"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TProjectFormData } from "@/types/project.type";
import { TagsInput } from "@/components/ui/TagsInput";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
    onSubmit: (data: TProjectFormData) => Promise<void>;
    initialData?: Partial<TProjectFormData>;
}

export function ProjectForm({ onSubmit, initialData }: ProjectFormProps) {
    const {
        register,
        handleSubmit,
        control,
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
        },
    });

    const onSubmitHandler: SubmitHandler<TProjectFormData> = async (data) => {
        try {
            await onSubmit(data);

        } catch (error) {

        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
            {/* Title */}
            <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                    id="title"
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
                    accept="image/*"
                    {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                    <p className="text-sm text-destructive">{errors.image.message}</p>
                )}
            </div>

            {/* Live URL */}
            <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                    id="liveUrl"
                    type="url"
                    {...register("liveUrl", {
                        required: "Live URL is required",
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid URL",
                        },
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
                    {...register("githubUrl", {
                        required: "GitHub URL is required",
                        pattern: {
                            value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                            message: "Please enter a valid URL",
                        },
                    })}
                    placeholder="https://github.com/username/repo"
                />
                {errors.githubUrl && (
                    <p className="text-sm text-destructive">{errors.githubUrl.message}</p>
                )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
                <Label>Tech Stack</Label>
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
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
            </div>


            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Project"}
            </Button>
        </form>
    );
}