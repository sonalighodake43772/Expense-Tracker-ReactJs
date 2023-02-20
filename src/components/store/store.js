import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import expenseReducer from './Expense-slice';


const store = configureStore({
  reducer: {  auth: authReducer,
    expense:expenseReducer
   },
});

export default store;