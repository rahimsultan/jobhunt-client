import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';



const Navbar = () => {

  const [state, setState] = useState(false)
  const {LogOut, user}= useAuth()

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

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "Home", path: "/" },
      { title: "Add Job", path: "/add-job" },
      { title: "My Posted Job", path: "/my-posted-job" },
      { title: "My Bids", path: "/my-bids" },
      { title: "Bid Requests", path: "/bid-requests" },
  ]

  return (
      <nav  className="bg-white w-full mx-auto top-0 z-20">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
              <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                    <Link to="/">
                        <img
                            src="https://i.ibb.co/YcZCZ3x/jobhunt.png" 
                            width={120} 
                            height={50}
                            alt="Float UI logo"
                        />
                    </Link>
                  <div className="lg:hidden">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          onClick={() => setState(!state)}
                      >
                          {
                              state ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                              )
                          }
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-between items-center flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${ state ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
                    <div>
                        <ul className="flex items-center gap-5 md:gap-3 flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                            {
                                user ? <Profile/> :
                                <li className=" lg:mt-0">
                                <Link to={"/login"}  className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline">
                                Log In
                                </Link>
                                </li>
                            }
                            
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className="text-gray-600 hover:text-indigo-600 ">
                                            <NavLink to={item.path} >
                                                { item.title }
                                            </NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
              </div>
          </div>
      </nav>
  )
}

export default Navbar