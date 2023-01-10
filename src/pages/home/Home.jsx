import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profile/profile'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
const Home =()=>{
    return(
        <div className="Home">
            <RightSide/>
            <PostSide/>
            <ProfileSide/>

        </div>
    )

}
export default Home