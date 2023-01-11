import React from 'react'
import './logoSearch.css'
import Logo from '../img/logo.png' 

import {UilSearch} from '@iconscout/react-unicons'
const LogoSearch =()=>{
    return(
        <div className="LogoSearch">
            <div className="Search">
                <div className="s-icon">
                    <UilSearch/>
                </div>
                <input type="text" placeholder=' #Explore Screza Network...'/>
            </div>
            <img src={Logo} alt="" width="50px"/>
        </div>
    )

}
export default LogoSearch