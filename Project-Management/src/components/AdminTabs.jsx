import React from 'react'
import { Link } from 'react-router-dom'
function AdminTabs({currentTab}) {
  return (
    <div role="tablist" className="tabs tabs-bordered tabs-lg max-sm:tabs-md transition-all">
    <div role="tab" className={`tab  flex ${currentTab== 1 ? "tab-active":""} transition-all `}>
      <Link to={"/Admin/Main"}>
    الرئيسية
      </Link>
    </div>
    <div role="tab" className={`tab  flex ${currentTab== 2 ? "tab-active":""} transition-all `}>
    <Link to={"/Admin/studentList"}>الطلاب</Link>  
    </div>
    
  </div>
  )
}

export default AdminTabs