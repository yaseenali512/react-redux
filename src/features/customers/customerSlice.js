// const initialStateCustomer = {
//   fullName: "",
//   address: "",
//   createdAt: "",
// };

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         address: action.payload.address,
//         createdAt: action.payload.createdAt,
//       };

//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, address) {
//   return {
//     type: "customer/create",
//     payload: { fullName, address, createdAt: new Date().toISOString() },
//   };
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  address: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, address) {
        return {
          payload: {
            fullName,
            address,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.address = action.payload.address;
        state.createdAt = action.payload.createdAt;
      },
    },
  },
});

export const { createCustomer } = customerSlice.actions;
export default customerSlice.reducer;
