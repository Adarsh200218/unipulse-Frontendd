"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronsRight } from "lucide-react";
import { Download } from "lucide-react";
import { CircleUserRound } from 'lucide-react';
import { api } from "../apis/apiList";
import { getToken, getUser, removeToken, removeUser } from "../../helper/getCommonData";
import { useState, useEffect } from "react";
import { Lock, X, SquarePen } from "lucide-react";
import { ArrowBigRight, ArrowBigDown } from 'lucide-react';


export default function CategorySideBar({ categories = [], showAuth = true, hrefFn }) {

    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const u = getUser();
        const token = getToken();
        if (u && token) setUser(u);
        setLoading(false);
    }, []);

    const handleLogout = () => {
        removeToken();
        removeUser();
        setUser(null);
        router.push("/");
    };

    return (
        <aside className="w-full md:col-span-4 lg:col-span-4 xl:col-span-3 shrink-0 px-4 lg:px-2 lg:p-4 mt-2 xl:mt-9  ">
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
        // <aside className=" w-full md:col-span-4 lg:col-span-4 xl:col-span-3 shrink-0 px-2 md:px-2 xl:px-2 lg:px-2  py-14 pb-0 ">
        //     <div className="lg:sticky lg:top-20 overflow-hidden mb-2">

        //         <div className="p-3 space-y-3 bg-green-800 text-white rounded h-full flex flex-col ">
        //             <div className="text-black  rounded">
        //                 {!user ? (
        //                     <div className="grid grid-cols-2 gap-2">
        //                         <Link
        //                             href="/login#login-form"
        //                             className="
        //     group
        //     relative
        //     overflow-hidden
        //     flex
        //     items-center
        //     justify-center
        //     gap-2
        //     h-10
        //     rounded-xl
        //     bg-green-600
        //     text-white
        //     font-medium
        //     border
        //     border-green-500
        //     shadow-sm
        //     hover:shadow-lg
        //     hover:-translate-y-0.5
        //     transition-all
        //     duration-300
        // "
        //                         >
        //                             <span
        //                                 className="
        //         absolute
        //         inset-0
        //         bg-green-700
        //         scale-x-0
        //         origin-left
        //         transition-transform
        //         duration-300
        //         group-hover:scale-x-100
        //     "
        //                             />

        //                             <span className="relative flex items-center gap-2">
        //                                 <Lock size={16} />
        //                                 Login
        //                             </span>
        //                         </Link>

        //                         <button
        //                             onClick={() => router.push("/register")}
        //                             className="
        //     group
        //     relative
        //     overflow-hidden
        //     flex
        //     items-center
        //     justify-center
        //     gap-2
        //     h-10
        //     rounded-xl
        //     bg-blue-600
        //     text-white
        //     font-medium
        //     border
        //     border-blue-500
        //     shadow-sm
        //     hover:shadow-lg
        //     hover:-translate-y-0.5
        //     transition-all
        //     duration-300
        //     cursor-pointer
        // "
        //                         >
        //                             <span
        //                                 className="
        //         absolute
        //         inset-0
        //         bg-blue-700
        //         scale-x-0
        //         origin-left
        //         transition-transform
        //         duration-300
        //         group-hover:scale-x-100
        //     "
        //                             />

        //                             <span className="relative flex items-center gap-2">
        //                                 <SquarePen size={16} />
        //                                 Register
        //                             </span>
        //                         </button>
        //                     </div>
        //                 ) : (
        //                     //<div className="text-center space-y-2 ">
        //                     //    <p className="font-semibold text-2xl text-white mt-2">Welcome</p>
        //                     //    <p> <CircleUserRound className=" w-8 h-8 text-white items-center " /></p>
        //                     //    <p className="text-white text-xl"
        //                     //    >{user.name}</p>
        //                     //    <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 cursor-pointer">Logout</button>
        //                     //</div>


        //                     //<div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20 shadow-lg">
        //                     //    <div className="flex justify-center mb-1">
        //                     //        <div className="w-12 h-12 lg:h-12 lg:w-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
        //                     //            <CircleUserRound className="w-8 h-8 lg:h-8 lg:w-8 text-white" />
        //                     //        </div>
        //                     //    </div>

        //                     //    <h2 className="text-white text-xl font-bold">
        //                     //        Welcome Back
        //                     //    </h2>

        //                     //    <p className="text-green-100 text-lg ">
        //                     //        {user.name}
        //                     //    </p>

        //                     //    <div className="mt-4">
        //                     //        <button
        //                     //            onClick={handleLogout}
        //                     //            className="px-5 py-1 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        //                     //        >
        //                     //            Logout
        //                     //        </button>
        //                     //    </div>
        //                     //</div>

        //                     <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-3">
        //                         <div className="flex items-center gap-3">
        //                             <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
        //                                 <CircleUserRound className="w-6 h-6 text-white" />
        //                             </div>

        //                             <div className="flex-1 min-w-0">
        //                                 <p className="text-sm text-green-100 uppercase tracking-wide">
        //                                     Welcome Back
        //                                 </p>

        //                                 <h3 className="text-white font-semibold truncate">
        //                                     {user.name}
        //                                 </h3>
        //                             </div>

        //                             <button
        //                                 onClick={handleLogout}
        //                                 className="
        //         px-3
        //         py-1
        //         text-[14px]
        //         font-medium
        //         rounded-lg
        //         bg-red-500/90
        //         hover:bg-red-600
        //         text-white
        //         transition-all
        //         duration-200
        //         cursor-pointer
        //     "
        //                             >
        //                                 Logout
        //                             </button>
        //                         </div>
        //                     </div>
        //                 )}
        //             </div>
        //             <hr className="border-white/30" />
        //             <div className="flex items-start gap-3">
        //                 {/*<div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
        //                     <Download className="w-5 h-5 text-green-200" />
        //                 </div>*/}

        //                 <div>
        //                     <h2 className="text-lg font-bold text-white leading-none">
        //                         Downloads
        //                     </h2>

        //                     <p className="text-xs text-green-100 mt-1 leading-relaxed">
        //                         Our most recent catalogue, manuals and external dimension views can be downloaded.
        //                     </p>
        //                 </div>
        //             </div>
        //             <hr className="border-white/30" />
        //             {/*<div className="flex flex-col flex-1 min-h-0">
        //                 <h3 className="text-xl font-semibold mb-3">List of Download Files</h3>
        //                 <div className="flex flex-col gap-2 pr-1 space-y-2 ">
        //                     {categories.map((item) => (
        //                         <Link
        //                             key={item.id}
        //                             href={hrefFn ? hrefFn(item) : "/products-list"}
        //                             className="flex items-center justify-between bg-white text-black  rounded-md 
        //                 border border-gray-200 shadow-sm  hover:shadow-md hover:-translate-y-0.5 transition"
        //                         >
        //                             <div className="flex  items-center gap-4">
        //                                 <img
        //                                     src={
        //                                         item.images?.length > 0 && item.images[0]?.image_url
        //                                             ? `${api.image.imageURL}${item.images[0].image_url}`
        //                                             : "/images/default.png"
        //                                     }
        //                                     alt={item.title}
        //                                     width={80}
        //                                     height={80}
        //                                     className="object-contain rounded w-14 lg:w-14 h-auto"
        //                                 />
        //                                 <h3 className="text-[14px] lg:text-[14px] font-semibold px-1 py-1 rounded cursor-pointer transition">
        //                                     {item.title}
        //                                 </h3>
        //                             </div>

        //                             <ChevronsRight />
        //                         </Link>
        //                     ))}
        //                 </div>
        //             </div>*/}
        //             <div className="flex flex-col flex-1 min-h-0">
        //                 <div className="flex items-center justify-between mb-4">
        //                     <h3 className="text-lg font-bold text-white">
        //                         List of Download Files
        //                     </h3>

        //                     <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
        //                         {categories.length}
        //                     </span>
        //                 </div>

        //                 <div className="flex flex-col gap-2">
        //                     {categories.map((item) => (
        //                         <Link
        //                             key={item.id}
        //                             href={hrefFn ? hrefFn(item) : "/products-list"}
        //                             className="
        //   group
        //   relative
        //   overflow-hidden
        //   bg-white
        //   rounded-xl
        //   border border-gray-100
        //   shadow-sm
        //   hover:shadow-xl
        //   hover:border-green-200
        //   transition-all
        //   duration-300
        //   hover:-translate-y-1
        // "
        //                         >
        //                             {/* Left Green Hover Border */}
        //                             <div
        //                                 className="
        //     absolute
        //     left-0
        //     top-0
        //     h-full
        //     w-1
        //     bg-green-600
        //     scale-y-0
        //     group-hover:scale-y-100
        //     transition-transform
        //     duration-300
        //     origin-top
        //   "
        //                             />

        //                             <div className="flex items-center justify-between p-1">
        //                                 <div className="flex items-center gap-3 min-w-0">
        //                                     <div
        //                                         className="
        //         h-12
        //         w-12
        //         rounded-lg
        //         bg-slate-50
        //         border
        //         border-slate-100
        //         flex
        //         items-center
        //         justify-center
        //         overflow-hidden
        //         shrink-0
        //       "
        //                                     >
        //                                         <img
        //                                             src={
        //                                                 item.images?.length > 0 &&
        //                                                     item.images[0]?.image_url
        //                                                     ? `${api.image.imageURL}${item.images[0].image_url}`
        //                                                     : "/images/default.png"
        //                                             }
        //                                             alt={item.title}
        //                                             width={56}
        //                                             height={56}
        //                                             className="
        //           object-contain
        //           h-12
        //           w-12
        //           group-hover:scale-110
        //           transition-transform
        //           duration-300
        //         "
        //                                         />
        //                                     </div>

        //                                     <div className="min-w-0">
        //                                         <h4
        //                                             className="
        //           text-sm
        //           font-semibold
        //           text-gray-800
        //           line-clamp-2
        //           group-hover:text-green-700
        //           transition-colors
        //         "
        //                                         >
        //                                             {item.title}
        //                                         </h4>

        //                                         <p className="text-[11px] text-gray-500 ">
        //                                             Download Files
        //                                         </p>
        //                                     </div>
        //                                 </div>

        //                                 <div
        //                                     className="
        //       h-9
        //       w-9
        //       rounded-full
        //       bg-green-50
        //       flex
        //       items-center
        //       justify-center
        //       shrink-0
        //       group-hover:bg-green-600
        //       transition-all
        //     "
        //                                 >
        //                                     <ChevronsRight
        //                                         size={18}
        //                                         className="
        //         text-green-700
        //         group-hover:text-white
        //         group-hover:translate-x-0
        //         transition-all
        //       "
        //                                     />
        //                                 </div>
        //                             </div>
        //                         </Link>
        //                     ))}
        //                 </div>
        //             </div>
        //             {/*<hr className="border-white/30" />*/}

        //         </div>
        //     </div>
        // </aside>

    );
}