import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const profile = localStorage.getItem("profile") || "";
    //req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});
// API.interceptors.response.use(response => {
//     return response;
//  }, error => {
//    if (error.response.status === 401) {
//         window.location.assign('/loginUser');
//    }
//    else if(error.response.status === 500) {
//        alert("Server error");
//    }
//    return error;

//  });
export const signIn = (formData: any) => API.post("/login", formData);
export const signUp = (formData: any) => API.post("/register", formData);
