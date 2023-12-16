import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
// import Table from "../../shared/Table";
// import { Pagination, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import { Authorize, authorize } from "../../Services/user/Authorize";
import NavbarShared from "../../shared/navbar/Navbar";
// import CreateForm from "../../shared/createform/CreateForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {GetAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import CreateContactForm from "../../shared/createContactForm/CreateForm";
// import { deleteContact, updateContact } from "../../Services/Contact/createUser";
import { enqueueSnackbar } from "notistack";
import {
  authorize,
  deleteBank,
  getAllBank,
  updateBank,
} from "../../services/UserServices/UserServices";
import Table from "../table/Table";
import BankCreationForm from "../../shared/bankcreationform/BankCreationForm";
import {
  getAllPassbookRecord,
  passbook,
} from "../../services/AccountServices/Account";
import * as XLSX from "xlsx";
// import CreateContactDetailsForm from "../../shared/createContactDetails/CreateForm";
// import { getAllContactDetails } from "../../Services/contactDetails/ContactDetails";
// import { deleteContactDetails, updateContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../../shared/errorHandler/ErrorHandler";
const PassBook = () => {
  const navigate = new useNavigate();

  const { accountId } = useParams();
  const [isReset, setIsReset] = useState(false);
  const [flag, setflag] = useState(false);
  const [count, setCount] = useState(5);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(1);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const exportToExcel = async (data, filename) => {
    let response = await getAllPassbookRecord(
      localStorage.getItem("id"),
      accountId
    );
    console.log(response.data);
    const ws = XLSX.utils.json_to_sheet(response.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, filename);
  };
  //   const [usernames, setUsernames] = useState();
  const [bankName, setBankName] = useState();
  //   const [contactNumber, setcontactNumber] = useState();
  const [bankNameForFilter, setBankNameForFilter] = useState("");
  //   const [contactNumberForFilter,setcontactNumberForFilters]=useState("")

  const [id, setid] = useState();
  const [fromDate, setfromDate] = useState();
  // const [toDate, settoDate] = useState();
  const [toDate, setToDate] = useState();
 

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
    // handleSubmit()
  }, []);
  useEffect(() => {
    if (isLogin) handleSubmit();
  }, [limit, page, isLogin, isReset]);

  const handleToDate = (e) => {
    // console.log(e.target.value);
    setToDate((prev) => e.target.Value);
  };
  const handleFromDate = (e) => {
    setfromDate((prev) => e.target.value);
  };
  //   const handlebankName = (e) => {
  //     setBankName(e.target.value);
  //   };
  // //   const handlecontactNumber = (e) => {
  //     setcontactNumber(e.target.value);
  //   };
  // const updateParticularContact = async () => {
  //   try {
  //   //   setSpinner((Prev)=>true)
  //   const object = {

  //     newValue:bankName

  //   };
  //   const response = await updateBank(object, id);
  //   if(response.data=="Bank Updated"){

  //     handleSubmit()
  //     handleClose();

  //   }
  //   } catch (error) {
  //       enqueueSnackbar(error.message,{variant:"error"})
  //   //   <ErrorHandler bankName={"error"} message={error}/>
  //   }
  //   finally{
  //   //  setSpinner((prev)=>false)
  //   }
  // };

  // const handleUserUpdate = (data) => {
  //   setBankName((prev) => data.bankName);
  //   // setcontactNumber((prev) => data.contactNumber);
  //   setid((prev) => data.id);
  //   setShow((prev) => true);

  //   // Navigate('/updateUser/${d.id}')
  // };
  // const handleUserdelete=async(data)=>{

  //  console.log(data.id)
  //   // const response=await deleteContactDetails(data.id)
  //      const response=await deleteBank(data.id)
  //   if(response.status==200){
  //     alert("Bank Deleted Successfully")
  //     handleSubmit()
  //   }
  // }
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
    // e.preventDefault()
    // console.log(toDate, fromDate);
    try {
      let filterObject;
    console.log(flag)
    
      if(flag){
        filterObject = {
          limit: limit,
          page: page,
          toDate:toDate,
          fromDate:fromDate
        };
      }else{
        filterObject = {
          limit: limit,
          page: page,
        };
      }
    
      const response = await passbook(
        filterObject,
        localStorage.getItem("id"),
        accountId
      );
      setData((prev) => response.data);
      setCount((prev) => response?.headers["x-total-count"]);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      if (flag) {
        setflag((prev) => false);
      }
    }
  };
  //   const handleView=async(data)=>{
  //    console.log("hello")
  //     navigate(`/allContactDetails`)
  //   }
  const handleReset = () => {
    setIsReset((prev) => !prev);
    // setBankNameForFilter((prev)=>"")

    handleSubmit();
  };
  return (
    <>
      {/* {spinner&&<Spinner/>} */}
      {/* <div
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
                 Bank Name
                </label>
                <input
                  type="text"
                  value={bankName}
                  class="form-control"
                  onChange={handlebankName}
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
      </div> */}

      <NavbarShared username={localStorage.getItem("username")} reset={true} />

      <br></br>
      <label htmlFor="">{count}</label>
      <br />
      {/* <form style={{display:"flex", justifyItems:"center" ,marginLeft:"30rem",marginBottom:"5rem",color:"rgb(85, 174, 194)"}}>
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

      </form> */}
      {/* <CSVLink data={data} className="btn btn-success mb-3">Export Passbook</CSVLink> */}
      <Button
        className="btn btn-success mb-3"
        onClick={() => exportToExcel(data, "passbook.xlsx")}
      >
        {" "}
        Export Passbook To Excel File
      </Button>
      <form
        style={{
          display: "flex",
          justifyItems: "center",
          marginLeft: "30rem",
          marginBottom: "5rem",
          color: "rgb(85, 174, 194)",
        }}
      >
        <label>From Date</label>
        <input type="date" value={fromDate} onChange={handleFromDate} />
        {/* <label>ToDate</label>
        <input type="date" onChange={handleToDate} value={toDate} /> */}
        <label>To Date</label>
        <input type="date" value={toDate} onChange={(e)=>{setToDate(e.target.value)} }/>

        <br />

        <button
          type="button"
          class="btn btn-success"
          onClick={(e) => {
            e.preventDefault()
            setPage((prev) => 1);
            setflag((prev) => true);
            handleSubmit();
          }}
        >
          Submit
        </button>
        <button type="button" class="btn btn-info" onClick={handleReset}>
          Reset
        </button>
      </form>
      <Table
        data={data}
        count={count}
        limit={limit}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
      />
    </>
  );
};

export default PassBook;
