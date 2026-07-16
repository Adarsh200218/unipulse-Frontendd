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
import { ArrowBigRight, ArrowBigDown } from 'lucide-react';

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

                        <aside className="order-2 lg:order-1 w-full md:col-span-4 lg:col-span-4 xl:col-span-3 shrink-0 px-4 lg:px-2 lg:p-4 mt-2 xl:mt-9  ">
                            <div className="lg:sticky lg:top-20 overflow-hidden mb-2">

                                <div className=" space-y-3 bg-green-800 text-white rounded h-full flex flex-col  ">
                                    <div className="text-black  rounded mb-1">
                                        <div className="relative overflow-hidden rounded-tr rounded-tl shadow-lg group">

                                            {/* Top Ribbon */}
                                            <div className="bg-gradient-to-r from-[#e10c13] to-red-500 py-1   text-center relative">
                                                {/*<span className="absolute top-0 left-0 w-10 h-full bg-red-700"></span>*/}

                                                <h2 className="relative text-white  text-[24px] font-bold  ">
                                                    ONLINE
                                                </h2>
                                            </div>


                                            {/* Content */}
                                            <div className="bg-gradient-to-br from-gray-100 to-gray-100 py-2 px-1 text-center">

                                                <h3 className="text-red-600 text-[16px] font-semibold">
                                                    Enquiry & Offers
                                                </h3>

                                                <div className="my-1 h-[2px] bg-red-500 w-20 mx-auto"></div>

                                                <p className="text-red-600 text-[16px] font-semibold">
                                                    Book & Buy  <span className="inline-block mt-1 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                                        PAN INDIA
                                                    </span>
                                                </p>



                                            </div>

                                        </div>
                                        {!user ? (



                                            <div className="grid grid-cols-2 gap-2 pt-4 px-2 py-2 lg:p-3 " >

                                                <Link
                                                    href="/login#login-form"
                                                    className=" group  relative overflow-hidden  flex  items-center justify-center gap-2 h-10 rounded-xl bg-green-600 text-white font-medium border border-green-500 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all
                                                    duration-300" >
                                                    <span className="  absolute  inset-0  bg-green-700  scale-x-0  origin-left  transition-transform  duration-300
group-hover:scale-x-100  " />

                                                    <span className="relative flex items-center gap-2">
                                                        <Lock size={16} />
                                                        Login
                                                    </span>
                                                </Link>

                                                <button
                                                    onClick={() => router.push("/register")}
                                                    className="  group  relative  overflow-hidden  flex  items-center justify-center  gap-2  h-10 rounded-xl  bg-blue-600  text-white  font-medium  border  border-blue-500  shadow-sm  hover:shadow-lg  hover:-translate-y-0.5  transition-all  duration-300  cursor-pointer  " >
                                                    <span className=" absolute  inset-0 bg-blue-700 scale-x-0  origin-left  transition-transform  duration-300  group-hover:scale-x-100   " />

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



                                    <div className="relative overflow-hidden  shadow-lg px-3">

                                        {/* Header */}
                                        <div className="overflow-hidden rounded shadow-xl border border-white/20">

                                            {/* Header */}
                                            <div className="
        relative
        bg-gradient-to-r
        from-green-500
        via-green-600
        to-emerald-700
        py-1
        flex
        items-center
        justify-center
        gap-3
        overflow-hidden
    ">

                                                {/* Shine Effect */}
                                                <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            -translate-x-full
            hover:translate-x-full
            transition-transform
            duration-700
        "></div>


                                                {/* Icon */}
                                                <div className="
         
        ">
                                                    <ArrowBigRight size={26} className=" text-white " />
                                                </div>


                                                <h2 className="
            relative
            text-white
            text-[22px]
            font-semibold tracking-wide
           
       
        ">
                                                    SELECT PRODUCT
                                                </h2>


                                            </div>



                                            {/* Body */}
                                            <div className="
        relative
        bg-gradient-to-br
        from-[#064b63]
        via-[#08738c]
        to-[#02a5c7]
        px-2
        py-2
        text-center
        overflow-hidden
    ">


                                                {/* Background Circle */}
                                                <div className="
            absolute
            -top-10
            -right-10
            w-32
            h-32
            bg-white/10
            rounded-full
        "></div>


                                                <div className="
            absolute
            -bottom-12
            -left-12
            w-36
            h-36
            bg-white/10
            rounded-full
        "></div>



                                                <h3 className="
            relative
            text-white
            text-[16px]
            font-semibold
           
        ">
                                                    ONLINE DOWNLOAD
                                                </h3>


                                                <div className="
            w-20
            h-1
            bg-green-300
            mx-auto
            my-2
            rounded-full"></div>


                                                <p className=" relative
text-white text-[14px] leading-relaxed max-w-full px-2  font-semibold    group-hover:text-green-700   transition-colors   ">

                                                    DATASHEET , MANUAL & CATALOGUES </p>


                                                <div className="mt-2 flex justify-center">
                                                    <div className="bg-white/20 rounded-full p-1 animate-bounce">
                                                        <ArrowBigDown className="text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                    <div className="flex flex-col flex-1 px-3 py-2 lg:p-3">


                                        <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar">

                                            {categories.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href="/products-list"
                                                    className="  group  flex  items-center  justify-between  bg-white  rounded-xl  p-1  border  border-gray-100  shadow-sm  hover:shadow-lg  hover:border-green-200 transition-all  duration-300 hover:-translate-y-0.5  " >
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="   h-12   w-12   rounded-lg   bg-slate-50   border   border-slate-100   flex   items-center   justify-center   overflow-hidden   shrink-0   "
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
                                                                className=" h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110  "
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
                                                className="w-full h-full xl:h-[320px] 2xl:h-[500px] object-fill rounded-lg"
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