import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useState} from 'react';

import classes from './Header.module.css';
import { authActions } from './store/auth-slice';
import { themeActions } from './store/Theme-slice';

const Header = () => {
  const dispatch = useDispatch();
  const history =useHistory();

const totalSpent=useSelector((state)=>state.expense.totalSpent);
const expense = useSelector((State) => State.expense.expense);

const isLoggedIn = useSelector((State) => State.auth.isLoggedIn);

const [Toggle,setToggle]=useState(false);
const [dark,setDark]=useState(true);

  const logouthandler=()=>
{
    dispatch(authActions.logout())
    history.replace("./");
}

const changestylehandler=()=>
{
setToggle((prevstate)=>!prevstate);
}
const switchThemeHandler = () => {
  setDark((prevState) => !prevState);

  if (dark) {
    dispatch(themeActions.darkHandler("black"));
  } else {
    dispatch(themeActions.lighthandler("grey"));
  }
};
const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);

  const clickEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvent);
  a.remove();
};
const downloadExpenseHandler = () => {
  console.log(expense);

  const heading = ["SpendMoney,Description,Category"];

  let userCsv = expense.reduce((newArr, exp) => {
    const {SpendMoney, Description, Category } = exp;
    newArr.push([SpendMoney, Description, Category].join(","));
    return newArr;
  }, []);

  downloadFile({
    data: [...heading, ...userCsv].join("\n"),
    fileName: "expenses.csv",
    fileType: "text/csv",
  });
};
  return (
    <header className={classes.header}>
      <h1>Expense Tracker</h1>
     
        <nav>
          <ul>
        
            <li>
            {isLoggedIn&&(<button onClick={logouthandler}>Logout</button>)}
            </li>
            
            <li>
             {totalSpent>10000 &&isLoggedIn &&( <button onClick={changestylehandler} >Active premium</button>)}
            </li>
            <li>
              {totalSpent > 10000 && isLoggedIn && Toggle && (
                <button type="submit" onClick={switchThemeHandler}>
                  {dark ? "dark button" : "light button"}
                </button>
              )}
            </li>
            <li>
              {totalSpent > 10000 && isLoggedIn && Toggle && (
                <button type="submit" onClick={downloadExpenseHandler}>
                  Download Expense
                </button>
              )}
            </li>
          </ul>
        </nav>
      
    </header>
  );
};

export default Header;