import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function EditStudent({ student }) {
    const { data, setData, post, errors } = useForm({
        id: student.id,
        name: student.name,
        email: student.email,
        age: student.age,
        date_of_birth: student.date_of_birth,
        gender: student.gender,
        score: student.score,
        image: null,
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        post('/student-update');
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Student</h1>

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

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.email}</div>}

                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Age</label>
                            <input
                                name="age"
                                type="number"
                                value={data.age}
                                onChange={(e) => setData('age', e.target.value)}
                                placeholder="Age"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.age}</div>}

                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                            <input
                                name="date_of_birth"
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.date_of_birth}</div>}

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
                            {errors.name && <div>{errors.gender}</div>}

                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Score</label>
                            <input
                                name="score"
                                type="number"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                placeholder="Score"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.score}</div>}

                        </div>
                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => setData('image', e.target.files[0])}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <div>{errors.image}</div>}

                        </div>
                        <div className="col-span-full mt-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                            >
                                Update Student
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
