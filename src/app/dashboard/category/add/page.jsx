"use client";

import CategoryForm from "../../../component/categoryForm";
import { useAuthGuard } from "../../../../helper/getCommonData";

export default function CreateCategoryPage() {
    useAuthGuard();
    return <CategoryForm />;
}