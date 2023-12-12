import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
const {currentUser} = useContext(AuthContext)
const navigate = useNavigate();
  return (
    <div className='w-full flex justify-center items-center p-24'>
        <div className="card w-96  shadow-xl flex flex-col items-center p-5 justify-center bg-base-300 relative">
        <div className="avatar">
  <div className="w-24 rounded-full">
    <img src={`${currentUser.photoURL}`} />
  </div>
</div>
  <div className="card-body flex flex-col justify-center items-center">
    <h2 className=" text-center">اسم المستخدم: </h2>
    <h2 className='font-bold text-lg'>{currentUser.displayName}</h2>
    <h2 className=" text-center">البريد الإلكتروني: </h2>
    <h2 className='font-bold text-lg'>{currentUser.email}</h2>

    <div className="card-actions justify-end">
     <button onClick={()=>{
        navigate(-1)
     }} className='btn bg-base-300 border-none absolute top-3 left-5'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
</svg>
</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserProfile