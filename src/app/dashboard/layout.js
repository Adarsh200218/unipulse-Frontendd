"use client";

import Sidebar from "../component/sideBar";

export default function DashboardLayout({ children }) {
    return (
        <section className="bg-gray-100 h-auto lg:min-h-[87vh] py-14 lg:py-20 px-3 pb-4">
           <div className="max-w-7xl mx-auto container"> 
             <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-start">

                {/* SIDEBAR */}
                <Sidebar />

                {/* PAGE CONTENT */}
                <main className="flex-1 p-0 lg:p-2 overflow-auto">
                    {children}
                </main>

            </div>
           </div>

        </section>
    );
}