"use client";
import { useRouter } from "next/navigation";
import CategorySideBar from "../component/CategorySideBar";

import ContactButtonright from "../component/ContactButtonright";

export default function TermsOfUseClient({
    categories = [],
}) {

    const router = useRouter();
    //    const [user, setUser] = useState(null);
    //     const handleLogout = () => {
    //         removeToken();
    //         removeUser();
    //         setUser(null);
    //         router.Push("/");
    //     };

    return (

      <>

        <section className="pt-6">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  md:grid-cols-12">

                    {/* ================= SIDEBAR ================= */}
                    <CategorySideBar categories={categories} />

                    {/* ================= TERMS OF USE ================= */}

                    <main className="md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-6 p-4 mt-2 xl:mt-10">

                        <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">

                            {/* TOP HEADER */}

                            <div className="bg-gradient-to-r from-green-800 to-green-600 px-8 py-3">

                                <h1 className="text-2xl font-bold text-white">
                                    Terms of Use
                                </h1>

                                <p className="text-green-100 mt-2 text-sm">
                                    Please read these terms carefully before using our website.
                                </p>

                            </div>

                            {/* CONTENT */}

                            <div className="p-3 lg:p-3 space-y-4">

                                {/* SECTION 1 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Security
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        We have taken utmost care in the security of this site and server. However, errors may occur in our content due to human tampering by a third party, mechanical defects by server malfunction, or other force majeure events. We shall not be held liable for any damage caused by the above.


                                    </p>

                                </div>



                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            External Links
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        This website provides external links for our customers’ convenience. Since externally linked websites are not under our supervision, we shall not be held liable for the content of their sites.
                                    </p>

                                </div>

                                {/* SECTION 3 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Operation of our Website
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        We may occasionally change information contained on this website without notice. In addition, the operation of this website may cease or discontinue. This website may not normally be used for other reasons including a communication environment and a customer’s computer conditions.
                                    </p>

                                </div>

                                {/* SECTION 4 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Content
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        With regard to the content on this website, we intend to release the latest information as soon as possible. However, we cannot guarantee the latest information. In addition, we shall not be held liable for any damage caused by content obtained from this website or damage caused by unavailability of this website.


                                    </p>

                                </div>

                                {/* SECTION 5 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Private Information
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        For private information, refer to the Privacy Policy.
                                    </p>

                                </div>

                                {/* SECTION 6 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Copyrights and portrait rights
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        The copyrights and portrait rights related to the content on this website are owned by us. It is prohibited to use the contents excluding their private use within the lawful range without prior permission of each owner of copyright in writing.
                                    </p>

                                </div>

                                {/* SECTION 7 */}

                                <div>

                                    <div className="bg-gray-100 border-l-4 border-green-700 px-3 py-2 rounded-r-lg mb-4">

                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Trademarks
                                        </h2>

                                    </div>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        Product names and company names used in this website are the trademarks or registred trademarks of their respective trademark owners.
                                    </p>

                                </div>

                                {/* CONTACT */}

                                <div className="bg-green-50 border border-green-200 rounded p-4">

                                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                                        Need Assistance?
                                    </h3>

                                    <p className="text-gray-600  leading-7 text-sm sm:text-[15px]  ">
                                        For any questions regarding these Terms of Use, please contact us through our Contact Us page.
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