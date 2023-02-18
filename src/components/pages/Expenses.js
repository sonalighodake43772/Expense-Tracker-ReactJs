import React, { Fragment, useEffect, useState } from "react";
const Expenses=()=>
{
    const [SpendMoney,setSpendMoney]=useState("");
    const [Description,setDescription]=useState("");
    const [Category,setCategory]=useState("");
    const [expense,setExpense]=useState([]);

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
    setExpense([
        ...expense,
        {
            SpendMoney:SpendMoney,
            Description:Description,
            Category:Category
        }
    ]);
    const post =await fetch(
        "https://expenses-bfa4a-default-rtdb.firebaseio.com/Expenses.json",
        {
            method:"POST",
            body:JSON.stringify({
                SpendMoney:SpendMoney,
                Description:Description,
                Category:Category,


            }),
            headers:
            {
                "Content-Type":"application/json"
            }
        }
    )
   

    const res=await post.json();
    console.log(res);
    setSpendMoney("");
    setDescription("");
    setCategory("");
}
useEffect(()=>
{
    const getrealtimedata=async()=>
    {
        const get =await fetch(
            "https://expenses-bfa4a-default-rtdb.firebaseio.com/Expenses.json",
            {
                method:"GET",
                
                headers:
                {
                    "Content-Type":"application/json"
                },
            }
        );
        const res=await get.json();
        console.log(res);
        if(get.ok)
        {
            const getexpense=Object.keys(res).map((exp)=>
            {
                return{
                    id:exp,
                    SpendMoney:res[exp].SpendMoney,
                    Description:res[exp].Description,
                    Category:res[exp].Category
                }

            });
            setExpense(getexpense);
        }
        else
        {
            alert(res.error.message);
        }
    };
        getrealtimedata();
    
},[]);
 
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
            {expense.map((exp)=>(
               <li key={exp.SpendMoney+exp.Description}>
                SpendMoney:{exp.SpendMoney},
               Description;{exp.Description},
               Category:{exp.Category}

               </li> 

                ))

                
            }
        </ul>
        </Fragment>
    )

}
export default Expenses;