import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react'; // ✅ New

export default function TeachersIndex() {
    const { teachers, search: initialSearch, sort, direction, flash } = usePage().props;
    const { t } = useTranslation();

    const [search, setSearch] = useState(initialSearch || '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('teachers', { search }, {
            preserveState: true,
            replace: true,
        });
    };


    const handleSort = (field) => {
        const newDirection = sort === field && direction === 'asc' ? 'desc' : 'asc';
        router.get('teachers', {
            search,
            sort: field,
            direction: newDirection,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    // ✅ New: Show arrow for active sort
    const renderSortArrow = (field) => {
        if (sort !== field) return null;
        return direction === 'asc' ? ' ▲' : ' ▼';
    };

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    const [msg, setMsg] = useState(flash.success);

    setTimeout(() => {
        setMsg(null);
    }, 2000);


    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.visit(route('teachers.destroy', id), {
                method: 'delete',
            });
        }
    };


    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                {
                    msg && (
                        <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
                            {msg}
                        </div>
                    )
                }
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Teachers Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to the Teacher management section.')}</p>
                </header>

                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder={t('Search Teachers...')}
                        className="w-full md:w-1/3 px-3 py-2 border rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        {t('Search')}
                    </button>
                </form>


                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <Link
                        href={route('teachers.create')}
                        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                    >
                        {t('Create Teacher')}
                    </Link>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>#{renderSortArrow('id')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Name{renderSortArrow('name')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('email')}>Email{renderSortArrow('email')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('phone')}>Phone{renderSortArrow('phone')}</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.data.map((teacher) => (
                                <tr key={teacher.id} className="border-b text-sm">
                                    <td className="p-2">{teacher.id}</td>
                                    <td className="p-2">{teacher.name}</td>
                                    <td className="p-2">{teacher.email}</td>
                                    <td className="p-2">{teacher.phone}</td>
                                    <td>
                                        <Link
                                            href={`teacher/edit/${teacher.id}`}
                                            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(teacher.id)}
                                            className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            href={route('teachers.show', teacher.id)}
                                            className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition mr-2"
                                        >
                                            View
                                        </Link>
                                    </td>
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
