import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function View({ studentClass }) {
    return (
        <DashboardLayout>
            <main className="p-6 min-h-screen bg-gray-100">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold mb-6 text-center">Student Class Record Details</h1>

                    <div className="mb-4">
                        <strong className="block text-gray-700 mb-1">ID:</strong>
                        <span>{studentClass.id}</span>
                    </div>

                    <div className="mb-4">
                        <strong className="block text-gray-700 mb-1">Student:</strong>
                        <span>{studentClass.student?.name || 'N/A'}</span>
                    </div>

                    <div className="mb-4">
                        <strong className="block text-gray-700 mb-1">Class:</strong>
                        <span>{studentClass.class?.name || 'N/A'}</span>
                    </div>

                    <div className="mb-4">
                        <strong className="block text-gray-700 mb-1">Score:</strong>
                        <span>{studentClass.score !== null ? studentClass.score : '-'}</span>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <Link
                            href={route('student_classes.edit', studentClass.id)}
                            className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Edit
                        </Link>

                        <Link
                            href={route('student_classes.index')}
                            className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
