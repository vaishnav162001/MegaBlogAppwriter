import React from 'react'
import { useDispatch, useDispatch } from 'react-redux'
import authService from '../../appwrite/auth_services'
import {logout}  from '../../store/authSlice'

const LogoutBtn = () => {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-7 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default LogoutBtn