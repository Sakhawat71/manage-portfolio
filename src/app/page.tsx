import HomeComponent from '@/components/modules/home/HomeComponent';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <HomeComponent />
        </div>
    );
};

export default HomePage;