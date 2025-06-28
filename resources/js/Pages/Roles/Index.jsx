import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RolesIndex() {
    const { roles, flash } = usePage().props;
    const { t } = useTranslation();

    return (
        <DashboardLayout>
            <main className="p-6 space-y-6">
                {flash.success && (
                    <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded">
                        {flash.success}
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <Link
                        href={route('roles.create')}
                        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                    >
                        {t('Create Role')}
                    </Link>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2"># </th>
                                <th className="p-2">{t('Name')}</th>
                                <th className='p-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map((role) => (
                                <tr key={role.id} className="border-b text-sm">
                                    <td className="p-2">{role.id}</td>
                                    <td className="p-2">{role.name}</td>
                                    <td>
                                        <Link
                                            href={`roles/add-permission-to-role/${role.id}`}
                                            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Permissions
                                        </Link>
                                        <Link
                                            href={`roles/add-users-to-role/${role.id}`}
                                            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Assign Users
                                        </Link>

                                        <Link
                                            href={route('students.show', role.id)}
                                            className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-2"
                                        >
                                            Rename
                                        </Link>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </DashboardLayout>
    );
}
