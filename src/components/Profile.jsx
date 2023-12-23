import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import useAuth from "../hooks/useAuth"

const Profile = () => {
    const [state, setState] = useState(false)
    const {LogOut, user}= useAuth()
    const profileRef = useRef()

    useEffect(() => {
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [user])
    

  const handleLogOut=()=>{
    LogOut()
      .then(()=>{
        toast.success('logout seccessfull');
        console.log('logout');
      })
      .catch(error =>{
        toast.error(error.message);
      })
  }
    
  return (
    <div className={`relative mb-8 md:mb-0`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                    onClick={() => setState(!state)}
                >
                    <img
                        src={user.photoURL}
                        className="w-full h-full rounded-full"
                    />
                </button>
                <div className="">
                    <span className="block">{user.displayName}</span>
                    <span className="block text-sm text-gray-500">{user.email}</span>
                </div>
            </div>
            <ul className={`bg-white z-50 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                        <li className="cursor-pointer">
                            <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                                Dashboard
                            </a>
                        </li>
                        <li className="cursor-pointer">
                            <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                                Settings
                            </a>
                        </li>
                        <li onClick={handleLogOut} className="cursor-pointer">
                            <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                                Log Out
                            </a>
                        </li>
            </ul>
        </div>
  )
}

export default Profile