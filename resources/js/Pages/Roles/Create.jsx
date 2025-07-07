import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateRoles() {
    const { data, setData, post, errors } = useForm({
        name: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Role</h1>
                    {errors.error && (
                        <div className="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline ml-2">{errors.error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.name}</div>}
                        </div>
                        <div className="col-span-full mt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                            >
                                Save Role
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
