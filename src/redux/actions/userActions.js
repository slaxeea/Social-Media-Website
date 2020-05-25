// Imports
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

// Function to login user (I think)
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      //console.log(res.data);
      const FBAuthToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBAuthToken", FBAuthToken);
      axios.defaults.headers.common["Authorization"] = FBAuthToken;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
          type: SET_ERRORS,
          payload: err.response.data
      });
    });
};

// get user data (as if that wasn't already clear by the name)
export const getUserData = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
