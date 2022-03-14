import React, { useState, useEffect } from "react";
import axios from "axios"
import Advice from "./Advice";
import DeleteCard from "./DeleteCard";
import { CommentOutlined,EditOutlined} from "@ant-design/icons";
import CardComment from "./Cardcomment";


const Card = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] =useState(null);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    
    const dateParser = (num) => {
        let options = {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        };
      
        let timestamp = Date.parse(num);
      
        let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
      
        return date.toString();
      };

      const fetchToken = async () => {
        await axios({
          method: "get",
          url: "http://localhost:3000",
          withCredentials: true,
        })
          .then((res) => {
            setUserId(res.data.id);
            setIsAdmin(res.data.isAdmin)
            console.log(res.data.id);
          })
          .catch((err) => console.log("Pas de token:" + err));
      };
        const fetchUsersData = async () => {
         
            await axios({
                method: "get",
                url: "http://localhost:3000/users",
                withCredentials: true,
              })
           .then((res) => {
               setUsersData(res.data.data);
           })
           .catch((err) => { console.log('fetchUsersData:'+err);})
          }
       
          const updatePost = async () => {
              if (textUpdate){
                  await axios({
                      method:"put",
                      url: "http://localhost:3000/post/"+ post.id,
                      data: {
                          ...post,
                          content:textUpdate, 
                          UserId: userId
                      },
                      withCredentials: true
                  })
                  .then((res) => {
                      console.log(res);
                  })
                  .catch((err) => { console.log('erreur modification', err);})
              }
              setIsUpdated(false)
          }

      useEffect(() => {
          fetchToken()
  
        if (usersData !== null) {
            setIsLoading(false);
            
        } else {
            fetchUsersData()
        }

    }, [usersData]);


   
    
    return (
        <li className="post__container" key={post.id}>
            {isLoading ? (
                <span> chargement</span>
            ):(
            <>
            <div className="post__container--owner">
                <img src={
                    (usersData !== null) &&
                    usersData.map((user) => {
                 if(user.id === post.userId) return user.picture
                 else return null
                }).join('')
            } alt="profil"/>
                <span>  {(usersData !== null) &&
                    usersData.map((user) => {
                 if(user.id === post.userId) return user.firstName
                 else return null
                }).join(' ')}  
                 {(usersData !== null) &&
                    usersData.map((user) => {
                 if(user.id === post.userId) return user.name
                 else return null
                }).join('')}  </span>
                <span>{dateParser(post.created)} </span>
            </div>
            <div className="post__container--image">
                <h2> {post.title} </h2>
            <img src= {post.attachement} alt=""/>
            </div>
            <div className="post__container--content">
            {isUpdated === false && <p>{post.content}</p>}
            {isUpdated && (
                <div className="post__container--update">
                    <textarea defaultValue={post.content}
                    onChange={(e) => setTextUpdate(e.target.value)}
                    />
                    <div className="post__container--button">
                    <button className="button" onClick={updatePost}> Valider </button>
                    </div>
                    </div>
            )}
            {userId === post.userId && (
                <EditOutlined onClick={() => setIsUpdated(!isUpdated)}/>
            )}
            {((userId === post.userId) || ((isAdmin && userId) !== post.userId)) && <DeleteCard post={post} />}
            </div>
           <Advice post={post}/>
           <CommentOutlined onClick={(e) => { setShowComments(!showComments)}} />
           {showComments && <CardComment post={post} usersData={usersData}/>}
            </>
            )}
        </li>
    )
}

export default Card;