import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import AdminTabs from '../components/AdminTabs'
import { getDocs } from 'firebase/firestore'
import { db } from '../Config/firebase'
import { collection } from 'firebase/firestore'
import UserCard from '../components/UserCard'
function StudentsList() {
const [users , setUsers] = useState([])
const [searchResults , setSearchResults] = useState([])
const [count , setCount] = useState(1)
const admins = ["DAsTZCF45fbfQmjhKoUu7rLtX053"]

useEffect(()=>{
    const getUsers = async ()=>{
        try{
            const querySnapshot  = await getDocs(collection(db, "users"));
            const filterSnapshot = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
            const filterUsers = filterSnapshot.filter(user=>{
                return !admins.includes(user.id)
            })
            setUsers(filterUsers)
            setSearchResults(filterUsers)
        }catch(error){
            console.log(error)
        }
    }
   
getUsers()  
}, [])


const searchUsers = (e)=>{
    if(e.target.value === "" ){
      setSearchResults(users)  
    } else{
        const filtered = users.filter(user=>{
            return (user.username.toLowerCase().includes(e.target.value.toLowerCase()))
        })
        setSearchResults(filtered)
    }

}
const loadingState = ()=>{
  setCount(count + 1 )
}


  return (
    <>
    <NavBar title={"حساب المدرب"}></NavBar>
    <AdminTabs currentTab={2}></AdminTabs>
    <h1 className='text-center text-lg font-bold mt-3'>قائمة الطلاب</h1>
    <div className='w-full flex justify-center items-center p-2'>
    <input type="text" placeholder="بحث بأسم الطالب" className="input input-bordered w-full max-w-xs mt-3" onChange={searchUsers} />
    </div>
    <div className='w-full flex justify-center items-center p-5 gap-10 flex-wrap'>
  {
    searchResults.map((user,index)=>{
        return (<UserCard key={index} user={user} loadingState={loadingState}></UserCard>)
    })
  }

    </div>
    </>
  )
}

export default StudentsList