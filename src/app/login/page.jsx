import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { api } from "../apis/apiList";

export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await fetch(api.apiCall.categoryList, { cache: "no-store" });
  const data = await res.json();
  const categories = data?.categories || [];
  return (
    <Suspense fallback={null}>
      {/* <LoginClient /> */}
      <LoginClient categories={data.data || []} />;
    </Suspense>
  );
}