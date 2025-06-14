import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function TeachersIndex() {
    const { teachers } = usePage().props;
    const { t } = useTranslation();

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Teachers Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to the Teacher management section.')}</p>
                </header>
                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2">#</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.data.map((teacher, index) => (
                                <tr key={teacher.id} className="border-b text-sm">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{teacher.name}</td>
                                    <td className="p-2">{teacher.email}</td>
                                    <td className="p-2">{teacher.phone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4 gap-2 text-sm">
                        {teachers.links.map((link, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
