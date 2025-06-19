import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm } from '@inertiajs/react';

export default function Edit({ studentClass, students, classes }) {
    const { data, setData, put, errors } = useForm({
        student_id: studentClass.student_id,
        class_id: studentClass.class_id,
        score: studentClass.score ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('student_classes.update', studentClass.id));
    };

    return (
        <DashboardLayout>
            <main className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Edit Student Class Record</h1>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Student</label>
                            <select
                                name="student_id"
                                value={data.student_id}
                                onChange={(e) => setData('student_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select a student</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                            {errors.student_id && <div className="text-red-600 mt-1">{errors.student_id}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Class</label>
                            <select
                                name="class_id"
                                value={data.class_id}
                                onChange={(e) => setData('class_id', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="">Select a class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && <div className="text-red-600 mt-1">{errors.class_id}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Score</label>
                            <input
                                name="score"
                                type="number"
                                value={data.score}
                                onChange={(e) => setData('score', e.target.value)}
                                placeholder="Enter score (optional)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                min="0"
                                max="100"
                            />
                            {errors.score && <div className="text-red-600 mt-1">{errors.score}</div>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-semibold"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </main>
        </DashboardLayout>
    );
}
