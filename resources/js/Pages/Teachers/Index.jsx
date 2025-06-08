import DashboardLayout from "@/Layouts/DashboardLayout";

function Teachers() {
    return (
        <main className="flex-1 p-6">
            <header className="mb-6 border-b pb-4">
                <h1 className="text-2xl font-bold text-gray-800">Teachers Page</h1>
                <p className="text-sm text-gray-500">Welcome to the Teacher management section.</p>
            </header>
            <section className="space-y-4">
                <div className="bg-white p-6 rounded shadow">
                    <p className="text-gray-700">Here you can manage Teacher data, view details, and perform actions.</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
                    <p><strong>Name:</strong></p>
                    <p><strong>Last Name:</strong></p>
                </div>
            </section>
        </main>
    );
}

// Teachers.layout = function (page) {
//     return <DashboardLayout>{page}</DashboardLayout>
// }
Teachers.layout = page => <DashboardLayout>{page}</DashboardLayout>
export default Teachers;



