import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"

import axios from "axios"
import auth from "../config/firebase.config"

export const authContext = createContext()
// const axios = useAxios()


// component
const AuthProvider = ({children}) => {
  // for use state
  const [user, setUser]=useState(null)
  const [loading, setLoading] = useState(true)
  const googleProvider = new GoogleAuthProvider()

  // create user with email password
    const createAccount=(email, password)=>{
      setLoading(true)
       return createUserWithEmailAndPassword(auth, email, password)
    }

    // create user with google
    const googleLogin=()=>{
      setLoading(true)
     return signInWithPopup(auth, googleProvider)
    }

    // Login Account
    const LogIn = (email, password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }

    // signOut user 
    const LogOut =()=>{
      return signOut(auth)
     }
    //  console.log(user);
    
    // set user
    useEffect(()=>{
    const unSubscribe =  onAuthStateChanged(auth, (currentuser)=>{
      const userEmail = currentuser?.email;
      const loggedUser = {email:userEmail }
      setUser(currentuser)
      setLoading(false)
      // console.log(user);
      if(currentuser){
        axios.post('https://job-hunt-server-kohl.vercel.app/api/access-token', loggedUser, {withCredentials: true})
        .then(res=> {console.log('successful access token',res)})
        .catch(error=> console.log('acces token', error))
      }
      else{
        axios.post('https://job-hunt-server-kohl.vercel.app/api/auth/logout', loggedUser, {withCredentials:true})
      .then(res=> {
        console.log(res);
        LogOut()
      })
      .catch(error => console.log(error))
      }
      
      
      })
      return ()=>{
        unSubscribe()
      }
    },[])

    

const authentications ={createAccount, LogIn, user, LogOut, loading, googleLogin}
  return (
    <authContext.Provider value={authentications}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider