import axios from "axios"
export  const  login=async(username,password)=>{
  
   const response=await axios.post(`http://127.0.0.1:20200/api/v1/login`,{username:username,password:password})
   console.log(response)
   return response
}
export  const  logout=async()=>{
    const response=await axios.post(`http://127.0.0.1:20200/api/v1/logout`)
    return response
 }
 export const resetUser = async (oldPassword,newPassword,username) => {
   
   
    const response = await axios.post(
      `http://127.0.0.1:20200/api/v1/reset`,{oldPassword:oldPassword,newPassword:newPassword,username:username},
      {
        headers: { auth: localStorage.getItem("auth") },
      }
    );
  
    return response;
  }
//   export const createBank = async (bankName) => {

//    alert(bankName)
//     const response = await axios.post(
//       `http://127.0.0.1:20200/api/v1/bank`,{bankName:bankName},
//       {
//         headers: { auth: localStorage.getItem("auth") },
//       }
//     );
  
//     return response;
//   }
  export const createBank=async(bankName)=>{
 let response
  
       response=await axios.post(`http://127.0.0.1:20200/api/v1/bank`,{bankName:bankName},  {
        headers: { auth: localStorage.getItem("auth") },
      })
   
   
 return response
 
 }
 export const getAllBank=async(filterObject)=>{
    let response
     
          response=await axios.get(`http://127.0.0.1:20200/api/v1/bank`, {
           headers: { auth: localStorage.getItem("auth") },
           params: filterObject,
         })
      
      
    return response
    
    }
    export const authorize=async()=>{
        let response
         response=await axios.post(`http://127.0.0.1:20200/api/v1/lock`,{username:localStorage.getItem("username")},{
            headers: { auth: localStorage.getItem("auth") }})
           return response
    }
    export const updateBank = async (userObject, id) => {
        console.log(id, "...............");
        console.log(userObject, "...................");
        const response = await axios.put(
          `http://127.0.0.1:20200/api/v1/bank/${id}`,
          {
            newValue: userObject.newValue,
            
          },
          {
            headers: { auth: localStorage.getItem("auth") },
          }
        );
      
        return response;
      };
      export const createUser=async(name,email,age,gender,username,password)=>{
        let response
         
              response=await axios.post(`http://127.0.0.1:20200/api/v1/user`,{name:name,email:email,age:age,gender:gender,username:username,password:password},  {
               headers: { auth: localStorage.getItem("auth") },
             })
          
          
        return response
        
        }
        export const getAllUser=async(filterObject)=>{
          let response
           
                response=await axios.get(`http://127.0.0.1:20200/api/v1/user`, {
                 headers: { auth: localStorage.getItem("auth") },
                 params:filterObject
               })
            
            
          return response
          
          }  
          export const updateUser = async (userObject, id) => {
            console.log(id, "...............");
            console.log(userObject, "...................");
            const response = await axios.put(
              `http://127.0.0.1:20200/api/v1/user/${id}`,
             userObject,
              {
                headers: { auth: localStorage.getItem("auth") },
              }
            );
          
            return response;
          };
          export const deleteUser = async (id) => {
          
            const response = await axios.delete(
              `http://127.0.0.1:20200/api/v1/user/${id}`,
              {
                headers: { auth: localStorage.getItem("auth") },
              }
            );
          
            return response;
          };
          export const deleteBank = async (id) => {
          
            const response = await axios.delete(
              `http://127.0.0.1:20200/api/v1/Bank/${id}`,
              {
                headers: { auth: localStorage.getItem("auth") },
              }
            );
          
            return response;
          };
          export const otpToEmail=async(recipient_email,OTP)=>{
            let response
             
                  response=await axios.post(`http://127.0.0.1:20200/api/v1/forget`,{recipient_email:recipient_email,OTP:OTP},  {
                   headers: { auth: localStorage.getItem("auth") },
                 })
              
              
            return response
            
            }
            export const resetUserforForgetPassword = async (newPassword,username) => {
   
   
              const response = await axios.post(
                `http://127.0.0.1:20200/api/v1/resetPasswordForForgetPassword`,{newPassword:newPassword,username:username},
                {
                  headers: { auth: localStorage.getItem("auth") },
                }
              );
            
              return response;
            }
            export const getUserByUserName=async(username)=>{
          
              let response
              
                    response=await axios.get(`http://127.0.0.1:20200/api/v1/user/username`,{username:username},{
                     headers: { auth: localStorage.getItem("auth") },
                   
                   })
                
                console.log(response)
              return response
              
              } 