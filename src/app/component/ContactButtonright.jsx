import Link from "next/link";
import { ChevronsRight } from "lucide-react";
export default function ContactButtonright() {
    return (
        <div className="fixed right-[-85px] lg:right-[-99px] bottom-[250px] rotate-90 z-[2432] ">

            <Link
                href="https://www.unipulseindia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="
        group
        inline-flex
        items-center
        gap-2
        rounded-lg
        bg-green-800
        px-2
        py-2
        lg:px-4
        text-sm
        font-semibold
        text-white
        shadow-md
        transition-all
        duration-300
        hover:bg-[#e10c13]
        hover:shadow-lg
        hover:-translate-y-0.5
    "
            >
                <span>Go Back</span>

                <div
                    className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-white/15
            transition-all
            duration-300
            group-hover:bg-white/25
        "
                >
                    <ChevronsRight
                        size={14}
                        className="
                text-yellow-300
             
            "
                    />
                </div>
                {/*<span>Go Back</span>
  <ChevronsRight size={18} className="text-yellow-400"/>
  <span>Product Details</span>*/}

                <span>Product Details</span>
            </Link>

        </div>
    );
}