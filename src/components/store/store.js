import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import expenseReducer from './Expense-slice';
import ThemeReducer from './Theme-slice';


const store = configureStore({
  reducer: {  auth: authReducer,
    expense:expenseReducer,
    theme:ThemeReducer
   },
});

export default store;