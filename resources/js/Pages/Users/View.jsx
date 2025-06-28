import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, Link } from '@inertiajs/react';

export default function ViewUser() {
    const { user } = usePage().props;

    return (
        <DashboardLayout>
            <main className="p-6">
                <header className="mb-6 border-b pb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
                    <Link href={route('users.index')} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Back to List</Link>
                </header>
                <div className="bg-white shadow rounded p-6">
                    <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-semibold">{user.name}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2">{user.email}</span>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
