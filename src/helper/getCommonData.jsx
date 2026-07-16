"use client";
import { api } from '../app/apis/apiList';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* =========================
   TOKEN HELPERS
========================= */

// ✅ Save token
export function setToken(token) {
  localStorage.setItem("token", token);
}

// ✅ Get token
export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// ✅ Remove token
export function removeToken() {
  localStorage.removeItem("token");
}
/* =========================
   USER HELPER
========================= */
// ✅ Save user object
export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// ✅ Get user object
export function getUser() {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  // console.log(user, "user by user");
  return user ? JSON.parse(user) : null;
}

export function getRoleId() {
  const user = getUser();

  return user ? user.role_id : null;
}
export function getCompanyId() {
  const user = getUser();

  return user ? user.company_id : null;
}

export function hasRole(roleId) {
  return getRoleId() === roleId;
}

// ✅ Remove user
export function removeUser() {
  localStorage.removeItem("user");
}

/* =========================
   LOGIN API
========================= */

export async function loginUser(data) {
  // console.log(data, 'data by data');
  const res = await fetch(api.apiCall.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // console.log(res, 'tesy by data');
  return res.json();
}

export function useAuthGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
    } else {
      setChecking(false);
    }
  }, []);

  return checking;
}


export function useAdminGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    const user = getUser();

    //  not logged in
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    //  not admin
    if (user.role_id !== 1) {
      router.replace("Not Found"); // ya /403
      return;
    }

    setChecking(false);
  }, []);

  return checking;
}

export async function getCompayId(id) {
  const res = await fetch(`${api.apiCall.getUserCompanyId}${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      Accept: "application/json",
    },
  });

  const data = await res.json();
  // console.log(data.data, "data by data");
  return data.data;
}

export function getCompanyIdConvertInToken() {
  const user = getUser();
  // console.log(user, "dfgdsg")
  return user ? user.token : 0;
}

// export function useUserLoginRedirect() {
//   const router = useRouter();

//   useEffect(() => {
//     const loginUserId = getUser();

//     if (loginUserId?.id) {
//       router.push("/dashboard");
//     }
//   }, []);


// }


export function useUserLoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    let redirectPath = getRedirectPath();

    //  Agar user login nahi hai to kuch mat kar
    if (!user?.id) return;

    //  Security: sirf internal paths allow karo (no external URLs)
    if (redirectPath && !redirectPath.startsWith("/")) {
      redirectPath = null;
      removeRedirectPath();
    }

    //  Agar redirectPath hai (highest priority)
    if (redirectPath) {
      router.replace(redirectPath); // replace = back me login page nahi ayega
      removeRedirectPath();
      return;
    }

    // . Admin → Dashboard
    if (user.role_id === 1) {
      router.replace("/dashboard");
      return;
    }

    // . Normal User → Home
    router.replace("/");
  }, []);
}

// getCommonData.js mein add karo
/* 🔥 REDIRECT LOGIC */

export function setRedirectPath(path) {
  localStorage.setItem("redirect_after_login", path);
}

export function getRedirectPath() {
  return localStorage.getItem("redirect_after_login");
}

export function removeRedirectPath() {
  localStorage.removeItem("redirect_after_login");
}

export const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-"); // funciton for URL mai naam deikhe product ka category par click wise

export function useAdminGuardAdmin() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (user?.role_id === 1) {
      router.replace("/dashboard/product-inquery");
    }
  }, [router]);
}