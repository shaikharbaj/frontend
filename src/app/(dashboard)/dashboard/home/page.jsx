"use client"
import { loadUserAsync } from "@/app/Redux/features/auth/authSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './home.module.css'
import { useRouter } from "next/navigation";
export default function Home() {
  const { userinfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  // useEffect(() => {
  //   dispatch(loadUserAsync())
  // }, []);

  const gotoprofile=()=>{
       router.push("/profile")
  }
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Welcome TO Dashboard</h1>
        <button onClick={gotoprofile}>GO TO Profile</button>
      </div>
    </>
  )
}

