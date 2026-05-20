import { api } from "../apis/apiList";
import ContactUs from "../contact-us/ContactUs";

export default async function TermOfUsePage() {

    const catRes = await fetch(api.apiCall.categoryList, {
        cache: "no-store",
    });

    const catData = await catRes.json();

    return (
        <ContactUs
            categories={catData.data || []}
        />
    );
}