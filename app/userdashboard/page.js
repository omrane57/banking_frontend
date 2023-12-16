'use client'
import React, { useEffect, useState } from "react";

// import Table from "../../shared/Table";
// import { Pagination, Spinner } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../components/navbar/Navbar";
// import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {GetAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import CreateContactForm from "../../shared/createContactForm/CreateForm";
// import { deleteContact, updateContact } from "../../Services/Contact/createUser";
import { enqueueSnackbar } from "notistack";
import { authorize, deleteUser, getAllUser, updateUser,  } from "../../lib/services/UserServices/UserServices";
import Table from "../../components/table/Table";
import UserCreationForm from "../../components/usercreationform/UserCreationForm";
import { userNetworth } from "../../lib/services/AccountServices/Account";
// import CreateContactDetailsForm from "../../shared/createContactDetails/CreateForm";
// import { getAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import { deleteContactDetails, updateContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
const UserDashboard = () => {
 
  const [isReset,setIsReset]=useState(false)
  const [flag,setflag]=useState(false)
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
//   const [usernames, setUsernames] = useState();
  const [name, setName] = useState();
  const [age, setage] = useState();
  const [gender, setgender] = useState();
  const [email, setemail] = useState();

  const [username, setusername] = useState();


//   const [contactNumber, setcontactNumber] = useState();
  const [nameForFilter,setNameForFilter]=useState("")
  const [ageForFilter,setageForFilter]=useState("")
  const [genderForFilter,setgenderForFilter]=useState("")
  const [usernameForFilter,setusernameForFilter]=useState("")
  const [networthForFilter,setnetworthForFilter]=useState("")

//   const [contactNumberForFilter,setcontactNumberForFilters]=useState("")

  const [id, setid] = useState();
//   const [spinner,setSpinner]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isLogin, setIsLogin] = useState(false);
  const handleUnAuthorize = async () => {
    const response = await authorize();
    setIsLogin(response.data.result);
  };
  useEffect(() => {
    handleUnAuthorize();
  }, []);
  useEffect(() => {
    if (isLogin) handleSubmit();
  }, [limit, page, isLogin,isReset]);
 

  const handlename = (e) => {
    setName(e.target.value);
  };
  const handleage = (e) => {
    setage(e.target.value);
  };
  const handlegender = (e) => {
    setgender(e.target.value);
  };
   const handleusername = (e) => {
    setusername(e.target.value);
  };
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
//   const handlecontactNumber = (e) => {
//     setcontactNumber(e.target.value);
//   };
const handleUserNetWorth = async (data) => {
  try {
  //   setSpinner((Prev)=>true)

  const response = await userNetworth(id)
  if(response){
    console.log(response.data)
   alert(response.data[0].net_worth)
    
    handleSubmit()
    
    
  }
  } catch (error) {
      enqueueSnackbar(error.message,{variant:"error"})
  //   <ErrorHandler bankName={"error"} message={error}/>
  }
  finally{
   
  //  setSpinner((prev)=>false)
  }
};
  const updateParticularContact = async () => {
    try {
    //   setSpinner((Prev)=>true)
    const object = {
  
      name:name,
      email:email,
      age:age,
      gender:gender
     
    };
    // const response = await updateBank(object, id);
    const response=await updateUser(object,id)
    if(response.data=="User Updated"){
     
      
      handleSubmit()
      handleClose();
      
    }
    } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
    //   <ErrorHandler name={"error"} message={error}/>
    }
    finally{
    //  setSpinner((prev)=>false)
    }
  };

  const handleUserUpdate = (data) => {
    
    setName((prev) => data.name);
    setage((prev) => data.age);
    setgender((prev) => data.gender);
    setemail((prev) => data.email);

    // setcontactNumber((prev) => data.contactNumber);
    setid((prev) => data.id);
    setData((prev)=>data)

    // Navigate('/updateUser/${d.id}')
  };
  const handleUserdelete=async(data)=>{
   
   
   console.log(data.id)
    const response=await deleteUser(data.id)
    if(response.status==200){
      alert("User Deleted Successfully")
      handleSubmit()
    } 
  }
  // const handleSubmit = async () => {
  //   // e.preventDefault();
  //   const response = await GetAllContact(limit,page)

  //   setCount((prev) => response?.headers["x-total-count"]);

  //   // setData(response.data)
  //   setData((prev) => response.data);
  // };
  if (!isLogin) {
    return (
      <h1>
        <a href="/">Please Login</a>
      </h1>
    );
  }
  const handleSubmit = async () => {
  try {
    let filterObject
    if(flag){
      
      // if(nameForFilter.length==0){
      //   throw new Error("Invalid Filter Options")
      // }
  
    filterObject = {
      name:nameForFilter,
      age:ageForFilter,
      gender:genderForFilter,
      username:usernameForFilter,
      limit: limit,
      page: page,
    };
}
else{
    filterObject={
        limit: limit,
          page: page,
    }
}

    const response =await getAllUser(filterObject)
    console.log(response);
    setData((prev) => response.data);
    setCount((prev) => response?.headers["x-total-count"]);
  } catch (error) {
 enqueueSnackbar(error.message,{variant:"error"})
  }
  finally{
    if(flag){
      setflag((prev)=>false)
    }
  }
  };
//   const handleView=async(data)=>{
//    console.log("hello")
//     navigate(`/allContactDetails`)
//   }
  const handleReset=async()=>{
    setIsReset((prev)=>!prev)
    setageForFilter((prev)=>"")
   setgenderForFilter((prev)=>"") 
    setusernameForFilter((prev)=>"")
    setNameForFilter((prev)=>"")
    handleSubmit()
  }
  return (
    <>
    {/* {spinner&&<Spinner/>} */}
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 Name
                </label>
                <input
                  type="text"
                  value={name}
                  class="form-control"
                  onChange={handlename}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 email
                </label>
                <input
                  type="text"
                  value={email}
                  class="form-control"
                  onChange={handleEmail}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 Age
                </label>
                <input
                  type="text"
                  value={age}
                  class="form-control"
                  onChange={handleage}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  class="form-control"
                  onChange={handlegender}
                />
              </div>
             
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateParticularContact}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    
      <NavbarShared username={localStorage.getItem("username")} reset={true}  />
      <UserCreationForm  handleSubmit={handleSubmit} />
     
      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      <form style={{display:"flex", justifyItems:"center" ,marginLeft:"30rem",marginBottom:"5rem",color:"rgb(85, 174, 194)"}}>
        <label  value={nameForFilter}>Name</label>
        <input type="text"  onChange={(e) => {
           setNameForFilter(e.target.value)
          }} />
         <label  value={ageForFilter}>Age</label>
        <input type="text"  onChange={(e) => {
           setageForFilter(e.target.value)
          }} />  
           <label  value={genderForFilter}>Gender</label>
        <input type="text"  onChange={(e) => {
           setgenderForFilter(e.target.value)
          }} />  
           <label  value={usernameForFilter}>username</label>
        <input type="text"  onChange={(e) => {
           setusernameForFilter(e.target.value)
          }} /> 

        <br/>
      
        <button type="button" class="btn btn-success"   onClick={(e) => {
            setPage((prev) => 1);
            setflag((prev)=>true)
            handleSubmit();
          }}>Submit</button>
        <button type="button" class="btn btn-info" onClick={handleReset}>Reset</button>

      </form>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        setShow={setShow}
       
        update={true}
        deleteUser={true}
        updateFunction={handleUserUpdate}
        handleUserUpdate={handleUserUpdate}
        handleUserdelete={handleUserdelete}
        networth={true}
        handleUserNetWorth={handleUserNetWorth}
      />
    </>
  );
};

export default UserDashboard;
