import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateUser() {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create User</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Password</label>
                            <input type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Save User</button>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
