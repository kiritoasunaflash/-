import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});
const { setBillList } = billStore.actions;
const getBillList = () => {
  return async (dispath) => {
    let res = await axios.get("http://localhost:4444/ka");
    dispath(setBillList(res.data));
  };
};
export { getBillList };
const billReducer = billStore.reducer;
export default billReducer;
