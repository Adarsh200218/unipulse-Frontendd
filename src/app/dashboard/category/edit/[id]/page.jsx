"use client";

import { useParams } from "next/navigation";
import CategoryForm from "../../../../component/categoryForm";
import { useAuthGuard } from "../../../../../helper/getCommonData";

export default function EditCategoryPage() {
    useAuthGuard();

    const params = useParams();
    const id = params.id;

    return <CategoryForm id={id} />;
}