import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

const ProfilePersistent = () => {
    return (
        <>
            <Head title="Profile" />
            <div className="p-4">This is your profile page (Persistent Layout).</div>
        </>
    );
};

ProfilePersistent.layout = page => <DashboardLayout>{page}</DashboardLayout>;

export default ProfilePersistent;
