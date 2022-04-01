import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {deletePost} from "../services/Post"


const DeleteCard = ({ post, getAllPosts }) => {

    return (
        <div onClick={() => {
            if(window.confirm("Etes vous sure de vouloir supprimer cette publication ?")) {
                deletePost(post.id, getAllPosts)
            }
        }}>
            <DeleteOutlined />
        </div>
    )
}

export default DeleteCard;