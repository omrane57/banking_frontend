'use client'
import React from 'react'
import { useState } from 'react'
import NavbarShared from '../../components/navbar/Navbar'
import { useRouter } from 'next/navigation'

const Choose = () => {
    const router=useRouter()
    const [selects,setSelect]=useState("")
    const handleUser=(e)=>{
     
       setSelect((prev)=>e.target.value)
    }
    const handleBank=(e)=>{
       setSelect((prev)=>e.target.value)
        
    }
    const handleChoose=()=>{
        alert(selects)
        if(selects==1){
      router.push('/bankdashboard')
        }
        else{
          router.push('/userdashboard')

        }
        
    }
  return (
   <>
      {/* <SnackbarProvider autoHideDuration={3000}/> */}
      <NavbarShared reset={true}/>
        <div className="card text-center" >
  <h5 className="card-header">Login</h5>
  <div className="card-body">
  <select  onClick={handleUser}class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1"  >Toward Bank DashBoard</option>
  <option value="2">Toward User DashBoard</option>
 
</select>

    <br></br>
    <button type="button" className="btn btn-primary" onClick={handleChoose}>Go Ahead</button>
  </div>
</div>
   </>
  )
}

export default Choose
