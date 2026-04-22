"use client";

import Sidebar from "../component/sideBar";

export default function DashboardLayout({ children }) {
    return (
        <section className="bg-gray-100 relative min-h-screen py-30 px-15">
            <div className="flex max-w-full mx-auto gap-5">

                {/* SIDEBAR */}
                <Sidebar />

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">
                    {children}
                </main>

            </div>
        </section>
    );
}