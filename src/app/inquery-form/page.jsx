import { api } from "../apis/apiList";
import InqueryForm from "./form-page";

export const dynamic = "force-dynamic";

export default async function Page() {
    const res = await fetch(api.apiCall.categoryList, { cache: "no-store" });
    const data = await res.json();
    const categories = data?.data || [];
    // console.log("Full data:", data);

    return <InqueryForm categories={categories} />;
}