import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { expenseActions } from "./Expense-slice";

const ExpenseContext = React.createContext({
  postExpense:()=>{},
  getExpense:()=>{},
  editExpense:(exp)=>{},
  deleteExpense:(id)=>{},

});

export const ExpenseContextProvider = (props) => {
  
  const dispatch =useDispatch();
 

 

 
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
      const totalSpent=newExpense.reduce((currNumber,exp)=>{
        return currNumber+Number(exp.SpendMoney)
      },0)
      dispatch(expenseActions.addExpense({
        newExpense:newExpense,
      totalSpent:totalSpent}))

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
  

  postExpense:postExpenseHandler,
  getExpense:getExpenseHandler,
  deleteExpense:deleteexpHandler,
  editExpense:editexpenses,


};

return (
<ExpenseContext.Provider value={expensecontextVal}>
    {props.children}
</ExpenseContext.Provider>
)
}
export default ExpenseContext