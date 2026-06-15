"use client";

import Sidebar from "../../../component/sideBar";
import ProductForm from "../../../component/productForm";
import { useAuthGuard } from "../../../../helper/getCommonData";

export default function AddProductPage() {
    useAuthGuard();
    // const [activeTab, setActiveTab] = useState("category");
    return (
        <section className="bg-gray-100 relative py-0 px-0 lg:px-4 ">

            <div className="flex max-w-full mx-auto gap-5">
                {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}
                <main className="flex-1 p-1 ">
                    <ProductForm />

                </main>
            </div>
        </section>
    );
}