import axios from "axios";
import Helper from "@/utils/helper";
import { useRouter } from "next/navigation";
const privateRequest = axios.create({
  baseURL: `http://localhost:8000`,
});

privateRequest.interceptors.request.use(
  (config) => {
    const token = Helper.getLocalToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    } else {
      console.log("no token found......");
    }
    return config;
  },
  (error) => {
    // Handle request error
    if(error)
    return Promise.reject(error);
  }
);

privateRequest.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       Helper.removeToken();
       setTimeout(()=>{
            window.location.href="/login";
       })
      return Promise.reject("Unauthorized");
    }
    // Handle response error
    return Promise.reject(error);
  }
);

export default privateRequest;
