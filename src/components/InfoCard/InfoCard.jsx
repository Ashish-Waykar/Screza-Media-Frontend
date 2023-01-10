import React , { useEffect, useState } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModel from '../ProfileModel.jsx/ProfileModel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi  from '../../API/UserRequest.js';
import { logout } from '../../Actions/AuthAction';
const InfoCard = () => {
    const [modalOpened,setModalOpened]=useState(false);
    const dispatch =useDispatch();
    const params = useParams();

    const profileUserId= params.id
    const [profileUser , setProfileUser]= useState({})

    const {user }= useSelector((state)=>state.authReducer.authData)
    useEffect(()=>{ 
        const fetchProfileUser= async()=>{
            if(profileUserId === user._id){
                setProfileUser(user);
            }
            else{
                const profileUser =await UserApi.getUser(profileUserId)    
                setProfileUser(profileUser)
            }
        }
        fetchProfileUser();
    },[user]);
    const handleLogout=()=>{
        dispatch(logout())
    }
  return (
    <div className="InfoCard">
        <div className="infoHead">
            <h4>Profile Info</h4>
            {user._id === profileUserId ? ( <div>
                
                <UilPen width="2rem" onClick={()=>setModalOpened(true)}height='1.2rem'/> 
                <ProfileModel 
                modalOpened={modalOpened}
                 setModalOpened={setModalOpened}
                 data={user}
                />
                </div>):""}
           
        </div>
        <div className="info">
            <span>
                <b>Status </b>
            </span>
            <span>{profileUser.relationship ? profileUser.relationship : "Not Found"}</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in </b>
            </span>
            <span>{profileUser.lives_in ? profileUser.lives_in :"Lives In Not Available"}</span>
        </div>
        
        <div className="info">
            <span>
                <b>Works At </b>
            </span>
            <span>{profileUser.works_at ? profileUser.works_at  :"Workd At Not Available"}</span>
        </div>
        <button className='button logout-button' onClick={handleLogout}>Logout</button>

    </div>
  )
}
export default InfoCard