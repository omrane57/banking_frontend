'use client'
import React, { useEffect, useState } from "react";

// import Table from "../../shared/Table";
// import { Pagination, Spinner } from "react-bootstrap";
// import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../components/navbar/Navbar";
// import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {GetAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import CreateContactForm from "../../shared/createContactForm/CreateForm";
// import { deleteContact, updateContact } from "../../Services/Contact/createUser";
import { enqueueSnackbar } from "notistack";
import { authorize, deleteBank, getAllBank, updateBank } from "../../lib/services/UserServices/UserServices";
import Table from "../../components/table/Table";
import AccountCreationForm from "../../components/accountcreationform/AccountCreationForm";
import { deleteAccount, deposite, getAllAccount, transfer, withDraw } from "../../lib/services/AccountServices/Account";
import { useRouter } from "next/navigation";
// import CreateContactDetailsForm from "../../shared/createContactDetails/CreateForm";
// import { getAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import { deleteContactDetails, updateContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
const AccountDashBoard = () => {
  const router=useRouter()
  const [isReset,setIsReset]=useState(false)
  const [flag,setflag]=useState(false)
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);

  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [showForWithDraw, setshowForWithDraw] = useState(false);
  const [showForTransfer, setshowForTransfer] = useState(false);
  const [receiverId,setReceiverId]=useState("")

//   const [usernames, setUsernames] = useState();
  const [bankName, setBankName] = useState();
  const [amount, setamount] = useState();

//   const [contactNumber, setcontactNumber] = useState();
  const [bankNameForFilter,setBankNameForFilter]=useState("")
//   const [contactNumberForFilter,setcontactNumberForFilters]=useState("")

  const [id, setid] = useState();
//   const [spinner,setSpinner]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseForwithDraw = () =>{setshowForWithDraw(false);}
  const handleCloseForTransfer = () =>{handleSubmit() ;setshowForTransfer(false);}

  const handleShowForwithDraw = () => setshowForWithDraw(true);
  const [flags, setFlags] = useState(0);

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
 

  const handleAmount = (e) => {
    setamount(e.target.value);
  };
  const handleReceiverId = (e) => {
    setReceiverId(e.target.value);
  };
//   const handlecontactNumber = (e) => {
//     setcontactNumber(e.target.value);
//   };
  const handleDeposite = async () => {
    try {
    //   setSpinner((Prev)=>true)
 
    const response = await deposite(localStorage.getItem("id"),data.id,parseInt(amount))
    if(response){
     
      
      handleSubmit()
      handleClose();
      
    }
    } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
    //   <ErrorHandler bankName={"error"} message={error}/>
    }
    finally{
      setFlags((prev)=>0)
    //  setSpinner((prev)=>false)
    }
  };
  const handleWithDraw = async () => {
    try {
    //   setSpinner((Prev)=>true)
 
    const response = await withDraw(localStorage.getItem("id"),data.id,parseInt(amount))
    if(response){
     
      
      handleSubmit()
      handleCloseForwithDraw();
      
    }
    } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
    //   <ErrorHandler bankName={"error"} message={error}/>
    }
    finally{
      setFlags((prev)=>0)
    //  setSpinner((prev)=>false)
    }
  };
  const handleTransfer = async () => {
    try {
    //   setSpinner((Prev)=>true)
 
    const response = await transfer(localStorage.getItem("id"),data.id,parseInt(amount),receiverId)
    if(response){
     
      
      handleSubmit()
      handleCloseForTransfer();
      
    }
    } catch (error) {
        enqueueSnackbar(error.message,{variant:"error"})
    //   <ErrorHandler bankName={"error"} message={error}/>
    }
    finally{
      setFlags((prev)=>0)
    //  setSpinner((prev)=>false)
    }
  };
  const handleUserUpdate = (data) => {
    setid((prev) => data.id);
    setData((prev)=>data)
    
      setBankName((prev) => data.bankName);
      // setcontactNumber((prev) => data.contactNumber);
     
      
 

  
    // Navigate('/updateUser/${d.id}')
  };
 
  const handleUserdelete=async(data)=>{
   
   
   console.log(data.id)
    // const response=await deleteContactDetails(data.id)
     const response=await deleteAccount(localStorage.getItem("id"),data.id)
      //  const response=await deleteBank(data.id)
    if(response.status==200){
      alert("Account Deleted Successfully")
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
      
      if(bankNameForFilter.length==0){
        throw new Error("Invalid Filter Options")
      }
  
    filterObject = {
      bankName:bankNameForFilter,
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

    const response =await getAllAccount(filterObject,localStorage.getItem("id"))
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
  const handlePassbook=async(data)=>{
   alert("hello")
    // navigate(`/allContactDetails`)
  router.push(`/transaction/${data.id}`)

  }
  const handleReset=()=>{
    setIsReset((prev)=>!prev)
    setBankNameForFilter((prev)=>"")
  
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
                 Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  class="form-control"
                  onChange={handleAmount}
                />
              </div>
             
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDeposite}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showForWithDraw} onHide={handleCloseForwithDraw}>
          <Modal.Header closeButton>
            <Modal.Title>Update Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  class="form-control"
                  onChange={handleAmount}
                />
              </div>
             
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForwithDraw}>
              Close
            </Button>
            <Button variant="primary" onClick={handleWithDraw}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={showForTransfer} onHide={handleCloseForTransfer}>
          <Modal.Header closeButton>
            <Modal.Title>Money Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  class="form-control"
                  onChange={handleAmount}
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                 ReceiverId
                </label>
                <input
                  type="text"
                  value={receiverId}
                  class="form-control"
                  onChange={handleReceiverId}
                />
              </div>
             
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForTransfer}>
              Close
            </Button>
            <Button variant="primary" onClick={handleTransfer}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <NavbarShared username={localStorage.getItem("username")} reset={true}  />
      <AccountCreationForm  handleSubmit={handleSubmit} />
     
      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      <form style={{display:"flex", justifyItems:"center" ,marginLeft:"30rem",marginBottom:"5rem",color:"rgb(85, 174, 194)"}}>
        <label  value={bankNameForFilter}>Bank Name</label>
        <input type="text"  onChange={(e) => {
           setBankNameForFilter(e.target.value)
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
       
         setFlags={setFlags}
        deleteUser={true}
        deposite={true}
        withDraw={true}
        updateFunction={handleUserUpdate}
        handleUserUpdate={handleUserUpdate}
        handleUserdelete={handleUserdelete}
        setshowForWithDraw={setshowForWithDraw}
        setshowForTransfer={setshowForTransfer}
        transfer={true}
        passbook={true}
        handlePassbook={handlePassbook}
      />
    </>
  );
};

export default AccountDashBoard;
