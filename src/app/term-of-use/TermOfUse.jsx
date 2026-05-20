"use client";
import Link from "next/link";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsOfUseClient({
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

                {/* ================= TERMS OF USE ================= */}

                <main className="flex-1 p-6 lg:pt-10 bg-[#f5f5f5]">

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                        {/* TOP HEADER */}

                        <div className="bg-gradient-to-r from-green-800 to-green-600 px-8 py-7">

                            <h1 className="text-4xl font-bold text-white">
                                Terms of Use
                            </h1>

                            <p className="text-green-100 mt-2 text-sm">
                                Please read these terms carefully before using our website.
                            </p>

                        </div>

                        {/* CONTENT */}

                        <div className="p-8 lg:p-10 space-y-10">

                            {/* SECTION 1 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Security
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    We have taken utmost care in the security of this site and server. However, errors may occur in our content due to human tampering by a third party, mechanical defects by server malfunction, or other force majeure events. We shall not be held liable for any damage caused by the above.


                                </p>

                            </div>

                            {/* SECTION 2 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        External Links
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    This website provides external links for our customers’ convenience. Since externally linked websites are not under our supervision, we shall not be held liable for the content of their sites.
                                </p>

                            </div>

                            {/* SECTION 3 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Operation of our Website
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    We may occasionally change information contained on this website without notice. In addition, the operation of this website may cease or discontinue. This website may not normally be used for other reasons including a communication environment and a customer’s computer conditions.
                                </p>

                            </div>

                            {/* SECTION 4 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Content
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    With regard to the content on this website, we intend to release the latest information as soon as possible. However, we cannot guarantee the latest information. In addition, we shall not be held liable for any damage caused by content obtained from this website or damage caused by unavailability of this website.


                                </p>

                            </div>

                            {/* SECTION 5 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Private Information
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    For private information, refer to the Privacy Policy.
                                </p>

                            </div>

                            {/* SECTION 6 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Copyrights and portrait rights
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    The copyrights and portrait rights related to the content on this website are owned by us. It is prohibited to use the contents excluding their private use within the lawful range without prior permission of each owner of copyright in writing.
                                </p>

                            </div>

                            {/* SECTION 7 */}

                            <div>

                                <div className="bg-gray-100 border-l-4 border-green-700 px-5 py-4 rounded-r-lg mb-5">

                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        Trademarks
                                    </h2>

                                </div>

                                <p className="text-gray-600 leading-9 text-[17px]">
                                    Product names and company names used in this website are the trademarks or registred trademarks of their respective trademark owners.
                                </p>

                            </div>

                            {/* CONTACT */}

                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                                <h3 className="text-xl font-semibold text-green-800 mb-3">
                                    Need Assistance?
                                </h3>

                                <p className="text-gray-700 leading-8">
                                    For any questions regarding these Terms of Use, please contact us through our Contact Us page.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </section>

    );
}