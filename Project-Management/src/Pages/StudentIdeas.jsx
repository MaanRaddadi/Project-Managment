import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Tabs from '../components/Tabs'
import IdeaCard from '../components/IdeaCard'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Config/firebase';
function StudentIdeas() {
  const [projects, setProjects] = useState([])
  const [loading , setLoading] = useState(true)
useEffect( ()=>{
  setLoading(true)
  const  getProjects = async ()=>{
    try{
      const querySnapshot = await getDocs(collection(db, "projectIdeas"));
      const filteredQuery = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
      const onlyAccsepted = filteredQuery.filter((idea)=>{
      return idea.projectStatus === "مقبول"
      })
     
      setProjects(onlyAccsepted)
      
    }catch(error){
      console.log(error)
    }
  };

getProjects();
setLoading(false)
},[])
 




  return (
    <>
    <NavBar title={"حساب الطالب"}>
    </NavBar>
    <Tabs currentTab={1}></Tabs>
    <h1 className='text-xl  text-center mt-2 font-bold max-sm:text-lg'>الأفكار المقبولة </h1>
    <p className='text-center mt-1 max-sm:text-sm'>ملاحظة : يمنع ارسال طلب بفكرة مشابهة للأفكار التي في هذه القائمة, اي طلب بفكرة مكررة سيتم رفضه فورا</p>
    <div className='w-full flex justify-center items-center p-5 gap-10 flex-wrap'>
      {projects.length === 0 ? (<h1 className='text-xl font-bold'>لايوجد مشاريع مقبولة</h1>): ""}
    { loading && <span className="loading loading-spinner text-primary"></span>}
      { 
        projects.map((project,index)=>{  
        return(<IdeaCard project={project} key={index}></IdeaCard>)  
        })
      }
    </div>
    </>
  )
}

export default StudentIdeas