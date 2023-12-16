import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import React from 'react'
import { useState } from 'react'
import './Reset.css'
import { login, resetUserforForgetPassword } from '../../lib/services/UserServices/UserServices'
const Reset = () => {
   const router=useRouter()
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=new useNavigate()
    const handleUsernameChange=(e)=>{
         setUsername((prev)=>e.target.value)
    }
    const handlePasswordChange=(e)=>{
        setPassword((prev)=>e.target.value)
    }
    const handleForgetPassword=()=>{
      navigate('/forgetPassWord')
    }
    const handleMyLogin=async()=>{
       try {
        if(username.length==0||password.length==0){
        throw new Error("Please Fill The Form Completely")
        }
        const response=await resetUserforForgetPassword(password,username)
        if(!response){
            throw new Error("Password Not Changed")
        }
        
       router.push('/')
       
       } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
       }
       finally{

       }
    }
  return (<>
  <SnackbarProvider autoHideDuration={3000}/>
        <div className="card text-center">
  <h5 className="card-header">Reset Password</h5>
  <div className="card-body">
  <div className="input-group input-group-lg">
      <span className="input-group-text " id="inputGroup-sizing-lg" >Username</span>
      <input type="text" value={username} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handleUsernameChange}/>
    </div>
    <div className="input-group input-group-lg">
      <span className="input-group-text" id="inputGroup-sizing-lg" >New Password</span>
      <input type="password" value={password}className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={handlePasswordChange}/>
    </div>

    <br></br>
    <a className='anchorTage' onClick={handleForgetPassword}>Forget Password</a>
    <br></br>
    
    <button type="button" className="btn btn-primary"   onClick={handleMyLogin}>Login</button>
  </div>
</div>
  </>
    
    
  )
}

export default Reset
