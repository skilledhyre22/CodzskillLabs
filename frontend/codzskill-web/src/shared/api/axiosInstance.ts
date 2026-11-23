import axios from "axios"
import { toast } from "react-toastify"

export const BASE_URL="http://localhost:5170/api/"

export const apiClient=axios.create({
  baseURL:BASE_URL
})

export const authToken="CodzSkillLabs_Auth_Token"

apiClient.interceptors.request.use(async config=>{
    const token= localStorage.getItem(authToken)
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    return config;
}, (error) => {
   
  return Promise.reject(error);
}
)

apiClient.interceptors.response.use(
       function (response) {
       return  response;
      },

    function  (error) {
       if (error.response && error.response.status === 400) {
          toast.error('Bad Request: ' + (error.response.data.problemDetails?.title || 'Invalid request'))
        }
        else if (error.response && error.response.status === 401) {
         
                toast.error('Unauthorized: ' + (error.response.data.problemDetails?.title || 'You are not authorized to access this resource. Please login again.'))
           
             window.location.href = '/login';
        }
         else if (error.response && error.response.status === 403) {
          toast.error('Forbidden: ' + (error.response.data.problemDetails?.title || 'You do not have permission to access this resource.'))
        }
        else if (error.response && error.response.status === 404) {
          toast.error('Not Found: ' + (error.response.data.problemDetails?.title || 'The requested resource was not found.'))
        }
       else if (error.response?.status === 429) {
    toast.error(
        error.response.data?.message ||
        "Too many requests. Please try again later."
    );
}
        else if (error.response && error.response.status >= 400 && error.response.status < 500) {
          toast.error('Client Error: ' + (error.response.data.problemDetails?.title))
        }
        else if (error.response && error.response.status >= 500) {
          toast.error('Server Error: ' + (error.response.data.problemDetails?.title))
        }
        return Promise.reject(error);
      }
    );