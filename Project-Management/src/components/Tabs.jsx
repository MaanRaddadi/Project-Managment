import React from 'react'
import { Link } from 'react-router-dom'
function Tabs({currentTab}) {
    
  return (
    <div role="tablist" className="tabs tabs-bordered tabs-lg max-sm:tabs-md">
    <div role="tab" className={`tab  flex ${currentTab== 1 ? "tab-active":""} `}>
      <Link to={"/studentMain/ideas"}>
      
    الرئيسية
      </Link>
    </div>
    <div role="tab" className={`tab  flex ${currentTab== 2 ? "tab-active":""} `}>
    <Link to={"/studentsMain/createIdea"}>إنشاء فكرة جديدة</Link>  
    </div>
    <div role="tab" className={`tab  flex ${currentTab== 3 ? "tab-active":""}`}>
      <Link to={"/studentsMain/personalRequestes"}>طلباتي</Link>
    </div>
  </div>
  )
}

export default Tabs