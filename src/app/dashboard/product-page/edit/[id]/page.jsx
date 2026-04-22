"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../../../../component/productForm";
import { api } from "../../../../apis/apiList";
import { getToken, useAuthGuard } from "../../../../../helper/getCommonData";


export default function EditProductPage() {
    useAuthGuard();

    const { id } = useParams();

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${api.apiCall.productShow}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    Accept: "application/json",
                },
            });

            const json = await res.json();

            // 🔥 FIX
            setProductData(json.data || json || null);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    // if (loading) return <p>Loading...</p>;

    return (
        <div>
            <ProductForm
                initialData={productData}
                productId={id}
            />
        </div>
    );
}