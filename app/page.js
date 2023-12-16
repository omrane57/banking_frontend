'use client'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React from 'react'
import { useState,useEffect } from 'react'
import './Login.css'
import { login } from '../lib/services/UserServices/UserServices'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner/Spinner'
import {
  authorize,
  deleteBank,
  getAllBank,
  updateBank,
} from "../lib/services/UserServices/UserServices";
export default function Home() {
  const router=useRouter()
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [spinner,setSpinner]=useState(false)
  const handleUnAuthorize = async () => {
    const response = await authorize();
    if(response.data.result){
      console.log("Yes")
      router.back()
    }
    else{
      router.push('/')
    }
  };
  useEffect(() => {
    handleUnAuthorize();
    // handleSubmit()
  }, []);
  const handleUsernameChange=(e)=>{
       setUsername((prev)=>e.target.value)
  }
  const handlePasswordChange=(e)=>{
      setPassword((prev)=>e.target.value)
  }
  const handleForgetPassword=()=>{
    // router('/forgetPassWord')
    router.push('/forgetpassword')
  }
  const handleMyLogin=async()=>{
     try {
      setSpinner((prev)=>true)
      if(username.length==0||password.length==0){
      throw new Error("Please Fill The Form Completely")
      }
      const response=await login(username,password)
      if(!response){
          throw new Error("Login Failed")
      }
      localStorage.setItem("auth",response.headers.auth)
      localStorage.setItem("username",response.data.username)
      localStorage.setItem("isAdmin",response.data.isAdmin)
      localStorage.setItem("id",response.data.id)
      if(!response){
          throw new Error("Authentication Failed")
      }
      if(response.data.isAdmin){
        router.push('/choose')
      }
      if(!response.data.isAdmin){
        router.push('/accountdashboard')
      }
     } catch (error) {
      enqueueSnackbar(error.message,{variant:"error"})
     }
     finally{
      setSpinner((prev)=>false)
       
     }
  }
  return (
  <>{
    spinner&&<Spinner/>
  }
    <SnackbarProvider autoHideDuration={3000}/>
    <div className="card bg-white rounded-lg shadow-lg text-center">
  <h5 className="text-2xl py-4">Login</h5>
  <div className="p-6">
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="input-group-text">Username</span>
        <input
          type="text"
          value={username}
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleUsernameChange}
        />
      </div>
      <div className="flex items-center">
        <span className="input-group-text">Password</span>
        <input
          type="password"
          value={password}
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handlePasswordChange}
        />
      </div>
    </div>

    <a className="text-blue-500 cursor-pointer" onClick={handleForgetPassword}>
      Forget Password
    </a>

    <button
      type="button"
      className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      onClick={handleMyLogin}
    >
      Login
    </button>
  </div>
</div>

  
  </>  )
}
