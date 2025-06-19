import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ClassesIndex() {
    const { classes, flash } = usePage().props;
    const [msg, setMsg] = useState(flash.success);

    setTimeout(() => setMsg(null), 2000);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this class?')) {
            router.delete(route('classes.destroy', id));
        }
    };

    return (
        <DashboardLayout>
            <main className="p-6">
                {msg && <div className="mb-4 p-4 bg-green-100 border rounded text-green-800">{msg}</div>}
                <header className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
                </header>

                <Link
                    href={route('classes.create')}
                    className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                    Create Class
                </Link>

                <div className="overflow-x-auto bg-white rounded shadow p-4">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                                <th className="p-2">#</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Teacher</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.data.map(cls => (
                                <tr key={cls.id} className="border-b text-sm">
                                    <td className="p-2">{cls.id}</td>
                                    <td className="p-2">{cls.name}</td>
                                    <td className="p-2">{cls.teacher?.name}</td>
                                    <td className="p-2 space-x-2">
                                        <Link
                                            href={route('classes.edit', cls.id)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded"
                                        >Edit</Link>
                                        <Link
                                            href={route('classes.show', cls.id)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded"
                                        >View</Link>
                                        <button
                                            onClick={() => handleDelete(cls.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded"
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4 gap-2 text-sm">
                        {classes.links.map((link, idx) => (
                            <button
                                key={idx}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
