// Imports
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNATHENTICATED,
  LOADING_USER
} from "../types";
import axios from "axios";

// Function to login user (I think)
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      //console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// function to log out a user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBAuthToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNATHENTICATED });
  console.log("User logged out");
  window.location.reload();
};

// get user data (as if that wasn't already clear by the name)
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER});
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

// Function to signup user
export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      //console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Function to upload a profile image
export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER});
  axios.post('/user/image', formData)
  .then(() => {
    dispatch(getUserData());
  })
  .catch(err => {
    console.log(err);
  })
}

// Function to edit userdetails
export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER});
  axios.post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => {
      console.log(err);
    })
}

const setAuthorizationHeader = (token) => {
  const FBAuthToken = `Bearer ${token}`;
  localStorage.setItem("FBAuthToken", FBAuthToken);
  axios.defaults.headers.common["Authorization"] = FBAuthToken;
};
