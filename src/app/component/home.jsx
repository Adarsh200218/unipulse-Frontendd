"use client";
 
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";
import { Omega, SquarePen } from "lucide-react";
import { Lock } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ContactButtonright from "./ContactButtonright";
 
export default function Home({ categories }) {
    const router = useRouter();
    const [bannerSlides, setBannerSlides] = useState([]);
    const [aboutData, setAboutData] = useState(null);
    const fetchBanner = async () => {
 
        try {
 
            const res = await fetch(
                api.apiCall.getBanners
            );
 
            const json = await res.json();
 
            if (json.status) {
 
                setBannerSlides(json.data);
            }
 
        } catch (err) {
 
            console.log(err);
        }
    };
    const fetchAbout = async () => {
 
        try {
 
            const res = await fetch(
                api.apiCall.getAbout
            );
 
            const json = await res.json();
 
            if (json.status) {
 
                setAboutData(json.data[0]);
            }
 
        } catch (err) {
 
            console.log(err);
        }
    };
    useEffect(() => {
 
        fetchBanner();
        fetchAbout();
 
    }, []);
    const [user, setUser] = useState(null);
    const handleLogout = () => {
        removeToken();
        removeUser();
        setUser(null);
        router.Push("/");
    };
 
 
    return (
        <>
 
            <section className="pt-20 lg:pt-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 gap-3 md:grid-cols-12">
 
                        {/* ================= SIDEBAR ================= */}
 
                        <aside className="order-2 lg:order-1 w-full md:col-span-4 lg:col-span-4 xl:col-span-3 shrink-0 px-4 xl:px-2  lg:py-14 py-4 pb-0 ">
                            <div className="lg:sticky lg:top-20 overflow-hidden mb-2">
 
                                <div className="px-3 py-3 lg:p-3 space-y-3 bg-green-800 text-white rounded h-full flex flex-col ">
                                    <div className="text-black  rounded ">
                                        {!user ? (
                                            //<div className="flex justify-between flex-col-2 gap-2">
                                            //    <Link href="/login#login-form"
                                            //        className="relative overflow-hidden px-4 py-2.5 rounded-lg font-semibold text-white bg-green-600 border border-white group transition-all duration-300  hover:shadow-green-500/40 cursor-pointer"
                                            //    >
                                            //        <span className="absolute inset-0 w-0 bg-green-700 transition-all duration-500 ease-out group-hover:w-full"></span>
                                            //        <span className="relative flex items-center gap-2">
                                            //            {/*<Lock className="w-2 h-2"/>Login*/}
                                            //            <Lock />Login
                                            //        </span>
                                            //    </Link>
 
                                            //    <button
                                            //        onClick={() => router.push("/register")}
                                            //        className="relative overflow-hidden px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 border border-white group transition-all duration-300  hover:shadow-blue-500/40 cursor-pointer"
                                            //    >
                                            //        <span className="absolute inset-0 w-0 bg-blue-700 transition-all duration-500 ease-out group-hover:w-full"></span>
                                            //        <span className="relative flex items-center gap-2">
                                            //            <SquarePen /> Register
                                            //        </span>
                                            //    </button>
                                            //</div>
                                            <div className="grid grid-cols-2 gap-2">
    <Link
        href="/login#login-form"
        className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-2
            h-10
            rounded-xl
            bg-green-600
            text-white
            font-medium
            border
            border-green-500
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-0.5
            transition-all
            duration-300
        "
    >
        <span
            className="
                absolute
                inset-0
                bg-green-700
                scale-x-0
                origin-left
                transition-transform
                duration-300
                group-hover:scale-x-100
            "
        />

        <span className="relative flex items-center gap-2">
            <Lock size={16} />
            Login
        </span>
    </Link>

    <button
        onClick={() => router.push("/register")}
        className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-2
            h-10
            rounded-xl
            bg-blue-600
            text-white
            font-medium
            border
            border-blue-500
            shadow-sm
            hover:shadow-lg
            hover:-translate-y-0.5
            transition-all
            duration-300
            cursor-pointer
        "
    >
        <span
            className="
                absolute
                inset-0
                bg-blue-700
                scale-x-0
                origin-left
                transition-transform
                duration-300
                group-hover:scale-x-100
            "
        />

        <span className="relative flex items-center gap-2">
            <SquarePen size={16} />
            Register
        </span>
    </button>
</div>
                                        ) : (
                                            <div className="text-center space-y-2">
                                                <p className="font-semibold mt-2">Welcome</p>
                                                <p>{user.name}</p>
                                                <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer">Logout</button>
                                            </div>
                                        )}
                                    </div>
                                    <hr className="border-white/30" />
                                     <div>
                            <h2 className="text-lg font-bold text-white leading-none">
                                Downloads
                            </h2>

                            <p className="text-xs text-green-100 mt-1 leading-relaxed">
                                Our most recent catalogue, manuals and external dimension views can be downloaded.
                            </p>
                        </div>
                                    <hr className="border-white/30" />
                                    {/*<div className="flex flex-col flex-1 ">
                                        <h3 className="text-xl font-semibold mb-3">List of Download Files</h3>
                                        <div className="flex flex-col gap-2  space-y-2  overflow-y-auto pr-1 custom-scrollbar ">
                                            {categories.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href="/products-list"
                                                    className="flex items-center justify-between bg-white text-black px-2 lg:px-2 rounded-md
                        border border-gray-200 shadow-sm  hover:shadow-md hover:-translate-y-0.5 transition"
                                                >
                                                    <div className="flex  items-center gap-4">
                                                        <img
                                                            src={
                                                                item.images?.length > 0 && item.images[0]?.image_url
                                                                    ? `${api.image.imageURL}${item.images[0].image_url}`
                                                                    : "/images/default.png"
                                                            }
                                                            alt={item.title}
                                                            width={70}
                                                            height={70}
                                                            className="object-contain rounded w-14 lg:w-12 h-auto"
                                                        />
                                                        <h3 className="text-[14px] lg:text-[13px] font-semibold px-2  rounded cursor-pointer transition">
                                                            {item.title}
                                                        </h3>
                                                    </div>
 
                                                    <ChevronsRight />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>*/}
                                    <div className="flex flex-col flex-1">
    <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">
            List of Download Files
        </h3>

        <span className="text-xs bg-white/10 text-white px-2 py-1 rounded-full">
            {categories.length}
        </span>
    </div>

    <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        {categories.map((item) => (
            <Link
                key={item.id}
                href="/products-list"
                className="
                    group
                    flex
                    items-center
                    justify-between
                    bg-white
                    rounded-xl
                    p-1
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    hover:border-green-200
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                "
            >
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className="
                            h-12
                            w-12
                            rounded-lg
                            bg-slate-50
                            border
                            border-slate-100
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            shrink-0
                        "
                    >
                        <img
                            src={
                                item.images?.length > 0 &&
                                item.images[0]?.image_url
                                    ? `${api.image.imageURL}${item.images[0].image_url}`
                                    : "/images/default.png"
                            }
                            alt={item.title}
                            width={48}
                            height={48}
                            className="
                                h-10
                                w-10
                                object-contain
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                        />
                    </div>

                    <div className="min-w-0">
                        <h4
                            className="
                                text-sm
                                font-semibold
                                text-gray-800
                                
                                group-hover:text-green-700
                                transition-colors
                            "
                        >
                            {item.title}
                        </h4>

                        <p className="text-[11px] text-gray-500">
                            Download File
                        </p>
                    </div>
                </div>

                <div
                    className="
                        h-8
                        w-8
                        rounded-full
                        bg-green-50
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:bg-green-600
                        transition-all
                    "
                >
                    <ChevronsRight
                        size={16}
                        className="
                            text-green-700
                            group-hover:text-white
                            group-hover:translate-x-0.5
                            transition-all
                        "
                    />
                </div>
            </Link>
        ))}
    </div>
</div>
                                    {/*<hr className="border-white/30" />*/}
 
                                </div>
                            </div>
                        </aside>
 
                        {/* ================= MAIN CONTENT ================= */}
                        <main className="order-1 lg:order-2 md:col-span-8 lg:col-span-8 xl:col-span-9 space-y-4 px-4 lg:px-2 lg:p-4 mt-2 xl:mt-9">
 
                            <h1 className="lg:text-2xl text-[22px] font-bold text-gray-800 leading-snug mb-2">
                                {aboutData?.title}{" "}
 
                                <span className="text-green-700 ">
                                    {aboutData?.highlight_title}
                                </span>
                            </h1>
 
                            <p className="text-gray-600 leading-8 text-sm sm:text-[15px] ">
                                {aboutData?.sub_title}
                            </p>
 
 
                            <div className="border border-gray-300 mb-6 rounded bg-white p-2">
 
 
 
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    className="!w-full mx-auto"
                                >
 
                                    {bannerSlides.map((slide, index) => (
 
                                        <SwiperSlide key={index}>
                                            <img
                                                src={`${api.image.imageURL}${slide.image}`}
                                                alt={`Banner ${index + 1}`}
                                                className="lg:w-full lg:h-full object-cover  rounded-lg"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
 
 
                          <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden">
    {/* Header */}
    <div className="flex items-center gap-3 px-4 sm:px-4 py-4 border-b border-gray-100">
        <div className="w-1 h-8 bg-green-600 rounded-full" />

        <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                About Us
            </h2>

            <p className="text-xs text-gray-500">
                Learn more about our company
            </p>
        </div>
    </div>

    {/* Content */}
    <div className="px-4 sm:px-6 py-4">
        <div className="space-y-4">
            {aboutData?.description
                ?.split("\n")
                .filter((item) => item.trim() !== "")
                .map((para, index) => (
                    <p
                        key={index}
                        className="
                            text-gray-600
                            leading-7
                            text-[15px]
                            
                        "
                    >
                        {para}
                    </p>
                ))}
        </div>
    </div>
</div>
 
                        </main>
 
 
                    </div>
                </div>
            </section >
            <ContactButtonright />
        </>
    );
}