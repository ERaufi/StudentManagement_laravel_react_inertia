import { useState } from 'react';
import { router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateStudent() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        date_of_birth: '',
        gender: 'm',
        score: '',
    });

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (image) {
            formData.append('image', image);
        }
        router.post(route('students.store'), formData, {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Student</h1>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                placeholder="Enter name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Age</label>
                            <input
                                name="age"
                                type="number"
                                placeholder="Age"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                            <input
                                name="date_of_birth"
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Gender</label>
                            <select
                                name="gender"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.gender}
                                onChange={handleChange}
                            >
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Score</label>
                            <input
                                name="score"
                                type="number"
                                placeholder="Score"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="col-span-full mt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                            >
                                Save Student
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
