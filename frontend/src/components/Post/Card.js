import React, { useState, useEffect } from "react";
import axios from "axios"
import Advice from "./Advice";

const Card = ({post}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    
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
       

      useEffect(() => {
  
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
               <p> {post.content} </p>
            </div>
           <Advice post={post}/>
            </>
            )}
        </li>
    )
}

export default Card;