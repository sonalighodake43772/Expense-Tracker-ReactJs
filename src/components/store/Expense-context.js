import React, { useEffect, useState } from "react";

const ExpenseContext = React.createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: (token,email) => {},
  logout:(token,email)=>{},

  postExpense:()=>{},
  getExpense:()=>{},
  editExpense:(exp)=>{},
  deleteExpense:(id)=>{},
expenses:null
});

export const ExpenseContextProvider = (props) => {
  const userEmail = localStorage.getItem("email");
  const [email, setEmail] = useState(userEmail);

  const intitialToken = localStorage.getItem("token");
  const [token, setToken] = useState(intitialToken);
  const[expenses,setExpense]=useState([]);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };
  const logoutHandler = (token, email) => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const postExpenseHandler=(exp)=>{
    const postExpenses=async(exp)=>{
      const post=await fetch(
       "https://expenses-bfa4a-default-rtdb.firebaseio.com/Expenses.json",
       {

        method:"POST",
        body:JSON.stringify({
          SpendMoney:exp.SpendMoney,
          Description:exp.Description,
          Category:exp.Category

        }),
        headers:
        {
          "Content-Type":"application/json",
        }
       }
      )
      const res=await post.json();
      console.log(res);
      getExpenseHandler();

    }
     postExpenses(exp);
  }
  let newExpense=[];
  const getExpenseHandler=()=>{
    const getrealtimeExpenses=async()=>
    {
      try{
      const get=await fetch( 
        "https://expenses-bfa4a-default-rtdb.firebaseio.com/Expenses.json",

        {
          method:"GET",
          headers:{
            "Content-Type":"application/json",

          }
        }
      );
      const res=await get.json();
      console.log(res);
      if(!res.ok)
      {
        newExpense=Object.keys(res).map((exp)=>{
          return{
          id:exp,
          SpendMoney:res[exp].SpendMoney,
          Description:res[exp].Description,
        Category:res[exp].Category
          }

        })
      }
        setExpense(newExpense);

      } catch(err){
      alert(err.message);
    }
  };
getrealtimeExpenses();
  }

  useEffect(()=>{
getExpenseHandler();
  },[]);
  const deleteexpHandler=(id)=>

 {
  const deleteExpenses=async(id)=>{
  try{
  
    
      const del=await fetch(
        `https://expenses-bfa4a-default-rtdb.firebaseio.com/Expenses/${id}.json`,
        {
          method:"DELETE",
          headers:
          {
            "Content-Type":"applicatin/json"
          }
        }

      )
      const res=await del.json();
      getExpenseHandler();
      console.log(res);
    
  }catch(err){
    alert(err.message);

    }
  }
    deleteExpenses(id);
    
  }
  const editexpenses=(exp)=>
  {
    deleteexpHandler(exp.id);
  }

const expensecontextVal = {
  token: token,
  email: email,
  isLoggedIn: userIsLoggedIn,
  login: loginHandler,
  logout:logoutHandler,

  postExpense:postExpenseHandler,
  getExpense:getExpenseHandler,
  deleteExpense:deleteexpHandler,
  editExpense:editexpenses,
  expenses:expenses

};

return (
<ExpenseContext.Provider value={expensecontextVal}>
    {props.children}
</ExpenseContext.Provider>
)
}
export default ExpenseContext