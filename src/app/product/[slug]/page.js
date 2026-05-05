// import { api } from "../../apis/apiList";
// import HomeClient from "../../component/HomeClient";

// export default async function ProductPage() {
//   const catRes = await fetch(api.apiCall.categoryList, {
//     cache: "no-store",
//   });
//   const catData = await catRes.json();

//   const prodRes = await fetch(api.apiCall.productList, {
//     cache: "no-store",
//   });
//   const prodData = await prodRes.json();

//   return (
//     <HomeClient
//       categories={catData.data || []}
//       products={prodData.data || []}
//     />
//   );
// }