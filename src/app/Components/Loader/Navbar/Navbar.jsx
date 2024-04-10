"use client";
import { logout } from "@/app/Redux/features/auth/authSlice";
import Helper from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css'
import { successtoast } from "@/utils/toastalert/alerttoast";
const Navbar = () => {
    const { push } = useRouter();
    const dispatch = useDispatch();
    const [token, setToken] = useState();
    const { userinfo } = useSelector((state) => state.auth);
    const logoutHandler = (event) => {
        event.preventDefault();
        dispatch(logout());
        push("/login");
        successtoast('user logged out succesfully')  
    };
    useEffect(() => {
        const token = Helper.getLocalToken();
        setToken(token)
    }, [userinfo])
    return (
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/dashboard/home">
                    Navbar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className='bx bx-menu' style={{ fontSize: "30px", color: "white" }}></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {
                            token ? <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/">
                                        <span className="welcome">{`Welcome ${userinfo?.name?.length > 7 ? (userinfo?.name?.split("").slice(0, 8).join("") + "...") : (userinfo?.name)}`}</span>
                                    </Link>


                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/about">
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href={"#"} onClick={logoutHandler}>
                                        Logout
                                    </Link>
                                </li>

                            </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        }

                        {/* */}

                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;