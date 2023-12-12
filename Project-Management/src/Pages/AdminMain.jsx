import React from 'react'
import NavBar from '../components/NavBar'
import AdminTabs from '../components/AdminTabs'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Config/firebase';
import { useEffect, useState } from 'react';
import AdminIdeaCard from '../components/AdminIdeaCard';
function AdminMain() {
  const [projects, setProjects] = useState([])
  const [count , setCount] = useState(1)
useEffect( ()=>{

  const  getProjects = async ()=>{
    try{
      const querySnapshot = await getDocs(collection(db, "projectIdeas"));
      const filteredQuery = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
      const onlyUnAccsepted = filteredQuery.filter((idea)=>{
      return idea.projectStatus !== "مقبول"
      })
      
      setProjects(onlyUnAccsepted)
      
    }catch(error){
      console.log(error)
    }
  };

getProjects();

},[count])

const loadingState = () =>{
setCount(count+1)
}

  return (
    <>

    <NavBar title={"حساب المدرب"} ></NavBar>
    <AdminTabs currentTab={1}></AdminTabs>
    <div className='w-full flex justify-center items-center p-5 gap-10 flex-wrap'>
      {projects.length === 0 ? <h1 className='text-2xl text-center'>لا توجد طلبات</h1>:""}
      {
        projects.map((project, index)=>{
          return(<AdminIdeaCard key={index} project={project} loadingState={loadingState}></AdminIdeaCard>)
        })
      }
    </div>
    </>
  )
}

export default AdminMain