import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function View() {
    const { teacher } = usePage().props;
    const { t } = useTranslation();

    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Teacher Details')}</h1>
                    <Link
                        href={route('teachers.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        {t('Back to List')}
                    </Link>
                </header>

                <div className="bg-white shadow rounded p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                        {teacher.image_url ? (
                            <img
                                src={teacher.image_url}
                                alt={teacher.name}
                                className="w-48 h-48 object-cover rounded border"
                            />
                        ) : (
                            <div className="w-48 h-48 flex items-center justify-center bg-gray-100 text-gray-400 border rounded">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        {/* Teacher Info */}
                        <div>
                            <span className="text-gray-600">{t('Name')}:</span>
                            <span className="ml-2 font-semibold">{teacher.name}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Email')}:</span>
                            <span className="ml-2">{teacher.email}</span>
                        </div>
                        <div>
                            <span className="text-gray-600">{t('Phone')}:</span>
                            <span className="ml-2">{teacher.phone}</span>
                        </div>

                        {/* User Info */}
                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-xl font-semibold">{t('User Account Info')}</h2>
                            {teacher.user ? (
                                <>
                                    <div>
                                        <span className="text-gray-600">{t('User Name')}:</span>
                                        <span className="ml-2">{teacher.user.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">{t('User Email')}:</span>
                                        <span className="ml-2">{teacher.user.email}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-red-500">{t('No user linked')}</div>
                            )}
                        </div>

                        {/* Classes Table */}
                        <div className="mt-6 border-t pt-4">
                            <h2 className="text-xl font-semibold mb-4">{t('Classes')}</h2>
                            {teacher.classes && teacher.classes.length > 0 ? (
                                <table className="min-w-full table-auto border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left">{t('Name')}</th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">{t('Description')}</th>
                                            <th className="border border-gray-300 px-4 py-2">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teacher.classes.map((cls) => (
                                            <tr key={cls.id} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{cls.name}</td>
                                                <td className="border border-gray-300 px-4 py-2">{cls.description}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-center">
                                                    <Link
                                                        href=""
                                                        className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                    >
                                                        {t('Show Students')}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500">{t('No classes assigned')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
