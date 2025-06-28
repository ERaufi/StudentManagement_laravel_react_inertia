import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Users({ role, allUsers }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        users: role.users.map(user => user.id),
    });

    const toggleUser = (userId) => {
        if (data.users.includes(userId)) {
            setData('users', data.users.filter(id => id !== userId));
        } else {
            setData('users', [...data.users, userId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/roles/assign-users-to-role/${role.id}`);
    };

    // Group users by user_type
    const groupedUsers = allUsers.reduce((groups, user) => {
        groups[user.user_type] = groups[user.user_type] || [];
        groups[user.user_type].push(user);
        return groups;
    }, {});

    const borderColors = {
        student: 'border-blue-500',
        teacher: 'border-green-500',
        admin: 'border-purple-600',
    };

    const bgColors = {
        student: 'bg-blue-50',
        teacher: 'bg-green-50',
        admin: 'bg-purple-50',
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Assign Users to Role: <span className="capitalize">{role.name}</span></h1>

                {flash.success && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded border border-green-300">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    {Object.entries(groupedUsers).map(([type, users]) => (
                        <section key={type}>
                            <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-700 border-b pb-2">{type}s</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {users.map((user) => {
                                    const selected = data.users.includes(user.id);
                                    return (
                                        <div
                                            key={user.id}
                                            onClick={() => toggleUser(user.id)}
                                            tabIndex={0}
                                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggleUser(user.id); }}
                                            role="checkbox"
                                            aria-checked={selected}
                                            className={`
                                                cursor-pointer select-none rounded-lg border-2 p-4 flex flex-col justify-between
                                                focus:outline-none focus:ring-4 focus:ring-indigo-300
                                                transition-shadow duration-300
                                                ${selected ? `${bgColors[type]} ${borderColors[type]} shadow-lg` : 'bg-white border-gray-300 hover:shadow-md'}
                                            `}
                                        >
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                                                        ${type === 'student' ? 'bg-blue-200 text-blue-800' :
                                                            type === 'teacher' ? 'bg-green-200 text-green-800' :
                                                                'bg-purple-200 text-purple-800'
                                                        }
                                                    `}
                                                >
                                                    {type}
                                                </span>

                                                {selected && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-md font-semibold transition"
                        >
                            Save Users
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
