import React from 'react'
import './Post.css'
// import comment from "../../img/comment.png" 
// import share from "../../img/share.png" 
import like from "../../img/like.png" 
import notLike from "../../img/notlike.png" 
import {useSelector } from 'react-redux'
import { useState } from 'react'
import {  UilCommentAltMessage,UilShare } from '@iconscout/react-unicons'
import { likePost } from '../../API/PostRequest'
const Post = ({data}) => {
    const {user}= useSelector((state)=>state.authReducer.authData)
    const [liked,setLiked]=useState(data.likes.includes(user._id))
    
    const [likes,setLikes]=useState(data.likes.length)
    const handleLike = () => {
        setLiked((prev)=>!prev )
        likePost(data._id,user._id)
        liked ? setLikes((prev)=> prev - 1):setLikes((prev)=>prev+1)
        // console.log("===========-------------------------===============================")
        // console.log(data.likes.length)
        // console.log(data)   
    }
  return (
    <div className="Post"> 
        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : "" } alt="" />
        
        <div className="postReact">
            <img src={liked ? like : notLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
            
            <span><UilCommentAltMessage style={{fontSize:"200px"}}/></span>
            <span><UilShare/></span>
            {/* <img src={share} alt="" /> */}
        </div>
        <span style={{color:"var(--gray)",fontSize:'12px'}}>{likes} likes</span>
        <div className="detail">
            <span>
                <b>{data.name} </b>
            </span>
                 
            <span>
                {data.desc}
            </span>
        </div>
    </div>
  )
}

export default Post