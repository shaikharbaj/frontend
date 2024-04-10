"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearerror, loginUserAsync, setCredentials } from "@/app/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import styles from '../auth.module.css'
import Link from "next/link";
import { errortoast, successtoast } from "@/utils/toastalert/alerttoast";
import { useSelector } from 'react-redux'
export default function login() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { loading, error, success } = useSelector((state) => state.auth);
    const [value, setValue] = useState({
        email: "",
        password: "",
    });
    // const [error,setError] = useState();

    const InputchangeHandler = (e) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };
    useEffect(() => {
        return ()=>{
            dispatch(clearerror())
        };
    }, [])
    useEffect(() => {
        if (error) {
            if (typeof (error) === 'string') {
                errortoast(error);
                dispatch(clearerror())
            }
        }
        if (success) {
            successtoast('user logged in successfully')
            push("/dashboard/home");
            dispatch(clearerror());
        }
    }, [error, success]);



    const SubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                email: value.email,
                password: value.password
            }
            dispatch(loginUserAsync(payload))
            // const response = await axios.post("http://localhost:8000/user/login_user", payload);
            // const data = await response.data;
            // if (data?.token) {
            //     dispatch(setCredentials(data));
            //     push("/dashboard/home");

            // }
            // successtoast('user logged in successfully');
        } catch (error) {
            // if (error.response.data.validationerror && (error.response.data.message ===
            //     "Validation failed")) {
            //     setError(error.response.data.validationerror)
            // } else {
            //     errortoast(error.response.data.message || error);
            // }

        }
    };


    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.form} onSubmit={SubmitHandler}>
                <h3>Login Here</h3>

                <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                <input type="email" placeholder="Email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />
                {error?.email && <span className="error">{error.email}</span>}

                <label htmlFor="password">Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="Password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} />
                {error?.password && <span className="error">{error.password}</span>}

                <button disabled={loading}>Log In</button>
                <div className={styles.alreadyhave}>
                    <p>Not have an  account? <Link href={"/register"}>Register</Link></p>
                </div>
            </form>
        </>
    );
}
