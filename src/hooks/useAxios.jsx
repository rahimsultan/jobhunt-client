import axios from "axios";
import useAuth from "./useAuth";

export const instanceSecure = axios.create({
    baseURL: 'https://job-hunt-server-kohl.vercel.app',
    withCredentials: true, 
  });



  
  const useAxios = () => {
    const {LogOut} = useAuth()
    instanceSecure.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        instanceSecure.post('/api/auth/logout')
        .then(res => {
          LogOut()
        })
      }
      return Promise.reject(error);
    });
    return instanceSecure
  }
  
  export default useAxios
