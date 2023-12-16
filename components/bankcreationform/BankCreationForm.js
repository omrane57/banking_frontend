import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./BankCreationForm.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { createcontact } from "../../Services/Contact/createUser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createBank } from "../../lib/services/UserServices/UserServices";
import Spinner from "../spinner/Spinner";
// import { createContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../errorHandler/ErrorHandler";

const BankCreationForm = ({handleSubmit}) => {
  const [bankName, setbankName] = useState("");

  const [spinner,setSpinner]=useState(false)
  const handlebankName = (e) => {
    setbankName((prev) => e.target.value);
  };
 
  const handleFormSubmit = async (e) => {
    try {
      setSpinner((prev)=>true)
      e.preventDefault();
    
      if(bankName.length==0){
     
        throw new Error("Invalid bankName")
      }
      
      // for(let i=0;i<bankName.length;i++){
      //   if(!((bankName[i]>="a"&& bankName[i]<="z")||(bankName[i]>="A"&& bankName[i]<="Z")))
      // {
      // throw new Error("Invalid bankNameS")
      // }    }
      
      // const response = await createContactDetails(id,bankName,contactNumber);
      const response=await createBank(bankName)
      alert(response.data.id)
    enqueueSnackbar(`Bank ${bankName} Has Been Added To Bank List`,{variant:"success"})
    handleSubmit()
    
    //  setbankName((prev) => e.target.value);

    } catch (error) {
    enqueueSnackbar(error.message,{variant:"error"})

      // <ErrorHandler bankName={"error"} message={error}/>
      
    }
    finally{
      setSpinner((prev)=>false)
      setbankName((prev)=>"")
    }
  };
  return (
    <>
    {spinner&&<Spinner/>}
      <SnackbarProvider autoHideDuration={4000} />
      <label className="form-title">Bank Registration Form</label>
      <form className="form">
        <div class="mb-3">
          <label class="form-label">
           Bank Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handlebankName}
            value={bankName}
          />
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

export default BankCreationForm;
