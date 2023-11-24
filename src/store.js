import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "jazba",
};

const initialStateCustomer = {
  fullName: "",
  address: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

// const store = createStore(accountReducer);

// store.dispatch({ type: "account/deposit", payload: 1200 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 300, purpose: "education" },
// });
// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1200));
console.log(store.getState());

store.dispatch(requestLoan(300, "Jan Mal"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function customerReducer(state = initialStateCustomer, action) {
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

function createCustomer(fullName, address) {
  return {
    type: "customer/create",
    payload: { fullName, address, createdAt: new Date() },
  };
}

store.dispatch(createCustomer("Ali", "Karachi"));
console.log(store.getState());
