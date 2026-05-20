import { useAuthGuard } from "@/helper/getCommonData";
import HomeBannerForm from "../../../component/homeBannerForm";

export default function EditBannerPage() {
    useAuthGuard

    return <HomeBannerForm id="edit" />;
}