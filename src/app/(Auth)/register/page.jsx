"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/Redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import styles from '../auth.module.css'
import Link from "next/link";
import { errortoast, successtoast } from "@/utils/toastalert/alerttoast";
export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { push } = useRouter();
    const [avatar, setAvatar] = useState();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: "",
    });

    const InputchangeHandler = (e) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const SubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", value.name);
            formData.append("email", value.email);
            formData.append("password", value.password);
            if (avatar) {
                formData.append('file', avatar);
            }
            const response = await axios.post("http://localhost:8000/user/create_user", formData);
            const data = await response.data;
            successtoast('user register successfully')
            setTimeout(() => {
                router.push("/login")
            }, 100);
        } catch (error) {
            errortoast(error.response.data.message || error)
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {/* {
                <main className="form-signin">
                    <form onSubmit={SubmitHandler}>
                        <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                        <div className="form-floating">
                            <label htmlFor="floatingInput">Enter Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="enter name"
                                name="name"
                                value={value.name}
                                onChange={InputchangeHandler}
                            />

                        </div>
                        <div className="form-floating">
                            <label htmlFor="floatingInput">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                name="email"
                                value={value.email}
                                onChange={InputchangeHandler}
                            />

                        </div>
                        <div className="form-floating">
                            <label htmlFor="floatingPassword">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                name="password"
                                value={value.password}
                                onChange={InputchangeHandler}
                            />

                        </div>
                        <div>
                            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            Sign in
                        </button>
                    </form>
                </main>
            } */}
            <div className={styles.background}>
                <div className={styles.shape}></div>
                <div className={styles.shape}></div>
            </div>
            <form className={styles.regiform} onSubmit={SubmitHandler}>
                <h3>Register Here</h3>
                <label htmlFor="name">Username</label>
                <input type="text" placeholder="name" id="name" name="name"
                    value={value.name}
                    onChange={InputchangeHandler} />
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="email" id="email" name="email"
                    value={value.email}
                    onChange={InputchangeHandler} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" name="password"
                    value={value.password}
                    onChange={InputchangeHandler} className="mb-3" />
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
