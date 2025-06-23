import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

export default function Dashboard() {
    const { stats, chartData } = usePage().props;

    return (
        <DashboardLayout>
            <main className="p-6 space-y-10">
                {/* Page Title */}
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">📊 Dashboard Overview</h1>

                {/* Stat Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Students Card */}
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 text-blue-800 border border-blue-200 shadow-md rounded-xl px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition duration-200">
                        <span className="text-sm font-medium uppercase text-gray-600">Students</span>
                        <span className="text-3xl font-bold">{stats.students}</span>
                    </div>

                    {/* Teachers Card */}
                    <div className="bg-gradient-to-br from-green-100 to-green-50 text-green-800 border border-green-200 shadow-md rounded-xl px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition duration-200">
                        <span className="text-sm font-medium uppercase text-gray-600">Teachers</span>
                        <span className="text-3xl font-bold">{stats.teachers}</span>
                    </div>

                    {/* Classes Card */}
                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 text-purple-800 border border-purple-200 shadow-md rounded-xl px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition duration-200">
                        <span className="text-sm font-medium uppercase text-gray-600">Classes</span>
                        <span className="text-3xl font-bold">{stats.classes}</span>
                    </div>

                    {/* Subjects Card */}
                    <div className="bg-gradient-to-br from-pink-100 to-pink-50 text-pink-800 border border-pink-200 shadow-md rounded-xl px-6 py-5 flex flex-col gap-2 hover:shadow-lg transition duration-200">
                        <span className="text-sm font-medium uppercase text-gray-600">Subjects</span>
                        <span className="text-3xl font-bold">{stats.subjects}</span>
                    </div>
                </section>

                {/* Bar Chart */}
                <section className="bg-white border rounded-xl shadow p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Activity (Students & Teachers)</h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Teachers" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    );
}
