import React from 'react';
import DashboardLayoutWithSidebar from '@/Layouts/DashboardLayoutWithSidebar';
import { Head } from '@inertiajs/react';

export default function DashboardComposition() {
    return (
        <DashboardLayoutWithSidebar>
            <Head title="Dashboard" />
            <div className="p-4">Welcome to your dashboard (Composition Layout)!</div>
        </DashboardLayoutWithSidebar>
    );
}
