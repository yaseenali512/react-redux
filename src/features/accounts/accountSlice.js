const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "jazba",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

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

    case "account/convrtingCurrency":
      return {
        ...state,
        isLoading: true,
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

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // if above condition is false then the function in dispatch in Slice will return the following function
  return async function (dispatch, getState) {
    dispatch({ type: "account/convrtingCurrency " });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    // console.log(data);
    const convertedAmount = data.rates.USD;

    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(1200));
// console.log(store.getState());

// store.dispatch(requestLoan(300, "Jan Mal"));
// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());
