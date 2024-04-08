"use client"
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export default function Home() {
  const { push } = useRouter();
  const gotoDashboard = () => {
    push("/dashboard/home");
  };
  const gotoLogin = () => {
    push("/login")
  };
  return (
    <>
      <button onClick={gotoDashboard}>Dashboard</button>
      <button onClick={gotoLogin}>Login</button>
    </>
  );
}
