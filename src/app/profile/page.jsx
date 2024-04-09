"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Loader/Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { loadUserAsync, setuserprofiledata } from '../Redux/features/auth/authSlice'
import styles from './profile.module.css'
import privateRequest from '@/Interceptor/privateRequest'
import { errortoast, successtoast } from '@/utils/toastalert/alerttoast'
const page = () => {
    const { userinfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [date_of_birth, setDob] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    useEffect(() => {
        if (userinfo) {
            // Update state variables when userinfo changes
            setName(userinfo?.name || '');
            setEmail(userinfo?.email || '');
            setPhone(userinfo?.user_information?.phone_number || '');
            if (userinfo?.user_information?.data_of_birth) {
                const dateParts = userinfo?.user_information?.data_of_birth.split('T');
                const dateOfBirth = dateParts[0];
                setDob(dateOfBirth || '');
            }
            setStreet(userinfo?.user_information?.street || '');
            setCity(userinfo?.user_information?.city || '');
            setState(userinfo?.user_information?.state || '');
            setZipcode(userinfo?.user_information?.zipcode || '');
        }
    }, [userinfo]);

    useEffect(() => {
        dispatch(loadUserAsync())
    }, []);
    const submitHandler = async () => {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        if (avatar) {
            formdata.append('file', avatar);
        }
        formdata.append("data_of_birth", date_of_birth);
        formdata.append('phone_number', phone_number);
        formdata.append('street', street);
        formdata.append('city', city);
        formdata.append('state', state);
        formdata.append('zipcode', zipcode);
        try {
            setLoading(true);
            const response = await privateRequest.patch("/user/updateprofile", formdata);
            const data = await response.data;
            if (response.status === 200) {
                dispatch(setuserprofiledata(data));
                successtoast('user updated successfully');
                setAvatar(null)
            }
        } catch (error) {
            errortoast(error.response.data.message || error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="container mt-3">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar mb-2">
                                            <img src={userinfo?.avatar} className={`${styles.main_img} img-fluid`} alt="image" />
                                            <input type="file" accept="image/*" className={styles.input} id="profile" onChange={(e) => setAvatar(e.target.files[0])} />
                                            <div className={styles.change_profile}>
                                                <label htmlFor="profile" className={styles.label}>Choose File</label>
                                                {avatar && <img src={URL.createObjectURL(avatar)} alt="img" className={styles.preview} />}
                                            </div>
                                        </div>
                                        <h5 className="user-name mb-2">{userinfo?.name}</h5>
                                        <h6 className="user-email mb-1">{userinfo?.email}</h6>
                                    </div>
                                    {/* <div className="about">
                                        <h5>About</h5>
                                        <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID" value={email}
                                                onChange={(e) => setEmail(e.target.value)} disabled={true} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Enter phone number" value={phone_number}
                                                onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="website">DOB</label>
                                            <input type="date" className="form-control" id="website" placeholder="date of birth" onChange={(e) => setDob(e.target.value)} value={date_of_birth} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mt-3 mb-2 text-primary">Address</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="Street">Street</label>
                                            <input type="name" className="form-control" id="Street" placeholder="Enter Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="ciTy">City</label>
                                            <input type="name" className="form-control" id="ciTy" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="sTate">State</label>
                                            <input type="text" className="form-control" id="sTate" placeholder="Enter State" value={state} onChange={(e) => setState(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zIp">Zip Code</label>
                                            <input type="text" className="form-control" id="zIp" placeholder="Zip Code" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gutters mt-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-primary w-50" onClick={submitHandler} disabled={loading}>{loading ? "Data is Updating" : "Update"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page