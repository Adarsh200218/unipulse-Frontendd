import { useAuthGuard } from "@/helper/getCommonData";
import HomeAboutForm from "../../../component/homeAboutForm";

export default function EditAboutPage() {
    useAuthGuard

    return <HomeAboutForm id={1} />;
}