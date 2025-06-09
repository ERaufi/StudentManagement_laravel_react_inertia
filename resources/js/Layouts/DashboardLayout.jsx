import { React, useState } from "react";
import Sidebar from "@/Components/Sidebar";
import LanguageSwitcher from "@/Components/LanguageSwitcher";

export default function DashboardLayout({ children }) {
    const [mountedAt] = useState(new Date().toLocaleTimeString());

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <header className="bg-white shadow p-4 flex items-center justify-between">
                    <div>Topbar (mounted at {mountedAt})</div>
                    <LanguageSwitcher />
                </header>

                <section className="p-4">{children}</section>
            </main>
        </div>
    );
}
