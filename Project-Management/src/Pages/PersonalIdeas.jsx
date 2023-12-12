import React, { useContext, useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Tabs from '../components/Tabs'
import IdeaCard from '../components/IdeaCard'
import { AuthContext } from '../Context/AuthContext'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Config/firebase';

function PersonalIdeas() {
const [personalIdeas, setPersonalIdeas] = useState([])
const [loading, setLoading] = useState(true)
const {currentUser} = useContext(AuthContext)

useEffect( ()=>{
  setLoading(true)
  const  getProjects = async ()=>{
    try{
      const querySnapshot = await getDocs(collection(db, "projectIdeas"));
      const filteredQuery = querySnapshot.docs.map((doc)=>({...doc.data(),id:doc.id}))
      const onlyPersonal = filteredQuery.filter((idea)=>{
      return idea.userId === currentUser.uid
      })
     
      setPersonalIdeas(onlyPersonal)
      
    }catch(error){
      setLoading(false)
      console.log(error)
     
    }
  };

getProjects();
setLoading(false)
},[])



  return (
    <>
    <NavBar title={"حساب الطالب"}></NavBar>
    <Tabs currentTab={"3"}></Tabs>
    <h1 className='text-xl text-center mt-2 font-bold'>الأفكار المرسلة</h1>
    <div className='w-full flex justify-center items-center p-5 gap-10 flex-wrap'>
      { loading && <span className="loading loading-spinner text-primary"></span>}
      {
        personalIdeas.map((idea,index)=>{
          return (<IdeaCard key={index} project={idea}></IdeaCard>)
        })
      }
    </div>
    </>
  )
}

export default PersonalIdeas