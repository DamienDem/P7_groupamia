import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import {getPosts} from '../actions/post.actions'

const Wall = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(loadPost) {
            dispatchEvent(getPosts());
            setLoadPost(false)
        }

    } ,[loadPost, dispatch])

  return <div className="wall">Mur d'actualité</div>;
};

export default Wall;
