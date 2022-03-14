import react, { useEffect, useState } from "react";
import axios from "axios";
import EditAndDeleteComment from "./EditAndDeleteComment";

const CardComment = ({ post, usersData, isAdmin, userId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

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
  useEffect(() => {
    getAllComments();
  }, []);

  const handleComment = async (e) => {
    e.preventDefault();
    if(text) {
        await axios({
          method: "post",
          url: "http://localhost:3000/addComment/" + post.id,
          data: {
              content: text
          },
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
            getAllComments()
          })
          .then(_ => setText(""))
          .catch((err) => {
            console.log("Impossible de poster un commentaire", err);
          });
    }
  };

  return (
    <div>
      {comments.map((comment) => {
          if(comment.postId === post.id) {
              return (
                <div
                  key={comment.id}
                >
                  <div>
                    <img
                      src={
                        !usersData &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.picture;
                            else return null;
                          })
                          .join("")
                      }
                      alt="profil"
                    />
                  </div>
                  <div>
                    <div >
                      <div >
                        <h3>
                        {usersData &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.firstName;
                            else return null;
                          })
                          .join(" ")}
                      {usersData &&
                        usersData
                          .map((user) => {
                            if (user.id === comment.userId) return user.name;
                            else return null;
                          })
                          .join("")}
                          </h3>
                      </div>
                      <span>{dateParser(comment.created)}</span>
                    </div>
                    {comment.attachement !== null && (
                      <img src={comment.attachement} />
                    )}
                    <p>{comment.content}</p>
                    <EditAndDeleteComment post={post} usersData={usersData} userId={userId} isAdmin= {isAdmin} commentId={comment.id}/>
                  </div>
                </div>
              );
          } else return null;
      })}
      {
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      }
    </div>
  );
};

export default CardComment;
