import { ExperiencesTable } from '@/components/modules/dashboard/experience/ExperiencesTable';
import { getAllExperiences } from '@/services/experience';
import Link from 'next/link';
import React from 'react';

const ExperiencesPage = async () => {

    const experiences = await getAllExperiences();

    return (
        <div>
            <div className="w-full bg-slate-300 shadow-sm px-4 py-3 flex items-center justify-between rounded-md border">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Manage Experiences
                </h2>
                <Link
                    href="/"
                    className="text-sm md:text-base font-medium bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200"
                >
                    Add New Experience
                </Link>
            </div>
            <ExperiencesTable experiences={experiences?.data} />
        </div>
    );
};

export default ExperiencesPage;