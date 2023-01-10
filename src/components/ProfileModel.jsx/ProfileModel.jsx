import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../Actions/UploadAction';
import { updateUser } from '../../Actions/UserAction';

function ProfileModel({modalOpened, setModalOpened ,data} ) {
  const theme = useMantineTheme();
  const {password,...other}  = data;
  const [formData,setFormData]=useState(other)
  const [profileImage,setProfileImage]= useState(null)
  const [coverImage, setCoverImage]=useState(null)
  const dispatch = useDispatch()
  const param = useParams()
  const {user} =useSelector((state)=>state.authReducer.authData)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  const onImageChange =(event)=>{
    if(event.target.files && event.target.files[0]){
      let img =event.target.files[0];
      event.target.name==="profileImage" ? setProfileImage(img):setCoverImage(img)
    }
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    let UserData=formData;
    if(profileImage){
      const data =new FormData();
      const fileName =Date.now()+profileImage.name;
      data.append("name",fileName)
      data.append("file",profileImage)
      UserData.profile_picture=fileName;
      // UserData.profilePicture=fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    
    if(coverImage){
      const data =new FormData();
      const fileName =Date.now()+coverImage.name;
      data.append("name",fileName)
      data.append("file",coverImage)

      UserData.cover_picture=fileName;
      // UserData.coverPicture=fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(updateUser(param.id,UserData));
    setModalOpened(false);
  }
  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened={modalOpened}
      onClose={()=>setModalOpened(false)} 
    >
      <form  className="infoForm">
        <h3>Your Info </h3>
        <div>
            <input type="text" className="infoInput"name='first_name'placeholder='FirstName' onChange={handleChange}  value={formData.first_name} />
            <input type="text" className="infoInput"name='last_name'placeholder='LastName'onChange={handleChange} value={formData.last_name}/>
        </div>
        {/* <div>
        <input type="text" className="infoInput"name='Email'placeholder='Email' />

        </div> */}
        <div>
        <input type="text" className="infoInput"name='works_at'placeholder='Works At'onChange={handleChange} value={formData.works_at} />

        </div>
        <div>
        <input type="text" className="infoInput"name='lives_in'placeholder='Lives in'onChange={handleChange} value={formData.lives_in}/>

        </div>
        <div>
        <input type="text" className="infoInput"name='country'placeholder='Country' onChange={handleChange}  value={formData.country}/>

        </div>
        <div>
        <input type="text" className="infoInput"name='relationship'placeholder='Relationship Status'onChange={handleChange} value={formData.relationship} />
        </div>
        <div>
            Profile Image
            <input type="file" name="profileImage"onChange={onImageChange}/>
            Cover Image
                <input type="file" name="coverImage"onChange={onImageChange}/>

        </div>
        <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModel
