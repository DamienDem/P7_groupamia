import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Card from './Post/Card'

const Wall = () => {
    const [allPosts, setAllPosts] = useState([]);

    const getAllPosts = async () => {
        await axios({
            method:"get",
            url:"http://localhost:3000/posts",
            withCredentials: true
        })
        .then((res) => {
            setAllPosts(res.data.data.sort((b,a) => {
                return a.id - b.id;
            }))
        })
        .catch((err) => console.log("impossible de récupérer les publications err:"+err))
    }

    useEffect(() => {
        getAllPosts();
    }, [])
    

return (
    <div>
        <ul>
            {allPosts.map((post) => {
                console.log(post.userId);
                return <Card post={post} key={post.id} getAllPosts={getAllPosts} />
            })}
        </ul>
    </div>
)
}

export default Wall;