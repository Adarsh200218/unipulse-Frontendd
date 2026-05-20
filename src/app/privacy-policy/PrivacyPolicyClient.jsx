"use client";

import Link from "next/link";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyClient({
    categories = [],
}) {

    const router = useRouter();

    return (
        <section className="pt-11 pb-8">

            <div className="flex flex-col lg:flex-row min-h-screen max-w-7xl mx-auto">

                {/* ================= SIDEBAR ================= */}
                <aside className="w-full lg:w-[380px] bg-white mt-4 lg:p-4 lg:mt-0">

                    <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">

                        <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

                            {/* DOWNLOAD TEXT */}
                            <div>

                                 <h1 className="text-4xl font-bold">
                                    Download
                                </h1>

                                <p className="text-sm mt-2">
                                    Our most recent catalogue, manuals and external dimension views can be downloaded.
                                </p>

                            </div>

                            <hr className="border-white/30" />

                            {/* CATEGORY LIST */}
                            <div className="flex flex-col flex-1 min-h-0">

                                <h3 className="text-xl font-semibold mb-3">
                                    List of Download Files
                                </h3>

                                <div className="flex flex-col gap-2 overflow-y-auto pr-1 custom-scroll flex-1">

                                    {categories?.map((item, index) => (

                                        <Link
                                            key={`${item.id}-${index}`}
                                            href="/products-list"
                                            className="flex items-center justify-between bg-white text-black px-3 py-1 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                                        >

                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={
                                                        item.images?.length > 0 &&
                                                            item.images[0]?.image_url
                                                            ? `${api.image.imageURL}${item.images[0].image_url}`
                                                            : "/images/default.png"
                                                    }
                                                    alt={item.title}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain rounded w-20 h-auto"
                                                />

                                                <span>
                                                    {item.title}
                                                </span>

                                            </div>

                                            <ChevronsRight />

                                        </Link>

                                    ))}

                                </div>

                            </div>

                            <hr className="border-white/30" />

                            {/* AUTH BUTTONS */}
                            <div className="bg-white text-black p-4 rounded shadow">

                                <div className="flex flex-col gap-2">

                                    <button
                                        onClick={() => router.push("/login")}
                                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                                    >
                                        Login
                                    </button>

                                    <button
                                        onClick={() => router.push("/register")}
                                        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                                    >
                                        Register
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </aside>

                {/* ================= PRIVACY POLICY ================= */}
                <main className="flex-1 p-6 lg:pt-10 bg-[#f5f5f5]">

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                        {/* TOP HEADER */}
                        <div className="bg-gradient-to-r from-green-800 to-green-600 px-8 py-7">

                            <h1 className="text-4xl font-bold text-white">
                                Privacy Policy
                            </h1>

                            <p className="text-green-100 mt-2 text-sm">
                                Your privacy and data protection are important to us.
                            </p>

                        </div>

                        {/* CONTENT */}
                        <div className="p-8 lg:p-10 space-y-10">

                            {/* SECTION 1 */}
                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        General Policy
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    We are fully aware that private information of our customers is extremely important. When handling private information, we shall ensure that all of our officers and employees comply with applicable laws related to private information to respect our customers and thus live up to their expectations.


                                </p>

                            </div>

                            {/* SECTION 2 */}
                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Compliance with applicable laws
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    With regard to the handling of private information of our customers, we shall comply with applicable laws regarding the protection of private information and other related laws and regulations, guidelines by the administration, and the Privacy Policy for our appropriate handling.


                                </p>

                            </div>

                            {/* SECTION 3 */}
                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Handling of private information
                                    </h2>

                                </div>

                                <ul className="space-y-4 text-gray-600 text-[17px] leading-8 list-decimal pl-6">

                                    <li>
                                        Where a customer is required to provide us with private information, the purposes for which that information is to be used shall be designated in advance. Only where there is consent by the customer, shall we receive private information
                                    </li>

                                    <li>
                                        We shall not use private information for any purpose other than those for which the customer’s consent has been obtained.

                                    </li>

                                    <li>
                                        We shall not deposit or provide to any third party private information provided by a customer excluding cases where there is consent by the customer and where there is a request involving legal obligations from a judicial or administrative agency according to law. Even where there is consent, we shall work out an arrangement with the applicable third party regarding the protection of private information to make all possible preparations for the protection of such information when depositing or providing private information to a third party.
                                    </li>
                                    <li>
                                        We shall take reasonable safety measures to protect private information provided by a customer from its loss, destruction, illegal leakage outside the company, tampering, and illegal access
                                    </li>
                                    <li>
                                        Where there is any of the following requests from a customer on his/her own private information, we shall respect the intention of the customer and take necessary action within the reasonable range
                                    </li>


                                    <li>
                                        Confirmation of registration content
                                    </li>
                                    <li> Correction, updating or deletion of registration content</li>

                                    <li> Withdrawal of part or all of the consent to the use of private information

                                    </li>

                                </ul>

                            </div>

                            {/* SECTION 4 */}
                            {/* <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Data Protection & Security
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>

                            </div> */}

                            {/* SECTION 5 */}
                            {/* <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Third Party Links
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    This website may contain links to third-party websites. We are not responsible for the privacy practices or content of external websites.
                                </p>

                            </div> */}

                            {/*                          
                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Policy Updates
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    UNIPULSE INDIA reserves the right to update or modify this Privacy Policy at any time without prior notice.
                                </p>

                            </div> */}

                            {/* CONTACT */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                                <h3 className="text-xl font-semibold text-green-800 mb-3">
                                    Need Help?
                                </h3>

                                <p className="text-gray-700 leading-8">
                                    If you have any questions regarding this Privacy Policy,
                                    please contact us through the Contact Us page.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </section>

    );
}