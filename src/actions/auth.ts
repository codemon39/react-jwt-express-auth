import { RadioButtonCheckedRounded } from "@material-ui/icons";
import * as api from "../api";
import { SET_AUTH, SET_ERROR } from "../constants/actionTypes";
import { NewType } from "./NewType";

export function signin(formData: any, router: any): (dispatch: any) => NewType {
  return async (dispatch: any) => {
    try {
      const { data } = await api.signIn(formData);
      if (data?.error) {
        dispatch({ type: SET_ERROR, data });
        return router.push("/login");
      }
      dispatch({ type: SET_AUTH, data });
      router.push("/description");
    } catch (error) {}
  };
}

export function signUp(
  formData: any,
  router: any
): (dispatch: any) => Promise<any> {
  return async (dispatch: any) => {
    try {
      const { data } = await api.signUp(formData);
      if (data?.error) {
        dispatch({ type: SET_ERROR, data });
        return router.push("/register");
      }
      dispatch({ type: SET_AUTH, data });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
}
