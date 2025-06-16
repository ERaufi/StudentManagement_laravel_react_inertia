import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react'; // ✅ New

export default function StudentsIndex() {
    const { students, search: initialSearch, sort, direction, flash } = usePage().props;
    const { t } = useTranslation();

    const [search, setSearch] = useState(initialSearch || '');

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('students', { search }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSort = (field) => {
        const newDirection = sort === field && direction === 'asc' ? 'desc' : 'asc';
        router.get('students', {
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

    // ✅ New: handle pagination links
    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    const [msg, setMsg] = useState(flash.success);

    setTimeout(() => {
        setMsg(null);
    }, 2000);
    return (
        <DashboardLayout>
            <main className="flex-1 p-6">
                {msg && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
                        {msg}
                    </div>
                )}
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{t('Students Page')}</h1>
                    <p className="text-sm text-gray-500">{t('Welcome to the student management section.')}</p>
                </header>

                {/* ✅ New: Search form */}
                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder={t('Search students...')}
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
                        href={route('students.create')}
                        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                    >
                        {t('Create Student')}
                    </Link>
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}># {renderSortArrow('id')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>{t('Name')}{renderSortArrow('name')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('email')}>{t('Email')}{renderSortArrow('email')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('gender')}>{t('Gender')}{renderSortArrow('gender')}</th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('score')}>{t('Score')}{renderSortArrow('score')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.map((student) => (
                                <tr key={student.id} className="border-b text-sm">
                                    <td className="p-2">{student.id}</td>
                                    <td className="p-2">{student.name}</td>
                                    <td className="p-2">{student.email}</td>
                                    <td className="p-2">{student.gender}</td>
                                    <td className="p-2">{student.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4 gap-2 text-sm">
                        {students.links.map((link, idx) => (
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
