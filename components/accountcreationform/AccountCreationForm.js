import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AccountCreationForm.css";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { createcontact } from "../../Services/Contact/createUser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createBank, getAllBank } from "../../lib/services/UserServices/UserServices";
import { createAccount } from "../../lib/services/AccountServices/Account";
import DropdownBank from "../BankDropDown/BankDropDown";
import Spinner from "../spinner/Spinner";
// import Spinner from "../spinner/Spinner";
// import { createContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../errorHandler/ErrorHandler";
const AccountCreationForm = ({handleSubmit}) => {
const [data1,setData1]=useState([])
const [spinner,setSpinner]=useState(false)
  
  // const [bankName, setbankName] = useState("");
  const [bankId,setBankId]=useState()
  const [bankName,setBankName]=useState()
  useEffect(() => {
    handleBankSubmit();
  }, []);
  const handleBankSubmit=async()=>{
   
     const response=await getAllBank()

      setData1((prev)=>response.data)
      console.log(response);
  }
  // const [spinner,setSpinner]=useState(false)
  // const handleSelect=(e)=>{
  //   if(e.target.value=1){
  //    setBankId((prev)=>"f6b5eefc-6d6b-446d-8430-34708c41cd94")
  //   }
  //   if(e.target.value=2){
  //    setBankId((prev)=>"a4aab862-e225-47a9-a92d-f76752686afb")

      
  //   }if(e.target.value=3){
  //    setBankId((prev)=>"3c7fb1a2-5772-4f0c-b6c9-0107abc2e816")

      
  //   }if(e.target.value=4){
  //    setBankId((prev)=>"e3115572-1945-486a-90ff-f8864368b3b2")

      
  //   }if(e.target.value=5){
  //    setBankId((prev)=>"0da9018d-5101-4e77-b180-bcc6c4a902cb")

      
  //   }
  // }
 
 
  const handleFormSubmit = async (e) => {
    try {
      setSpinner((prev)=>true)
      e.preventDefault();
    
     
      
      // for(let i=0;i<bankName.length;i++){
      //   if(!((bankName[i]>="a"&& bankName[i]<="z")||(bankName[i]>="A"&& bankName[i]<="Z")))
      // {
      // throw new Error("Invalid bankNameS")
      // }    }
      
      // const response = await createContactDetails(id,bankName,contactNumber);
      const response=await createAccount(localStorage.getItem("id"),bankName)
      alert(response.data.id)
    enqueueSnackbar(`Account of username ${localStorage.getItem("username")} Has Been Added To Bank List`,{variant:"success"})
    handleSubmit()
    
    //  setbankName((prev) => e.target.value);

    } catch (error) {
    enqueueSnackbar(error.message,{variant:"error"})

      // <ErrorHandler bankName={"error"} message={error}/>
      
    }
    finally{
      setSpinner((prev)=>false)
      // setbankName((prev)=>"")
    }
  };
  const onBankSelect=async(value)=>{
    setBankName((prev)=>value)
  }
  return (
    <>
    {spinner&&<Spinner/>}
      <SnackbarProvider autoHideDuration={4000} />
      <label className="form-title">Account Registration Form</label>
      <form className="form">
        <div class="mb-3">
          <label class="form-label">
           Bank Name
          </label>
          {/* <select  onClick={handleSelect}class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1"  >State Bank Of India</option>
  <option value="2">Bank Of Maharashtra</option>
  <option value="3">Axis Bank</option>
  <option value="4">Bank Of Baroda</option>
  <option value="5">Punjab National Bank</option>



 
</select> */}
<DropdownBank data={data1} onSelect={onBankSelect}/>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AccountCreationForm;
