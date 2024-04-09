"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../app/Components/Loader/Loader";

const authenticatedRoutes = ["/dashboard/home","/profile"];

export default function Protected({ children }) {
  const [user, setUser] = useState({});
  const { userinfo } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    if (!userinfo && authenticatedRoutes.includes(pathname)) push("/login");

    if (userinfo) setUser(userinfo);
  }, [userinfo]);

  if (!user?.email) return <Loading />;

  return <>{children}</>;
}

