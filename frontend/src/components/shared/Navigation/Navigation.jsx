import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import style from './Navigation.module.css'

import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = ()=>{
   
    const brandStyle = {
        color:'#fff',
        textDecoration:'none',
        fontWeight:'bold',
        fontSize:'22px',
        display:'flex',
        alignItem:'center'
    }

    const logoText = {
        marginLeft : '10px'
    }

    const dispatch = useDispatch();
    const {isAuth,user} = useSelector(state => state.auth)
    // console.log(user)

    async function logoutUser(){
       
        try {
            const { data } = await logout();
            dispatch(setAuth(data))
        } catch (error) {
          console.log(error)  
        }

    }

    return (
        <nav className={`${style.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img className={style.logo} src="/images/logo.png" alt="logo" />
                <span style={logoText}>club-House</span>
            </Link>
            
               <div className={style.navRight}>
                <h3>{user.name}</h3>
                <Link to="/">
                 <img className={style.profile} src={user.avatar}  alt="" />
                </Link>
                 <button className={style.logOutBtn} onClick={logoutUser}>
                    <img src="/images/logOut.jpg" alt="" />
                 </button>
               </div>

 


        </nav>
    )
}

export default Navigation