import React, { useState } from "react";
import { router } from '@inertiajs/react';
import Sidebar from "@/Components/Sidebar";
import LanguageSwitcher from "@/Components/LanguageSwitcher";

export default function DashboardLayout({ children }) {
    const [mountedAt] = useState(new Date().toLocaleTimeString());

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-white shadow p-4 flex items-center justify-between">
                    <div>Topbar (mounted at {mountedAt})</div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <section className="p-4">{children}</section>
            </main>
        </div>
    );
}
