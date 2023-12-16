import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarShared from '../../shared/navbar/Navbar'

const Choose = () => {
    const navigate= new useNavigate()
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
      navigate('/Bank')
        }
        else{
            navigate('/user')
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
