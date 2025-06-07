import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

const DashboardPersistent = () => {
    return (
        <>
            <Head title="Dashboard" />
            <div className="p-4">Welcome to your dashboard (Persistent Layout)!</div>
        </>
    );
};

DashboardPersistent.layout = page => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPersistent;
