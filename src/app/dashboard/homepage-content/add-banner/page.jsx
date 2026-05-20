import { useAuthGuard } from "@/helper/getCommonData";
import HomeBannerForm from "../../../component/homeBannerForm";

export default function AddBannerPage() {
    useAuthGuard

    return <HomeBannerForm />;
}