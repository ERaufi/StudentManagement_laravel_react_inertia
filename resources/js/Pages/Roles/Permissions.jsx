import React from 'react';
import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Permissions({ role, allPermissions }) {
    const { data, setData, post, processing } = useForm({
        permissions: role.permissions.map(p => p.name),
    });

    const togglePermission = (permissionName) => {
        if (data.permissions.includes(permissionName)) {
            setData('permissions', data.permissions.filter(p => p !== permissionName));
        } else {
            setData('permissions', [...data.permissions, permissionName]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/roles/assign-permissions-to-role/${role.id}`);
    };

    return (
        <DashboardLayout>
            <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Assign Permissions to Role: {role.name}</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {allPermissions.map((permission) => (
                            <label key={permission.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.permissions.includes(permission.name)}
                                    onChange={() => togglePermission(permission.name)}
                                />
                                <span>{permission.name}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={processing}
                    >
                        Save Permissions
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
