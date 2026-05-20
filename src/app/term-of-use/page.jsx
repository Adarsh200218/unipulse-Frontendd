import { api } from "../apis/apiList";
import TermsOfUseClient from "./TermOfUse";

export default async function TermOfUsePage() {

    const catRes = await fetch(api.apiCall.categoryList, {
        cache: "no-store",
    });

    const catData = await catRes.json();

    return (
        <TermsOfUseClient
            categories={catData.data || []}
        />
    );
}