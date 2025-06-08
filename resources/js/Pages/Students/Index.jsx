import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
export default function Students() {
    const { abc, dd } = usePage().props;

    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Students Page</h1>
                    <p className="text-sm text-gray-500">Welcome to the student management section.</p>
                </header>
                <section className="space-y-4">
                    <div className="bg-white p-6 rounded shadow">
                        <p className="text-gray-700">Here you can manage student data, view details, and perform actions.</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
                        <p><strong>abc:</strong> {abc}</p>
                        <p><strong>dd:</strong> {dd}</p>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    );
}

