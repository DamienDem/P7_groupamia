import axios from "axios";
import React, { useState } from "react";


const EditAndDeleteComment = (userId, isAdmin, commentId ) => {
    const [edit, setEdit] = useState(false);
    const [text, setText]= useState("");
    const [comments, setComments] = useState([]);

    const getAllComments = async () => {
        await axios({
          method: "get",
          url: "http://localhost:3000/comments",
          withCredentials: true,
        }).then((res) => {
          console.log(res.data);
          setComments(res.data.data);
        });
      };

    const updateComment = async (e) => {
        e.preventDefault();
        await axios({
            method:"put",
            url:"http://localhost:3000/updateComment/"+commentId,
            withCredentials: true,
            data: { content: text}
        })
        .then((res) => {
            console.log(res.data);
            getAllComments()
        })
        .then(() => setText(""))
        .catch((err) => {
            console.log("impossible de modifier le commentaire", err);
        })
    }

    const deleteComment = async () => {
        await axios({
            method: "delete",
            url: "http://localhost:3000/deleteComment/"+commentId,
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
            getAllComments()
        })
        .catch((err) => { console.log("impossible de supprimer le commentaire", err);})
    }

    return (
        <div>
            Edit delete
        </div>
    )
}

export default EditAndDeleteComment;