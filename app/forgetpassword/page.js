'use client'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './OtpGenerator.css'
import { getUserByUserName, login, otpToEmail } from '../../lib/services/UserServices/UserServices'
const OtpGenerator = () => {
    const [username,setUsername]=useState("")
    const [email,setemail]=useState("")
    const [enteredOtp,setenteredOtp]=useState()
    const [generatedOtp,setgeneratedOtp]=useState()
    
    useEffect(() => {
      handleGeneratedOtp()
    }, []);

 
    const handleEmail=(e)=>{
        setemail((prev)=>e.target.value)
    }
    const handleenteredOtp=(e)=>{
      setenteredOtp((prev)=>e.target.value)
  }
  const handleGeneratedOtp=()=>{
    const OTP = Math.floor(Math.random() * 9000 + 1000);

      setgeneratedOtp((prev)=>OTP)
  }
  const handleMyGenerateOtpFunction=async()=>{
   
    // const data =await getUserByUserName(email)
  
    const response=await otpToEmail(email,generatedOtp)
    if(response.data!="Email sent succesfuly"){
     alert("Enter Valid Email Id")
    }
    alert(`OTP has Been Send To Email ${email} Successfully`)


}
const  checkOtp=(e)=>{
 try {
  if(enteredOtp!=generatedOtp){
    console.log(enteredOtp,generatedOtp)
    throw new Error("Otp Not Matched")
   }
   navigate('/reset')
 } catch (error) {
  enqueueSnackbar(error.message,{variant:"error"})
 }
  
}
    // const handleForgetPassword=()=>{
    //   navigate('/forgetPassWord')
    // }
    // const handleMyLogin=async()=>{
    //    try {
    //     if(username.length==0){
    //     throw new Error("Please Fill The Form Completely")
    //     }
    //     const response=await login(username,passwor)
    //     if(!response){
    //         throw new Error("Login Failed")
    //     }
    //     localStorage.setItem("auth",response.headers.auth)
    //     localStorage.setItem("username",response.data.username)
    //     localStorage.setItem("isAdmin",response.data.isAdmin)
    //     localStorage.setItem("id",response.data.id)
    //     if(!response){
    //         throw new Error("Authentication Failed")
    //     }
    //     if(response.data.isAdmin){
    //         navigate('/choose')
    //     }
    //     if(!response.data.isAdmin){
    //       navigate('/account')
    //     }
    //    } catch (error) {
    //     enqueueSnackbar(error.message,{variant:"error"})
    //    }
    //    finally{

    //    }
    // }
  return (<>
  <SnackbarProvider autoHideDuration={3000}/>
        <div className="card text-center">
  <h5 className="card-header">Forget Password</h5>
  <div className="card-body">
  <div className="input-group input-group-lg">
      <span className="input-group-text " id="inputGroup-sizing-lg" >Email</span>
      <input type="text" value={email} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleEmail}/>
    </div>
   
    <div className="input-group input-group-lg">
      <span className="input-group-text " id="inputGroup-sizing-lg" >OTP</span>
      <input type="text" value={enteredOtp} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleenteredOtp}/>
    </div>
   
   
    <br></br>
    
    <button type="button" className="btn btn-primary"   onClick={handleMyGenerateOtpFunction}>Generate Otp</button>
    <button type="button" className="btn btn-primary" onClick={checkOtp}  >Submit Otp</button>

  </div>
</div>
  </>
    
    
  )
}

export default OtpGenerator
