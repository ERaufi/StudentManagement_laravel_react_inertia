import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useTranslation } from 'react-i18next';
export default function Students() {
    const { abc, dd, user_name } = usePage().props;
    const { t, i18n } = useTranslation();
    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Students Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to the student management section.')}</p>
                </header>
                <section className="space-y-4">
                    <div className="bg-white p-6 rounded shadow">
                        <p className="text-gray-700">{t('Here you can manage student data, view details, and perform actions.')}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
                        <p><strong>{t('Name')}</strong> {abc}</p>
                        <p><strong>{t('Last Name')}</strong> {dd}</p>

                        <p>The user name is {user_name}</p>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    );
}

