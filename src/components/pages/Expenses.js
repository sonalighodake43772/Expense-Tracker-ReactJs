import React, { Fragment, useEffect, useState,useContext } from "react";
import ExpenseContext from "../store/Expense-context";
const Expenses=()=>
{
    const [SpendMoney,setSpendMoney]=useState("");
    const [Description,setDescription]=useState("");
    const [Category,setCategory]=useState("");
    // const [expense,setExpense]=useState([]);

    const expCtx=useContext(ExpenseContext);

    const MoneyHandler=(e)=>
    {
        setSpendMoney(e.target.value);
    }

    const catHandler=(e)=>
    {
        setCategory(e.target.value);
    }
    const desHandler=(e)=>
    {
        setDescription(e.target.value);
    }
const submitHandler=async(e)=>
{
    e.preventDefault();
   const exp={
    SpendMoney:   SpendMoney,
    Description:Description,
    Category:Category

   }
    
   expCtx.postExpense(exp);
           
}
const deleteHandler=(expID)=>{
    expCtx.deleteExpense(expID);

}
const editHandler=(exp)=>{
    setSpendMoney(exp.SpendMoney);
    setDescription(exp.Description);
    setCategory(exp.Category);

    expCtx.editExpense(exp);
    console.log(exp);
}
 
    return(
        <Fragment>
        <form onSubmit={submitHandler}>
            <h2>Daily Expenses</h2>
            <input
            type="number"
            id="number"
            placeholder="enter expense"
            onChange={MoneyHandler}
            value={SpendMoney}
            required
            />
             <input
            type="text"
            id="text"
            placeholder="enter description"
            onChange={desHandler}
            value={Description}
            required
            />
            <select value={Category} onChange={catHandler}>
                <option>select</option>
                <option value="rent">Rent</option>
                <option value="Grocery">Grocery</option>
                <option value="investment">investment</option>
                <option value="food">Food</option>

            </select>
            <button type="submit">submit</button>
        </form>
        <ul>
            {expCtx.expenses.map((exp)=>(
               <li key={exp.SpendMoney+exp.Description}>
                SpendMoney:{exp.SpendMoney},
               Description;{exp.Description},
               Category:{exp.Category}
             
            <button onClick={editHandler.bind(null, exp)}>edit</button>
            <button onClick={deleteHandler.bind(null, exp.id)}>delete</button>

               </li> 

                ))

                
            }
        </ul>
        </Fragment>
    )

}
export default Expenses;