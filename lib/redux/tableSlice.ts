import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for your state
interface TableState {
  sheetTable: (string | number)[][];
  createdTable: (string | number)[][];
  token:string
}


const initialState: TableState = {
  sheetTable: [],
  createdTable: [],
  token:""
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    // Action to update the entire sheetTable
    setSheet: (state, action: PayloadAction<(string | number)[][]>) => {
      state.sheetTable = action.payload;
    },

    // Action to update the entire createdTable
    setTable: (state, action: PayloadAction<(string | number)[][]>) => {
      state.createdTable = action.payload;
    },
    // Action to set the token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // Action to clear the token
    clearToken: (state) => {
      state.token = "";
    },

    
  },
});

// Export actions and reducer
export const {
  setSheet,
  setTable,
  setToken,
  clearToken
} = tableSlice.actions;

export default tableSlice.reducer;
