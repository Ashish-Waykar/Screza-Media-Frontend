import React from 'react'
import LogoSearch from '../../logoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import PostSide from '../PostSide/PostSide'
import './profile.css'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
const ProfileSide =()=>{
    return(
        <div className="ProfileSide">

        <LogoSearch/>
        <ProfileCard location="homepage"/>
        <FollowersCard/>
        </div>
    )

}
export default ProfileSide