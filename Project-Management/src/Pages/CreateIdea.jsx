import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import Tabs from "../components/Tabs";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "../Config/firebase";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateIdea() {
  const [addMoreStudents, setAddMoreStudents] = useState(false);
  const [addMoreStudentsSecond, setAddMoreStudentsSecond] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [projectData, setProjectData] = useState({});
  const [error, setError] = useState("");
  const [student1, setStudent1] = useState("")
  const [student2, setStudent2] = useState("")
  const [student3, setStudent3] = useState("")

const {currentUser} = useContext(AuthContext)

  const setStudentInput = () => {
    firstClick ? setAddMoreStudents(true) : setAddMoreStudentsSecond(true);
    setFirstClick(false);
  };
  const handelInput = (e) => {
    if (!e.target.value.trim()) {
      setError("الرجاء التحقق من المدخلات");
    } else {
      setError("");
      setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }
  };

 
const submitIdea = ()=>{
   setProjectData({...projectData, projectStatus:"قيد المعالجة"})
   setProjectData({...projectData, userId: currentUser.uid})
   setProjectData({...projectData, projectStudents:[student1,student2,student3] })

   addToDb()
}
const addToDb = async()=>{
try{
   await addDoc(collection(db,"projectIdeas"), {
    projectStudents: [student1,student2,student3],
    projectTitle: projectData.projectTitle,
    projectDescription: projectData.projectDescription,
    userId: currentUser.uid,
    projectStatus:"قيد المعالجة",
   }).then(()=>{
    notifySuccess("تم إرسال الفكرة بنجاح وهي الان قيد المراجعة")
   })
}catch(error){
    console.log(error)
}
}
const notifySuccess = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
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
      <NavBar title={"حساب الطالب"}></NavBar>
      <Tabs currentTab={2}></Tabs>
      <div className="w-full flex items-center justify-center p-5">
        <div className="card w-96 bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">إضافة فكرة</h2>
            <label>اسم الفكرة</label>
            <input
              className="input "
              type="text"
              name="projectTitle"
              placeholder="اسم الفكرة"
              onChange={handelInput}
            ></input>
            <label>وصف الفكرة</label>
            <textarea
              className="textarea"
              type="text"
              name="projectDescription"
              placeholder="شرح الفكرة"
              onChange={handelInput}
            />
            <label>الطلاب المساهمين</label>
            <input className="input" placeholder="إسم الطالب" onChange={(e)=>{setStudent1(e.target.value)}}></input>
            <input
              className={`input ${addMoreStudents ? "visible" : "hidden"} ` }
              placeholder="اسم الطالب الثاني"
              onChange={(e)=>{setStudent2(e.target.value)}}
            ></input>
            <input
              className={`input ${
                addMoreStudentsSecond ? "visible" : "hidden"
              } `}
              placeholder="اسم الطالب الثالث"
              onChange={(e)=>{setStudent3(e.target.value)}}
            ></input>
            <button
              className={`btn ${addMoreStudentsSecond ? "hidden" : "visible"}`}
              onClick={setStudentInput}
            >
              اضافة طالب اخر
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>

            <div className="card-actions justify-end w-full">
                <small className="text-red-500">{error}</small>
              <button className="btn btn-primary w-full" onClick={submitIdea}>إرسال</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateIdea;
