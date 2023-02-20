import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
 theme:null
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    darkHandler(State,action)

   {

    State.theme=document.body.style.background=action.payload;
   },
   lighthandler(State,action)

   {

    State.theme=document.body.style.background=action.payload;
   }
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;