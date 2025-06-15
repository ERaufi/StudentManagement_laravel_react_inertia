import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function CreateTeacher() {
    const { errors } = usePage().props;

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
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
        router.post(route('teachers.store'), formData, {
            forceFormData: true,
        });
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Teacher</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="text-red-600 text-sm mb-4">
                                Please fix the form errors below.
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Name</label>
                            <input
                                name="name"
                                placeholder="Enter name"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Phone</label>
                            <input
                                name="phone"
                                placeholder="Enter phone number"
                                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
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

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                            >
                                Save Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
