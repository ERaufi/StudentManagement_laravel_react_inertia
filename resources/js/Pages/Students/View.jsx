// resources/js/Pages/Students/View.jsx

import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function View() {
    const { student } = usePage().props;
    const { t } = useTranslation();

    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Student Details')}</h1>
                    <Link
                        href={route('students.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        {t('Back to List')}
                    </Link>
                </header>

                <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        {student.image_url ? (
                            <img
                                src={student.image_url}
                                alt={student.name}
                                className="w-48 h-48 object-cover rounded border"
                            />
                        ) : (
                            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-400 border rounded">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <span className="text-gray-600">{t('Name')}:</span>
                            <span className="ml-2 font-semibold">{student.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Email')}:</span>
                            <span className="ml-2">{student.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Age')}:</span>
                            <span className="ml-2">{student.age}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Date of Birth')}:</span>
                            <span className="ml-2">{student.date_of_birth || '-'}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Gender')}:</span>
                            <span className="ml-2">{student.gender === 'm' ? t('Male') : t('Female')}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Score')}:</span>
                            <span className="ml-2">{student.score}</span>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
