import React from 'react'
// import Cover from '../../img/cover.jpg'
// import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ProfileCard = ({location}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const  serverPublic  = process.env.REACT_APP_PUBLIC_FOLDER
    // const ProfilePage=false;

    const posts = useSelector((state)=>state.postReducer.posts)
    console.log(serverPublic+user.profile_picture )

  return (
    <div className="ProfileCard">
        <div className="ProfileImage">
            <img src={user.cover_picture ? serverPublic + user.cover_picture : serverPublic + "cover.jpg"} alt="" />
            <img src={user.profile_picture ? serverPublic + user.profile_picture : serverPublic + "defaultProfile.jpg"} alt="" />
        </div>
        <div className="ProfileName">
            <span>{user.first_name} {user.last_name}</span>
            <span>{user.worksAt? user.worksAt : "Write About Your Work."}</span>
        </div>
        <div className="followStatus">
            <hr/>
            <div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
            <div className="vl"></div>
            <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>
            {location === 'profilePage' && (
                <>
                <div className='vl'>

                </div>
                <div className='follow'>
                    <span>{posts.filter((post)=>post.userID === user._id).length} </span>
                    <span>Post</span>
                </div>
                </>
            ) }
            </div>
            
            <hr/>
        </div>
        {location === 'profilePage' ? (" "):(<span>
            <Link style={{textDecoration:"none",color:"inherit"}}to={`/profile/${user._id}`}>My Profile</Link>
        </span>)}
        
    </div>

  )
}

export default ProfileCard