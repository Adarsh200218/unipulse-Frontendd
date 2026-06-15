

"use client";

import CategoryListPage from "./category/page";
import { useAuthGuard, useAdminGuard } from "../../helper/getCommonData";

export default function Home() {
    useAuthGuard();
    useAdminGuard();

    return <CategoryListPage />;
}