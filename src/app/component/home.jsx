"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../apis/apiList";
import { ChevronsRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    // const bannerSlides = [
    //     "/images/slider1.jpg",
    //     "/images/slider2.jpg",
    //     "/images/slider3.jpg",
    //     "/images/slidernew.jpg",
    // ];

    return (
        <section className="pt-6">
            <div className="flex flex-col lg:flex-row min-h-screen max-w-[1400px] mx-auto gap-4">

                {/* ================= SIDEBAR ================= */}
                <aside className="w-full lg:w-[320px] bg-white mt-4 lg:p-4 lg:mt-0 shrink-0">
                    <div className="lg:sticky lg:top-20 h-[calc(100vh-80px)] overflow-hidden">
                        <div className="p-6 space-y-6 bg-green-800 text-white rounded h-full flex flex-col">

                            {/* DOWNLOAD TEXT */}
                            <div>
                                <h1 className="text-2xl font-bold">Download</h1>
                                <p className="text-sm mt-2">
                                    Our most recent catalogue, manuals and external dimension views can be downloaded.
                                </p>
                            </div>

                            <hr className="border-white/30" />

                            {/* CATEGORY LIST — flex-1 se poora space lega */}
                            <div className="flex flex-col flex-1 min-h-0">
                                <h3 className="text-xl font-semibold mb-3">
                                    List of Download Files
                                </h3>

                                <div className="flex flex-col gap-2 h-[470px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                    {categories.map((item) => (
                                        <Link
                                            key={item.id}
                                            href="/products-list"
                                            className="flex items-center justify-between bg-white text-black px-3 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        item.images?.length > 0 && item.images[0]?.image_url
                                                            ? `${api.image.imageURL}${item.images[0].image_url}`
                                                            : "/images/default.png"
                                                    }
                                                    alt={item.title}
                                                    width={80}
                                                    height={80}
                                                    className="object-contain rounded w-12 h-12 flex-shrink-0"
                                                />
                                                {item.title}
                                            </div>

                                            <ChevronsRight />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-white/30" />

                            {/* AUTH — NEECHE FIXED */}
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

                {/* ================= MAIN CONTENT ================= */}
                <main className="flex-1 p-4 mt-16">
                    {/* <div className="mb-4">
                        <a
                            href="https://www.unipulseindia.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-700 transition-all duration-200"
                        >
                            ← Go Back
                        </a>
                    </div> */}
                    <h1 className="text-3xl font-bold text-gray-800 leading-snug mb-2">
                        {aboutData?.title}{" "}

                        <span className="text-green-700">
                            {aboutData?.highlight_title}
                        </span>
                    </h1>

                    <p className="text-gray-600 text-base leading-7 mb-4">
                        {aboutData?.sub_title}
                    </p>


                    <div className="border border-gray-300 mb-10 rounded bg-white p-10">

                        {/* <div className="bg-gray-200 px-4 py-2 mb-6 border-l-4 border-green-700">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Product category
                            </h3>
                        </div> */}
                        {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-14 text-center">
                            {categories.map((item) => (
                                <Link
                                    key={item.id}
                                    href="/products-list"
                                    className="group flex flex-col items-center cursor-pointer border border-gray-200 p-5 rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                                >
                                    <img
                                        src={
                                            item.images?.length > 0 && item.images[0]?.image_url
                                                ? `${api.image.imageURL}${item.images[0].image_url}`
                                                : "/images/default.png"
                                        }
                                        alt={item.title}
                                        className="h-20 object-contain mb-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                                    />
                                    <p className="text-sm font-semibold text-green-800 transition-all duration-300 group-hover:text-red-800">
                                        {item.title}
                                    </p>
                                </Link>
                            ))}
                        </div> */}

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true }}
                            className="w-full max-w-[900px] mx-auto"
                        >

                            {bannerSlides.map((slide, index) => (

                                <SwiperSlide key={index}>
                                    <img
                                        src={`${api.image.imageURL}${slide.image}`}
                                        alt={`Banner ${index + 1}`}
                                        className="w-full h-[300px]  object-fill rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>


                    <div className="bg-white border border-gray-200  p-6 sm:p-8">
                        <div className="flex items-center justify-between mb-5">
                            <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                                About Us
                            </span>

                            <a
                                href="https://www.unipulseindia.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition inline-block cursor-pointer"
                            >
                                Go Back to Unipulse India
                            </a>
                        </div>

                        {/* <h2 className="text-gray-600 leading-8 text-sm sm:text-base mb-5">

                            {aboutData?.title}

                        </h2> */}

                        <div className="space-y-5">

                            {aboutData?.description
                                ?.split("\n")
                                .filter((item) => item.trim() !== "")
                                .map((para, index) => (

                                    <p
                                        key={index}
                                        className="text-gray-600 leading-8 text-sm sm:text-base"
                                    >

                                        {para}

                                    </p>

                                ))}

                        </div>

                    </div>

                </main>


            </div>
        </section >
    );
}