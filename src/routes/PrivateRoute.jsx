import { Navigate, useLocation } from "react-router-dom";
import { BounceLoader } from 'react-spinners';
import useAuth from "../hooks/useAuth";



const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    console.log(user);
    const location = useLocation()
    // console.log(location);
    if(loading){
        return <div className="flex justify-center items-center h-[70vh]">
            <BounceLoader color="#36d7b7" />
        </div>
    }
    if(user){
        return children;
    }
  return <Navigate  to={'/login'}/>
//   state={location.pathname}
}

export default PrivateRoute