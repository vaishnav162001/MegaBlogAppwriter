import authService from './appwrite/auth_services'
import {login,logout} from './store/authSlice'
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
const [loding,setLoading]=useState(true);
const dispatch=useDispatch();

useEffect(()=>{
   authService.getCurrentUser()
   .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }
    else{
      dispatch(logout())
    }
   })
   .finally(()=>setLoading(false))
},[])

return !loding ?(
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-ful block'>
      <Header/>
      <main>
        {/* <Outlet></Outlet> */}
      </main>
      <Footer/>
    </div>
   </div>) : null
};

export default App
