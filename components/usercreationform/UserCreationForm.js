import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./UserCreationForm.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import { createcontact } from "../../Services/Contact/createUser";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createUser } from "../../lib/services/UserServices/UserServices";
// import { createBank } from "../../services/UserServices/UserServices";
import Spinner from "../spinner/Spinner";
// import { createContactDetails } from "../../Services/contactDetails/createUser";
// import ErrorHandler from "../errorHandler/ErrorHandler";

const UserCreationForm = ({handleSubmit}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  
  const [age, setage] = useState("");

  const [gender, setgender] = useState("");

  const [username, setusername] = useState("");

  const [password, setpassword] = useState("");

  const [spinner,setSpinner]=useState(false)
  const handleName = (e) => {
    setname((prev) => e.target.value);
  };
  const handleEmail = (e) => {
    setemail((prev) => e.target.value);
  };
  const handleAge = (e) => {
    setage((prev) => e.target.value);
  };
  const handleGender = (e) => {
    setgender((prev) => e.target.value);
  };
  const handleUsername = (e) => {
    setusername((prev) => e.target.value);
  };
  const handlePassword = (e) => {
    setpassword((prev) => e.target.value);
  };
  const handleFormSubmit = async (e) => {
    try {
      setSpinner((prev)=>true)
      e.preventDefault();
    
      if(name.length==0||email.length==0||age.length==0||gender.length==0||username.length==0||password.length==0){
     
        throw new Error("Invalid Parameter")
      }
      
      // for(let i=0;i<bankName.length;i++){
      //   if(!((bankName[i]>="a"&& bankName[i]<="z")||(bankName[i]>="A"&& bankName[i]<="Z")))
      // {
      // throw new Error("Invalid bankNameS")
      // }    }
      
      // const response = await createContactDetails(id,bankName,contactNumber);
      const response=await createUser(name,email,age,gender,username,password)
      alert(response.data.id)
    enqueueSnackbar(`${name} Has Been Added To User List`,{variant:"success"})
    handleSubmit()
    
    //  setbankName((prev) => e.target.value);

    } catch (error) {
    enqueueSnackbar(error.message,{variant:"error"})

      // <ErrorHandler bankName={"error"} message={error}/>
      
    }
    finally{
      setSpinner((prev)=>false)
      setname((prev)=>"")
      setemail((prev)=>"")
      setage((prev)=>"")
      setgender((prev)=>"")
      setusername((prev)=>"")
      setpassword((prev)=>"")
     
     
     
     
     
     
     
     
     
    }
  };
  return (
    <>
    {/* {spinner&&<Spinner/>} */}
      <SnackbarProvider autoHideDuration={4000} />
      <label className="form-title">User Registration Form</label>
      <form className="form">
      <div class="mb-3">
          <label class="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleName}
            value={name}
          />
        </div> <div class="mb-3">
          <label class="form-label">
           Email
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleEmail}
            value={email}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
           Age
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleAge}
            value={age}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
           Gender
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleGender}
            value={gender}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
           UserName
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleUsername}
            value={username}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">
           password
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handlePassword}
            value={password}
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

export default UserCreationForm;
