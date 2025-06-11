import DashboardLayout from "@/Layouts/DashboardLayout";
import { useTranslation } from 'react-i18next';
import { usePage } from "@inertiajs/react";
function Teachers() {
    const { my_name } = usePage().props;
    const { t, i18n } = useTranslation();

    return (
        <main className="flex-1 p-6">
            <header className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">{t('Teachers Page')}</h1>
                <p className="text-sm text-gray-500">{t('Welcome to the Teacher management section.')}</p>
                <p>{t('welcome')}</p>
            </header>
            <section className="space-y-4">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-700">{t('Here you can manage Teacher data, view details, and perform actions.')}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
                    <p><strong>{t('Name')}</strong></p>
                    <p><strong>{t('Last Name')}</strong></p>
                    <p>my name is {my_name}</p>
                </div>
            </section>
        </main>
    );
}

// Teachers.layout = function (page) {
//     return <DashboardLayout>{page}</DashboardLayout>
// }
Teachers.layout = page => <DashboardLayout>{page}</DashboardLayout>
export default Teachers;



