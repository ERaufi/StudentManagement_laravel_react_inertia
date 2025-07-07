import { useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-100 px-4">
            <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 space-y-6">
                <h2 className="text-center text-3xl font-bold text-green-800">Create an Account</h2>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <p className="text-sm text-red-500 mt-1">{errors.password_confirmation}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">User Type</label>
                        <select
                            name="user_type"
                            value={data.user_type}
                            onChange={(e) => setData('user_type', e.target.value)}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.user_type && <div>{errors.user_type}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                    >
                        {processing ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
