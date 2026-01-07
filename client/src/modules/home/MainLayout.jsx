import React, { useEffect } from 'react'
import SmartNavBar from './SmartNavbar'
import MainRouter from './MainRouter'
import { UsageTimeTracker } from './UsageTimeTracker'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
function MainLayout() {
  const token = useSelector(state=>state.profile.profile.token);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect( ()=>{
      window.scrollTo(0, 0);
  }, [location.pathname])

  return (
    <div id="app-layout">
      {/* {!token && !isLoginPage && <UsageTimeTracker isLoggedIn={false} />} */}
        {/* <SmartNavBar/>  */}
        <NavBar/>
      {/* <div id="main-router"  className='bg-light-white mt-28 md:mt-32 pb-8 mx-auto max-w-7xl'>
        <MainRouter/>
      </div> */}
        {/* <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MainRouter/>
            <SmartHiringPlatform/>
        </main> */}
    </div>
  )
}

export default MainLayout