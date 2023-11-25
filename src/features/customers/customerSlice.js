const initialStateCustomer = {
  fullName: "",
  address: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        address: action.payload.address,
        createdAt: action.payload.createdAt,
      };

    default:
      return state;
  }
}

export function createCustomer(fullName, address) {
  return {
    type: "customer/create",
    payload: { fullName, address, createdAt: new Date() },
  };
}
