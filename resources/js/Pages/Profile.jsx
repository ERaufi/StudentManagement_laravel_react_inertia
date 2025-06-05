import React from 'react';
import DashboardLayoutWithSidebar from '@/Layouts/DashboardLayoutWithSidebar';
import { Head } from '@inertiajs/react';

export default function Profile() {
    return (
        <DashboardLayoutWithSidebar>
            <Head title="Profile" />
            <div className="p-4">This is your profile page (Composition Layout).</div>
        </DashboardLayoutWithSidebar>
    );
}
