import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { url } = usePage();

    const links = [
        { href: route('dashboard'), label: 'Dashboard' },
        { href: route('profile'), label: 'Profile' },
        { href: route('dashboard.alt'), label: 'Dashboard (Alt)' },
        { href: route('profile.alt'), label: 'Profile (Alt)' },
    ];

    return (
        <aside className="w-64 bg-gray-100 p-4">
            <ul>
                {links.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={
                                (url === link.href ? 'font-bold text-blue-600' : 'text-gray-700') +
                                ' block p-2'
                            }
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
