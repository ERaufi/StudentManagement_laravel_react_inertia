import DashboardLayout from '@/Layouts/DashboardLayout';

export default function ViewClass({ classItem }) {
    return (
        <DashboardLayout>
            <main className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">View Class</h1>
                <div className="space-y-4">
                    <div>
                        <strong>ID:</strong> {classItem.id}
                    </div>
                    <div>
                        <strong>Name:</strong> {classItem.name}
                    </div>
                    <div>
                        <strong>Description:</strong> {classItem.description}
                    </div>
                    <div>
                        <strong>Teacher:</strong> {classItem.teacher?.name}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
