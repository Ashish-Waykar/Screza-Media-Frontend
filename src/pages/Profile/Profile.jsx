import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
  return (
    <div className="Profile">
        <RightSide/>
        <div className="profile-center">
            <ProfileCard location='profilePage'/>
            <PostSide/>
        </div>
        <ProfileLeft/>
    </div>
  )
}

export default Profile