import React, { useContext, useState, Fragment } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const AddComment = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const id = useParams().id;
  const [text, setText] = useState();

  const commentAdd = async e => {
    e.preventDefault();
    const headers = {
      headers: {
        "x-auth-token": appState.user.token
      }
    };
    try {
      const response = await Axios.post(`/post/comment/${id}`, { text }, headers);
      console.log(appState.comment);
      appDispatch({ type: "Comment", data: response.data });
      setText("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave Comment...</h3>
        </div>
        <form className="form my-1" onSubmit={commentAdd}>
          <textarea value={text} name="text" onChange={e => setText(e.target.value)} ecols="30" rows="5" placeholder="Add Comment" required></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

export default AddComment;
