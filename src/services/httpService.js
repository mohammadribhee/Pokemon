import axios from "axios";
import { toast } from "react-toastify";

//http
//-----------------start---------------------------//
//this is a separate file to organize API links by use 'axios'
//-----------------end----------------------------//
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

//axios.interceptors
//-----------------start---------------------------//
//any error not expected when we call the data from API we print the error immediately
//-----------------end----------------------------//
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

export default http;
