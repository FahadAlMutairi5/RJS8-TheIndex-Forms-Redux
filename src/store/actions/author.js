import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthorDetail = authorID => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_AUTHOR_LOADING
    });
    try {
      const res = await instance.get(`/api/authors/${authorID}/`);
      const author = res.data;
      dispatch({
        type: actionTypes.FETCH_AUTHOR_DETAIL,
        payload: author
      });
    } catch (err) {}
  };
};

//POST THE BOOK TO https://the-index-api.herokuapp.com/api/books/
export const postBook = (book, author, closeModal) => {
  book.authors=author
  console.log(book)
  return async dispatch => {
    try {
      const res = await instance.post("/api/books/", book);
      const newbook = res.data;
      dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_BOOK,
        payload: newbook
      });
      closeModal();
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

