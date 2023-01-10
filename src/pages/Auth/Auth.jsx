import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../Actions/AuthAction'
const Auth = () => {
    const dispatch =useDispatch()
    const loading=useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] = useState(false)
    const [data,setData]=useState({first_name:"",last_name:"",password:"",confirmpass:"",username:""})
    const handleChange= (e)=>{
        setData({...data,[e.target.name]: e.target.value})
    }
    const [confirmPass, setConfirmPass]=useState(true)
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignUp){
            data.password === data.confirmpass ? dispatch(signUp(data)):setConfirmPass(false)
            // if(data.password !== data.confirmpass){
            //     setConfirmPass(false)
            // }
        }else{
            dispatch(logIn(data))
        }
    }
    const resetForm=()=>{
        setConfirmPass(true)
        setData({first_name:"",last_name:"",password:"",confirmpass:"",username:""})
    }
    return (
        <div className="Auth">
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="webName">
                    <h1>SCREZA</h1>
                    <h6>The Unsung Fashionista...  </h6>
                </div>
            </div>
            {/* Riglt Side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
                    {isSignUp && (
                        <div>
                            <input type="text" className='infoInput' name="first_name" placeholder='First Name' value={data.first_name} id="" onChange={handleChange}/>
                            <input type="text" className='infoInput' name="last_name" placeholder='Last Name' id=""value={data.last_name} onChange={handleChange}/>
                        </div>
                    )}

                    <div>
                        <input type="text" className='infoInput' name="username" placeholder='Username' id="" value={data.username}onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="password" className='infoInput' name="password" placeholder='Password' id="" value={data.password}onChange={handleChange}/>
                        {isSignUp && (
                            <input type="password" className='infoInput' name="confirmpass" placeholder='Confirm Password' id="" value={data.confirmpass}onChange={handleChange}/>
                        )}

                    </div>
                    <span style={{ display : confirmPass ? "none":"block",color:"red",fontSize:"12px",alignSelf:"flex-end",marginRight:"5px"}}>
                        * Confirm Password Is Not Same
                    </span>
                    <div>
                        <span style={{ fontSize: '12px',cursor: "pointer" }} onClick={() => {setIsSignUp((prev) => !prev);resetForm() }} >
                            {isSignUp ? "Already Have An Account. Login!" : "Don't Have Account Sign up"} </span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>
                        {loading ? "Loading..." : isSignUp ? "Sign up" : "Log In"}
                    </button>
                </form>
            </div>
            {/* <LogIn/> */}
            {/* <SignUp/>  */}
        </div>
    )
}


// function LogIn() {
//     return (
//         <div className="a-right">
//             <form className="infoForm authForm loginform">
//                 <h3>Login </h3>
//                 <input type="text" className='infoInput' name="email" placeholder='Email' id="" />
//                 <input type="password" className='infoInput' name="password" placeholder='Password' id="" />

//                 <div>
//                     <span style={{ fontSize: '12px' }}>Don't Have Account Sign up</span>

//                     <button className="button infoButton" type="submit">
//                         Login
//                     </button>
//                 </div>
//             </form>
//         </div>
//     )
// }

// function SignUp() {
//     return (
//         <div className="a-right">
//             <form className="infoForm authForm">
//                 <h3>Sign up</h3>
//                 <div>
//                     <input type="text" className='infoInput' name="firstname" placeholder='First Name' id="" />
//                     <input type="text" className='infoInput' name="lastname" placeholder='Last Name' id="" />
//                 </div>
//                 <div>
//                     <input type="text" className='infoInput' name="username" placeholder='Username' id="" />
//                 </div>
//                 <div>
//                     <input type="text" className='infoInput' name="password" placeholder='Password' id="" />
//                     <input type="text" className='infoInput' name="confirm_password" placeholder='Confirm Password' id="" />
//                 </div>
//                 <div>
//                     <span style={{ fontSize: '12px' }}>Already Have An Account. Login! </span>
//                 </div>
//                 <button className="button infoButton" type="submit">
//                     Signup
//                 </button>
//             </form>
//         </div>
//     )
// }

export default Auth