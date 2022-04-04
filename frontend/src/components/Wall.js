import React, {useState, useEffect} from 'react';
import Card from './Post/Card';
import PostForm from "./Post/PostForm";
import { fetchToken } from './services/User';
import axios from "axios";

const Wall = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);


 const getAllPosts = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}posts`,
          withCredentials: true,
        })
          .then((res) => {
            setAllPosts(
              res.data.data.sort((b, a) => {
                return a.id - b.id;
              })
            );
          })
          .catch((err) =>
            console.log("impossible de récupérer les publications err:" + err)
          );
      };
    useEffect(() => {
        getAllPosts();
        fetchToken(setUserId,setIsAdmin);
    }, [userId,isAdmin])
    
    

return (
    <div>
        <div>
        <PostForm getAllPosts={getAllPosts} userId={userId}/> 
        </div>
        <ul>
            {allPosts.map((post) => {
                return <Card post={post} key={post.id} getAllPosts={getAllPosts} userId={userId} isAdmin={isAdmin} />
            })}
        </ul>
    </div>
)
}

export default Wall;