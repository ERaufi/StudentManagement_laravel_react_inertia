import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url, props } = usePage();
    const permissions = props.permissions;
    const lang = localStorage.getItem('lang') || 'en';

    const baseLinkClasses = 'block p-2 rounded transition-colors duration-200';
    const activeClasses = 'bg-blue-100 text-blue-700 font-semibold';
    const inactiveClasses = 'text-gray-700 hover:bg-gray-200';
    const can = (permissionName) => permissions.includes(permissionName);

    return (
        <aside className="w-64 bg-gray-100 p-4 min-h-screen">
            <ul className="space-y-2">

                <li>
                    <Link
                        href={`/dashboard?lang=${lang}`}
                        className={`${baseLinkClasses} ${url === `/dashboard?lang=${lang}` ? activeClasses : inactiveClasses}`}
                    >
                        Dashboard
                    </Link>
                </li>

                {can('view students') && (
                    <li>
                        <Link
                            href={`/students?lang=${lang}`}
                            className={`${baseLinkClasses} ${url === `/students?lang=${lang}` ? activeClasses : inactiveClasses}`}
                        >
                            Students
                        </Link>
                    </li>
                )}

                {can('view teachers') && (
                    <li>
                        <Link
                            href={`/teachers?lang=${lang}`}
                            className={`${baseLinkClasses} ${url === `/teachers?lang=${lang}` ? activeClasses : inactiveClasses}`}
                        >
                            Teachers
                        </Link>
                    </li>
                )}

                {can('view classes') && (
                    <li>
                        <Link
                            href={`/classes?lang=${lang}`}
                            className={`${baseLinkClasses} ${url === `/classes?lang=${lang}` ? activeClasses : inactiveClasses}`}
                        >
                            Classes
                        </Link>
                    </li>
                )}

                {can('view users') && (
                    <li>
                        <Link
                            href={`/users?lang=${lang}`}
                            className={`${baseLinkClasses} ${url === `/users?lang=${lang}` ? activeClasses : inactiveClasses}`}
                        >
                            Users
                        </Link>
                    </li>
                )}

                {can('manage roles') && (
                    <li>
                        <Link
                            href={`/roles?lang=${lang}`}
                            className={`${baseLinkClasses} ${url === `/roles?lang=${lang}` ? activeClasses : inactiveClasses}`}
                        >
                            Roles And Permissions
                        </Link>
                    </li>
                )}
            </ul>
        </aside>
    );
}
