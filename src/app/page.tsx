import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import React from 'react';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to Home</h1>
            <Button> Click </Button>
        </div>
    );
};

export default HomePage;