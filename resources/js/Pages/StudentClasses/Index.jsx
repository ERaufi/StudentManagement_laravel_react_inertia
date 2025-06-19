import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Index() {
    const { studentClasses, searchStudent: initialStudent, searchClass: initialClass, sort, direction, flash } = usePage().props;

    const [searchStudent, setSearchStudent] = useState(initialStudent || '');
    const [searchClass, setSearchClass] = useState(initialClass || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('student_classes', { student: searchStudent, class: searchClass }, { preserveState: true, replace: true });
    };

    const handleSort = (field) => {
        const newDirection = sort === field && direction === 'asc' ? 'desc' : 'asc';
        router.get('student_classes', { student: searchStudent, class: searchClass, sort: field, direction: newDirection }, { preserveState: true, replace: true });
    };

    const renderSortArrow = (field) => {
        if (sort !== field) return null;
        return direction === 'asc' ? ' ▲' : ' ▼';
    };

    const handlePageChange = (url) => {
        if (url) router.visit(url);
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            router.delete(route('student_classes.destroy', id));
        }
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex-1">
                {flash.success && <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">{flash.success}</div>}

                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold">Student Classes</h1>
                </header>

                <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="w-1/3 px-3 py-2 border rounded"
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search class..."
                        className="w-1/3 px-3 py-2 border rounded"
                        value={searchClass}
                        onChange={(e) => setSearchClass(e.target.value)}
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                        Search
                    </button>
                </form>

                <Link
                    href={route('student_classes.create')}
                    className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Create Record
                </Link>

                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('id')}>
                                    #
                                    {renderSortArrow('id')}
                                </th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('student_id')}>
                                    Student
                                    {renderSortArrow('student_id')}
                                </th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('class_id')}>
                                    Class
                                    {renderSortArrow('class_id')}
                                </th>
                                <th className="p-2 cursor-pointer" onClick={() => handleSort('score')}>
                                    Score
                                    {renderSortArrow('score')}
                                </th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentClasses.data.map((record) => (
                                <tr key={record.id} className="border-b text-sm">
                                    <td className="p-2">{record.id}</td>
                                    <td className="p-2">{record.student?.name || 'N/A'}</td>
                                    <td className="p-2">{record.class?.name || 'N/A'}</td>
                                    <td className="p-2">{record.score ?? '-'}</td>
                                    <td className="p-2">
                                        <Link
                                            href={route('student_classes.edit', record.id)}
                                            className="inline-block px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            href={route('student_classes.show', record.id)}
                                            className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 ml-2"
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-4 gap-2 text-sm">
                        {studentClasses.links.map((link, idx) => (
                            <button
                                key={idx}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
