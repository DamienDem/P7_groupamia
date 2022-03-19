import React from "react";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteCard = ({ post, getAllPosts }) => {

    const deletePost = async () => {
        await axios({
            method: "delete",
            url: "http://localhost:3000/post/"+post.id,
            withCredentials: true
        })
        .then((res) => {
            console.log(res.data);
           getAllPosts()
        })
        .catch((err) => { 
            console.log("suppression échouée", err);
        })
    }

    return (
        <div onClick={() => {
            if(window.confirm("Etes vous sure de vouloir supprimer cette publication ?")) {
                deletePost()
            }
        }}>
            <DeleteOutlined />
        </div>
    )
}

export default DeleteCard;