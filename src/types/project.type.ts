export type TProjectFormData = {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    image: FileList | null;
    isTeam: boolean,
    teamSize: number | undefined,
    roleInTeam: string,
    startDate: Date | undefined,
    endDate: Date | undefined,
};

export type TProjectData = {
    title: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    // imageUrl?: string;
};