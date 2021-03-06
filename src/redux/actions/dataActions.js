import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_POST,
  SET_POST,
  STOP_LOADING_UI
} from "../types";
import axios from "axios";

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

// Like a post
export const likePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .post(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Delete Post
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

// Post a post
export const postPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/post', newPost)
      .then(res => {
        dispatch({
          type: POST_POST,
          payload: res.data
        });
        dispatch({
          type: CLEAR_ERRORS
        })
      })
      .catch(err => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
};

// Get only one post with all details
export const getPost = (postId) => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  axios.get(`/post/${postId}`)
    .then(res => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({
        type: STOP_LOADING_UI
      })
    })
    .catch(err => console.log(err))
}

// Function to clear all errors
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
}