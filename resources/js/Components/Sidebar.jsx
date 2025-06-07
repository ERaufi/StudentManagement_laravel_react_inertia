import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url } = usePage();

    const baseLinkClasses = 'block p-2 rounded transition-colors duration-200';
    const activeClasses = 'bg-blue-100 text-blue-700 font-semibold';
    const inactiveClasses = 'text-gray-700 hover:bg-gray-200';

    return (
        <aside className="w-64 bg-gray-100 p-4 min-h-screen">
            <ul className="space-y-2">
                <li>
                    <Link
                        href="/students"
                        className={`${baseLinkClasses} ${url === '/students' ? activeClasses : inactiveClasses}`}
                    >
                        Students
                    </Link>
                </li>
                <li>
                    <Link
                        href="/teachers"
                        className={`${baseLinkClasses} ${url === '/teachers' ? activeClasses : inactiveClasses}`}
                    >
                        Teachers
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
