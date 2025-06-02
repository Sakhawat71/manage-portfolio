
import { ProjectsTable } from '@/components/modules/dashboard/projects/ProjectTable';
import { getAllProjects } from '@/services/project';
import React from 'react';

const ProjectPage = async () => {

    const projects = await getAllProjects();
    const handleDeleteProject = async (id: string) => {

    };

    const updateProject = async (id: string) => {

    };

    return (
        <div>
            <h4>Projects page</h4>
            <ProjectsTable
                projects={projects?.data}
                // onEdit={(id) => updateProject(id)}
                // onDelete={(id) => handleDeleteProject(id)}
            />

        </div>
    );
};

export default ProjectPage;