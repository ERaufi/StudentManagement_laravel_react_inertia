import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateStudent() {
    const { errors } = usePage().props;

    const [form, setForm] = useState({
        name: '',
        email: '',
        age: '',
        date_of_birth: '',
        gender: 'm',
        score: '',
        image: null,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Student</h1>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="col-span-full text-red-600 text-sm mb-4">
                                Please fix the form errors below.
                            </div>
                        )}

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter name"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter email"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Age</label>
                            <input
                                name="age"
                                type="number"
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                placeholder="Age"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.age ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                            <input
                                name="date_of_birth"
                                type="date"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Gender</label>
                            <select
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                placeholder="Score"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.score ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.score && <p className="text-red-500 text-sm mt-1">{errors.score}</p>}
                        </div>

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.image ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
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
