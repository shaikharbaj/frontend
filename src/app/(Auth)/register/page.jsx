"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearerror, registerUserAsync, setCredentials } from "@/app/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import styles from '../auth.module.css'
import Link from "next/link";
import { errortoast, successtoast } from "@/utils/toastalert/alerttoast";
import { useSelector } from 'react-redux'
export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { push } = useRouter();
    const [avatar, setAvatar] = useState();
    const { loading, error, success } = useSelector((state) => state.auth);
    // const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
    });
    // const [error, setError] = useState(null);

    const InputchangeHandler = (e) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        return () => {
            dispatch(clearerror());
        }
    }, []);

    useEffect(() => {
        if (error) {
            
            if (typeof (error) === "string") {
                errortoast(error);
                dispatch(clearerror());
            }           
        }
        if (success) {
            successtoast('user register in successfully');
            push("/login");
            dispatch(clearerror());
        }
       
    }, [error, success])

    const SubmitHandler = async (event) => {
        event.preventDefault();
        // setError(null);
        // setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", value.name);
            formData.append("email", value.email);
            formData.append("password", value.password);
            if (avatar) {
                formData.append('file', avatar);
            }
            dispatch(registerUserAsync(formData))
            // const response = await axios.post("http://localhost:8000/user/create_user", formData);
            // const data = await response.data;
            // successtoast('user register successfully')
            // setTimeout(() => {
            //     router.push("/login")
            // }, 100);
        } catch (error) {
            // if (error.response.data.validationerror) {
            //     setError(error.response.data.validationerror)
            // } else {
            //     errortoast(error.response.data.message || error)
            // }

        } finally {
            // setLoading(false);
        }
    };


    return (
        <>
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.regiform} onSubmit={SubmitHandler}>
                <h3>Register Here</h3>
                <label htmlFor="name">Username<span className={styles.required}>*</span></label>
                <input type="text" placeholder="name" id="name" name="name"
                    value={value.name}
                    onChange={InputchangeHandler} />
                {error?.name && <span className="error">{error.name}</span>}
                <label htmlFor="email">Email<span className={styles.required}>*</span></label>
                <input type="email" placeholder="email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />
                {error?.email && <span className="error">{error.email}</span>}
                <label htmlFor="password">Password<span className={styles.required}>*</span></label>
                <input type="password" placeholder="Password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} />
                {(error?.password || error?.Password) && <span className="error mb-2">{error.password || error.Password}</span>}<br />
                <label htmlFor="avatar" className={styles.image_label}>choose image</label>
                <input type="file" accept="image/*" className={styles.avatar} id="avatar" onChange={(e) => setAvatar(e.target.files[0])} />
                {avatar && <img src={URL.createObjectURL(avatar)} alt="" className={styles.preview} />}
                <button disabled={loading}>{loading ? 'wait' : "Register"}</button>
                <div className={styles.alreadyhave}>
                    <p>already have account? <Link href={"/login"}>Login</Link></p>
                </div>
            </form>
        </>
    );
}
