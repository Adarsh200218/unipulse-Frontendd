"use client";

import Link from "next/link";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";
import CategorySideBar from "../component/CategorySideBar";
import { Omega, SquarePen } from "lucide-react";
import { Lock } from 'lucide-react';
import { useEffect, useState } from "react";

import ContactButtonright from "../component/ContactButtonright";
export default function PrivacyPolicyClient({
    categories = [],
}) {

    const router = useRouter();

    return (
      <>

        <section className="pt-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  md:grid-cols-12">

                    {/* ================= SIDEBAR ================= */}
                    <CategorySideBar categories={categories} />


                   
                    {/* ================= PRIVACY POLICY ================= */}
                    <main className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-6 p-4 xl:mt-10">

                        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">

                            {/* TOP HEADER */}
                            <div className="bg-gradient-to-r from-green-800 to-green-600 px-4 py-2">

                                <h1 className="text-2xl lg:text-2xl font-bold text-white">
                                    Privacy Policy
                                </h1>

                                <p className="text-green-100 mt-2 text-sm">
                                    Your privacy and data protection are important to us.
                                </p>

                            </div>

                            {/* CONTENT */}
                            <div className="p-3 lg:p-3 space-y-10">

                                {/* SECTION 1 */}
                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-2 rounded-r-lg mb-3">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            General Policy
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        We are fully aware that private information of our customers is extremely important. When handling private information, we shall ensure that all of our officers and employees comply with applicable laws related to private information to respect our customers and thus live up to their expectations.


                                    </p>

                                </div>

                                {/* SECTION 2 */}
                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-2 rounded-r-lg mb-3">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Compliance with applicable laws
                                        </h2>

                                    </div>

                                    <p className="text-gray-600 leading-7 text-sm sm:text-[15px]">
                                        With regard to the handling of private information of our customers, we shall comply with applicable laws regarding the protection of private information and other related laws and regulations, guidelines by the administration, and the Privacy Policy for our appropriate handling.


                                    </p>

                                </div>

                                {/* SECTION 3 */}
                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-2 rounded-r-lg mb-3">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Handling of private information
                                        </h2>

                                    </div>

                                    <ul className="space-y-4 text-gray-600 leading-7 text-sm sm:text-[15px]list-decimal ">

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


                                <div className="bg-green-50 border border-green-200 rounded p-4 ">

                                    <h3 className="text-xl font-semibold text-green-800 mb-3">
                                        Need Help?
                                    </h3>

                                    <p className="text-gray-700 leading-8 text-[16px]">
                                        If you have any questions regarding this Privacy Policy,
                                        please contact us through the Contact Us page.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </main>

                </div>
            </div>

        </section>

            <ContactButtonright />
      
      
      
      </>

    );
}