import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ()=> {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/signup")
  };
  const accessToken = localStorage.getItem('accessToken');
  const fullName = localStorage.getItem('FullName');
  const email = localStorage.getItem('Email');
  const password = localStorage.getItem('Password');

  useEffect(()=>{
    if(accessToken === null){
      history.push("/signup")
   }
 }, [accessToken])
  return (
    <div className='profile1'>
      <h1 style={{fontWeight:800}}>Profile</h1>
      <br/>
      <div  style={{fontWeight:650}}>Full Name : {fullName}</div>
      <br/>
      <div  style={{fontWeight:650}}>Email Address : {email}</div>
      <br/>
      <div  style={{fontWeight:650}}>Password : {password}</div>
     
      <button style={{width:'110px', margin:'20px', marginLeft: '0px'}} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
