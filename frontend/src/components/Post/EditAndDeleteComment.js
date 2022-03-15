import axios from "axios";
import React, { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const EditAndDeleteComment = ({ userId, isAdmin, comment, getAllComments}) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const updateComment = async (e) => {
    e.preventDefault();
    await axios({
      method: "put",
      url: "http://localhost:3000/updateComment/" + comment.id,
      withCredentials: true,
      data: {
        content: text,
        postId: comment.postId,
        attachement: null
      },
    })
      .then((res) => {
        console.log(res.data);
        setEdit(!edit);
        getAllComments()
      })
      .then(() => setText(""))
      .catch((err) => {
        console.log("impossible de modifier le commentaire", err);
      });
  };

  const deleteComment = async () => {
    await axios({
      method: "delete",
      url: "http://localhost:3000/deleteComment/" + comment.id,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("impossible de supprimer le commentaire", err);
      });
  };

  return (
    <div>
      {userId === comment.userId && edit === false && (
        <EditOutlined onClick={() => setEdit(!edit)} />
      )}
      {userId === comment.userId && edit && (
        <form action="" onSubmit={updateComment} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            <EditOutlined />
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.content}
          />
          <input type="submit" value="Valider modification" />
        </form>
      )}
      {(isAdmin || userId === comment.userId) && (
        <div
          onClick={() => {
            if (
              window.confirm(
                "Etes vous sure de vouloir supprimer cette publication ?"
              )
            ) {
              deleteComment();
            }
          }}
        >
          <DeleteOutlined />
        </div>
      )}
    </div>
  );
};

export default EditAndDeleteComment;
