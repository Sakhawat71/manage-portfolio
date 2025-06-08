'use client';

import AddExperienceForm from '@/components/modules/dashboard/experience/CreateExperienceComponent';
import { createExperience } from '@/services/experience';
import { TExperienceForm } from '@/types/experience.type';
import toast from 'react-hot-toast';

const CreateExperiencePage = () => {
    const handleSubmit = async (data: TExperienceForm) => {
        try {
            const res = await createExperience(data);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message || 'Failed to add experience');
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to submit');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-1 text-center">Add New Experience</h2>
            <AddExperienceForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateExperiencePage;
