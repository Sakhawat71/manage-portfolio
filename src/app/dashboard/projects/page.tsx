import { ProjectsTable } from '@/components/modules/dashboard/projects/ProjectTable';
import { getAllProjects } from '@/services/project';
import React from 'react';

const ProjectPage = async () => {

    const projects = await getAllProjects();
    console.log(projects);

    return (
        <div>
            <h4>Projects page</h4>
            <ProjectsTable />
        </div>
    );
};

export default ProjectPage;