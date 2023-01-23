export const initState = {
  address: "",
  balance: "",
};

export const StoreAction = {
  INIT_ACCOUNT: "INIT_ACCOUNT",
  SAVE_ACCOUT: "SAVE_ACCOUNT",
};

export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_ACCOUNT":
      return {
        ...state,
        address: action.payload?.address,
        balance: action.payload?.balance,
      };
    default:
      return state;
  }
};
