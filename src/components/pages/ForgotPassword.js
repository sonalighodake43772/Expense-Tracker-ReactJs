import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
const ForgotPassword=()=>
{

const history=useHistory();
const [email,setEmail]=useState("");
const [isLoading,setIsLoading]=useState(false);
const emailHandler=(e)=>
{
    setEmail(e.target.value);

}
const passwrdHandler=async(e)=>
{
    e.preventDefault();
    setIsLoading(true);
    const ResetPass=await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
        {
            method:"POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email,
            }),
            headers:
            {
                "Content-Type":"application/json",
            }
        }

    )
    const res=  await ResetPass.json();
    setIsLoading(false);
    if(ResetPass.ok)
    {
        console.log(res);
        

    }
    else{
        alert(res.error.message);
    }
}
const backToLoginHandler=()=>
{
    history.replace("/");
}
return(
    <Fragment>
        <form onSubmit={passwrdHandler}>
            <p>entered email with which you have registered?</p>
            <input
           type="email"
           id="email"
           placeholder="email"
           onChange={emailHandler}
           value={email}
           required

            
            />
   {!isLoading&& <button>send link</button>}
   <p type="button" onClick={backToLoginHandler}>
          already a user? Login
        </p>
        {isLoading && <p>Sending request...</p>}

        </form>
    </Fragment>
)
}
export default ForgotPassword;