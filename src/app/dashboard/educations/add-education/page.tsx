'use client';

import AddEducationForm from '@/components/modules/dashboard/education/CreateEducation';
import { createEducation } from '@/services/education';
import { TEducationForm } from '@/types/education.type';
import toast from 'react-hot-toast';


const CreateEducationPage = () => {
    const handleSubmit = async (data: TEducationForm) => {
        try {
            const res = await createEducation(data);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message || 'Failed to add education');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to submit');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-1 text-center">Add New Education</h2>
            <AddEducationForm onSubmit={handleSubmit} />
        </div>
    );
};

export default CreateEducationPage;
