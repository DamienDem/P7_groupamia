import React, { useState } from "react";
import { updateComment } from "../services/comment";

const EditAndDeleteComment = ({ userId, comment, getAllComments, edit, setEdit }) => {
  const [text, setText] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();
    const data = {
      content: text,
      postId: comment.postId,
    };
    updateComment(comment.id, data, getAllComments);
    setEdit(!edit);
    setText("");
  };

  return (
    <div className="comment-container__item--text">
      {userId === comment.userId && edit && (
        <form action="" onSubmit={handleComment} className="edit-comment-form">
          <label htmlFor="text" id="text" onClick={() => setEdit(!edit)}> Modifier texte</label>
          <br />
          <input
          id="text"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.content}
          />
          <label id="submit"> Valider modification</label>
          <input
            id="submit"
            className="button"
            type="submit"
            value="Valider modification"
          />
        </form>
      )}
    </div>
  );
};

export default EditAndDeleteComment;
