import { api } from "./apis/apiList";
import Home from "../app/component/home";

export default async function Page() {
  const res = await fetch(api.apiCall.categoryList, {
    cache: "no-store",
  });

  const data = await res.json();

  return <Home categories={data.data || []} />;
}
