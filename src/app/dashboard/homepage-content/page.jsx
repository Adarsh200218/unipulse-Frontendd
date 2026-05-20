"use client";

import { useRouter } from "next/navigation";
import { Pencil, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { useAuthGuard } from "@/helper/getCommonData";

export default function HomepageContentManage() {
    useAuthGuard();

    const router = useRouter();

    const sections = [
        {
            id: 1,
            title: "Banner Images",
            description: "Manage homepage slider images",
            type: "banner",
        },

        {
            id: 2,
            title: "Homepage Description",
            description: "Manage homepage description",
            type: "about",
        },
    ];

    return (
        <section className="p-4">

            <div className="mb-6">
                <div className="bg-green-700 text-white px-5 py-3 rounded font-bold text-xl inline-block">
                    Homepage Content Management
                </div>
            </div>



            <table className="w-full border border-gray-300 border-collapse text-sm mt-4 mb-6 shadow-lg">

                <thead className="bg-[#b3ffd3]">
                    <tr>
                        <th className="border px-4 py-2 text-cent">S.No</th>
                        <th className="border p-2 text-left">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {sections.map((item, index) => (
                        <tr key={item.id}>

                            <td className="border p-3 text-center">
                                {index + 1}
                            </td>

                            <td className="border p-3 font-semibold">
                                {item.title}
                            </td>

                            <td className="border p-3 text-gray-500">
                                {item.description}
                            </td>

                            <td className="border p-3">

                                <div className="flex justify-center gap-2">

                                    {/* ADD BUTTON */}
                                    <Link
                                        href={
                                            item.type === "banner"
                                                ? "/dashboard/homepage-content/add-banner"
                                                : "/dashboard/homepage-content/add-about"
                                        }
                                    >
                                        <button className="bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded cursor-pointer">

                                            <Plus size={16} />

                                        </button>

                                    </Link>

                                    {/* EDIT BUTTON */}
                                    <Link
                                        href={
                                            item.type === "banner"
                                                ? "/dashboard/homepage-content/edit-banner"
                                                : "/dashboard/homepage-content/edit-about"
                                        }
                                    >

                                        <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded cursor-pointer">

                                            <Eye size={16} />

                                        </button>

                                    </Link>

                                </div>

                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </section>
    );
}