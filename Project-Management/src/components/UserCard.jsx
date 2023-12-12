import { deleteUser } from 'firebase/auth'
import { deleteDoc } from 'firebase/firestore'
import React from 'react'
import { db } from '../Config/firebase'
import { doc } from 'firebase/firestore'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserCard({user, loadingState}) {

const deleteUser = async (user)=>{
  
    try{
        await deleteDoc(doc(db,"users",user.id)).then(()=>{
            notifySuccess("تم حذف المستخدم بنجاح")
            setTimeout(()=>{
           loadingState();
            },6000)
        })
    }catch(error){
        console.log(error)
    }

}


const notifySuccess = (msg) => {
    toast.success(msg, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      position: toast.POSITION.TOP_RIGHT,
      zIndex: 9999,
    });
  };
  const notifyError = () => {
    toast.error("حدث خطأ", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      position: toast.POSITION.TOP_RIGHT,
      zIndex: 9999,
    });
  };

  return (
    <>
    <ToastContainer></ToastContainer>
    <div className="card min-w-72 bg-base-300  shadow-xl relative ">
    <div className="card-body p-2 flex flex-row items-center ">
    <div className="avatar">
  <div className="w-14 rounded-full">
    <img src={`${user.photoURL}`}/>
  </div>
</div>
      <div className="card-actions justify-end">
         
      </div>
      <div className='flex flex-col'>
        <p className='font-bold text-lg'>{user.username}</p>
      <p>طالب</p>
      </div>
      <button onClick={()=>{deleteUser(user)}} className='btn btn-error mr-20'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button>
    </div>
  </div>
  </>
  )
}

export default UserCard