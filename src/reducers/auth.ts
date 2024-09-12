import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action: any) => {
  switch (action.type) {
    case actionType.SET_AUTH:
      localStorage.setItem("profile", action?.data);

      return { ...state, authData: action?.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
