import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { followUser, unFollowUser } from '../../Actions/UserAction'


const User = ({person}) => {
  const dispatch= useDispatch()
  const {user}= useSelector((state)=>state.authReducer.authData)
  const [following,setFollowing]=useState(person.followers.includes(user._id))
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  // console.log("----------------------------------------------------------------------")
  // console.log(person.country)
  const handleFollow=()=>{
    {following? dispatch(unFollowUser(person._id,user)) :dispatch(followUser(person._id,user))}
    setFollowing((prev)=>!prev)
    
  } 
  // const handleFollow=()=>{
  //   dispatch(followUser(person._id,user))
  // } 
  console.log(serverPublic+person.profile_picture)
  return (
    <div className="follower">
                    <div>
                        <img src={person.profile_picture ? serverPublic + person.profile_picture : serverPublic + "defaultProfile.jpg"} alt="" className='followerImage'/>
                        <div className='name'>
                            <span style={{display:"inline-block",maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis"}}>{person.first_name} {person.last_name}</span>
                            <span style={{display:"inline-block",maxWidth:"120px",overflow:"hidden",textOverflow:"ellipsis"}}>@{person.username}</span>
                        </div>
                    </div>
                    <button className={following ? 'button fc-button Unfollowbutton':'button fc-button'} onClick={handleFollow}>{following? "Unfollow":"Follow"}</button>
                </div>
  )
}

export default User