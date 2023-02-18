import {useContext,Fragment } from "react";
import { useHistory } from "react-router-dom";

import ExpenseContext from "../store/Expense-context";
const EmailVerification=()=>
{
    const history=useHistory();
    const expCtx=useContext(ExpenseContext);
    const idToken=expCtx.token;

    const VerificationHandler=async(e)=>
    {
        e.preventDefault();
        const verify=await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk",
            {
                method:"POST",
                body:JSON.stringify({
                    idToken:idToken,
                    requestType:"VERIFY_EMAIL",
                }),
                headers:{
                    "Content-Type":"application/json",
                }
            }
           
        );
        const res=await verify.json();
        if(verify.ok)
        {
            console.log(res);
        }
        else
        {
        alert(res.error.message);
        }

        history.replace("/DummyScreen");
    }
  



return(
    <Fragment>
    <form onSubmit={VerificationHandler}>
        <h2>verify your email</h2>
        <p>  we've sent an email to ----- to verify your email address and activate
        your expense tracker.</p>
        <button type="submit">Verify your Email</button>
    </form>
    </Fragment>
)
}
export default EmailVerification;