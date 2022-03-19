import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { PictureOutlined } from "@ant-design/icons";


const PostForm = ({userId}) => {
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [ userData, setUserData ] = useState([]);
    const [image, setImage] = useState();


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

      const getUser = async () => {
          await axios({
              method:'get',
              url:"http://localhost:3000/user/"+userId,
              withCredentials: true
          })
          .then((res) => {
              setUserData(res.data.data)
          })
          .catch((err) => {
              console.log('impossible de récupérer les données utilisateur', err);
          })
      }

      useEffect(() => {
        getUser();
      }, [userData.id])

    
      const addPost = async (data) => {
          await axios({
              method:'post',
              url:"http://localhost:3000/post/"+userId,
              data: data
          })
          .then((res) => {
            console.log(res.data);
          
          })
          .catch((err) => {
            console.log('ajout de la photo impossible'+err);
          })
      }

      const handlePost = async () => {
        if (message || postPicture ) {
          const data = new FormData();
          data.append('content', message);
          data.append("image", image);
        
          await addPost(data);
          cancelPost();
        } else {
          alert("Veuillez entrer un message")
        }
      };
      const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
      }; 
    
      const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setImage("");
      };

    return (
      <div className="post-container">
        <>
          <NavLink exact to="/profil">
            <div>
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div >
            <textarea
              name="content"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture  ? (
              <li>
                <div>
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div >
                  <div >
                    <div >
                      <h3>{userData.firstName}{" "}{userData.name} </h3>
                    </div>
                    <span>{dateParser(Date.now())}</span>
                  </div>
                  <div >
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            <div >
              <div>
                  <>
                  <PictureOutlined />
                    <input
                      type="file"
                      id="file-upload"
                      name="image"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
              </div>
              <div>
                {message || postPicture ? (
                  < button  onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button  onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  };
  
  export default PostForm;