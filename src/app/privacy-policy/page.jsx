import { api } from "../apis/apiList";
import PrivacyPolicyClient from "../privacy-policy/PrivacyPolicyClient";

export default async function PrivacyPolicyPage() {

    const catRes = await fetch(api.apiCall.categoryList, {
        cache: "no-store",
    });

    const catData = await catRes.json();

    return (
        <PrivacyPolicyClient
            categories={catData.data || []}
        />
    );
}