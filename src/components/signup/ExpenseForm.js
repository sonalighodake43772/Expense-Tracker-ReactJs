import { useState, } from "react";
import { useHistory } from "react-router-dom";
// import { useContext } from "react";
// import ExpenseContext from "../store/Expense-context";
import { authActions } from "../store/auth-slice";
import { useDispatch } from "react-redux";
import classes from './ExpenseForm.module.css'

const ExpenseForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
 const [isLogin, setIsLogin] = useState(true)

  // const expCtx=useContext(ExpenseContext)
  const dispatch=useDispatch();
  //const [isLoading,setIsLoading]=useState(false)
   
  const history=useHistory()
  
  const emailHandler = (e) => {
    setEmail(e.target.value)
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };

  const confirmPasswordHandle = (e) => {
    setConfirmPassword(e.target.value)
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   
        //setIsLoading(true)

    if (
      password.length >= 6 &&
      confirmPassword.length >= 6 &&
      password === confirmPassword
    ) {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgUOqeNyJVmp0BGn8K4bpRLeN4pcRNwPk";
      }

       fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        Headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          //setIsLoading(false)
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if (data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          if(isLogin){
          console.log(data.idToken);
          const regex = /[.@]/g;                          
          const emailId = data.email.replace(regex, "")
          // expCtx.login(data.idToken,emailId)
          dispatch(authActions.login({emailId:emailId,token:data.idToken}));
          //  history.replace('/DummyScreen')
          //  history.replace('/EmailVerification')
           history.replace("/Expenses");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }else{
      if(password!==confirmPassword){
        alert("password and confirm password did not match")
      }
      else if(password.length<=8 && confirmPassword.length<=8){
        alert('please enter atleast 6 digit')
      }
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");

  };
  const forgetpass=()=>
  {
    history.replace("./ForgotPassword")
  }

  const switchAuthHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
          <h1>{isLogin ? "Login" : "sign up"}</h1>
        <div className={classes.control}>
         <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={emailHandler}
            value={email}
            required
          />
          
          <input 
            type="text"
            id="password"
            placeholder="Password"
            onChange={passwordHandler}
            value={password}
            required
          />
           
         <input
            type="password"
            id="Confirm password"
            placeholder="Confirm Password"
            onChange={confirmPasswordHandle}
            value={confirmPassword}
            required
          />
        </div>
        
        <div>
        <button className={classes.button} type="submit">{isLogin ? "Login" : "Sign up"}</button><br/>
        <button className={classes.button} onClick={forgetpass}>ForgotPassword</button>
        {/* {isLoading && <p>sending request...</p>} */}
        <h4 type="button" onClick={switchAuthHandler}>
          {isLogin
            ? "Don't have an account?sign up"
            : "already have an account? login"}
        </h4>
        </div>
       
      </form>
    </section>
  );
};

export default ExpenseForm;
