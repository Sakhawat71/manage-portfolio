export type TProjectFormData = {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    image: FileList | null;
};

export type TProjectData = {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    // imageUrl?: string;
};