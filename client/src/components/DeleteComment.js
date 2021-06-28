import React, { useContext } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

const DeleteComment = props => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { _id, user, text, avatar, name, date } = props.com;

  const commentDelete = async () => {
    const headers = {
      headers: {
        "x-auth-token": appState.user.token
      }
    };

    try {
      await Axios.delete(`/post/comment/${props.postId}/${_id}`, headers);
      appDispatch({ type: "commentDeleted", data: _id });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        {user === appState.user.id && (
          <button onClick={commentDelete} type="button" className="btn btn-danger">
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DeleteComment;
