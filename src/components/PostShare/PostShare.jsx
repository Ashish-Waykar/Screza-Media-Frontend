import React , {useState,useRef}from 'react'
import ProfileImage from '../../img/profileImg.jpg';
import './PostShare.css';
import { UilScenery } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux" 
import { uploadImage ,uploadPost } from '../../Actions/UploadAction';


const PostShare = () => {
    const loading =useSelector((state)=>state.postReducer.uploading)
    const [image,setImage] = useState(null);
    const imageRef = useRef();
    const dispatch = useDispatch()
    const {user}=useSelector((state)=>state.authReducer.authData)
    const desc= useRef()
    const onImageChange = (event) => {
       
        if(event.target.files && event.target.files[0] ){
            // console.log("here");
            let img = event.target.files[0]; 
            // setImage({
            //     // image: URL.createObjectURL(img),
            //     image: img,
            // });
            setImage(img);
        }
    } ;
    const reset=()=>{
        setImage(null);
        desc.current.value=""
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newPost={
            userID : user._id,
            desc : desc.current.value
        }
        if(image){
            const data =new FormData()
            const filename= Date.now() + image.name
            data.append("name",filename)
            data.append("file",image)
            newPost.image =filename
            console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)
            }
        }
        dispatch(uploadPost(newPost))
        reset()
    }
    
    const  serverPublic  = process.env.REACT_APP_PUBLIC_FOLDER
    
  return (
    <div className="PostShare">
        <img src={user.profile_picture ? serverPublic + user.profile_picture : serverPublic + "defaultProfile.jpg"} alt="" />
            <div>
                <input type="text" ref={desc} placeholder="What's happning " required  />
                <div className="postOptions">
                <button className='button ps-button'onClick={handleSubmit} disabled={loading}>
                    {loading ? "Uploading...":"Share"}
                </button>
                
                <div className="option"
                style={{color:"var(--video)"}}>
                    <UilPlayCircle/>
                    Video
                </div>
                <div className="option"
                style={{color:"var(--location)"}}>
                    <UilLocationPoint/>
                    Location
                </div>
                <div className="option"
                style={{color:"var(--shedule)"}}>
                    <UilSchedule/>
                    Shedule
                </div>
                <div className="option"
                style={{color:"var(--photo)"}}
                onClick={()=>imageRef.current.click()}
                >
                    <UilScenery/>
                    Photo
                </div>
                <div  style={{display:"none"}}>
                    <input 
                     type="file"
                     name='myImage'
                     ref={imageRef} 
                     onChange={onImageChange}/>
                </div>
            </div>
            { image && (
                <div className="previewImage">
                    <UilTimes onClick={()=>setImage(null)}/> 
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )}
            </div>
    </div>
  )
}

export default PostShare