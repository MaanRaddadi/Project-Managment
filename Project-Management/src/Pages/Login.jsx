import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/firebase';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
const [userInput, setUserInput]= useState({});
const [error, setError] = useState("")
const admins = ["DAsTZCF45fbfQmjhKoUu7rLtX053"]
const navigate = useNavigate();
const setInput = (e)=>{
  setError("")
setUserInput({...userInput , [e.target.name]: e.target.value})
}
const login = ()=>{
  
signInWithEmailAndPassword(auth, userInput.email, userInput.password)
.then((userCredential) => {

  const user = userCredential.user;
 
  if(admins.includes(user.uid)){
    
navigate("/Admin/Main")
  } else{
    navigate("/studentMain/ideas")
  }
  
})
.catch((error) => {
  setError("حدث خطأ, الرجاء التأكد من المدخلات")
});
}


  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left flex flex-col items-center justify-center">
    <img className='w-3/4 ' src="https://i.ibb.co/0JnxnV4/pm-blog-removebg-preview.png"/>
    <h1 className='text-lg text-center font-bold'>اهلا بك في نظام إدارة مشاريع الطلاب </h1>
    <p className='text-center text-lg'>إدارة وتنظيم المشاريع والأفكار بين الطلاب و المدربين</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">البريد الإلكتروني</span>
          </label>
          <input onChange={setInput} name="email" type="email" placeholder="البريد الإلكتروني" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">كلمة المرور</span>
          </label>
          <input onChange={setInput} name="password" type="password" placeholder="كلمة المرور" className="input input-bordered" required />
          
          <label className="label">
            <p>ليس لديك حساب ؟ <span className="text-primary cursor-pointer" ><Link to={"/signup"}>سجل الأن</Link> </span></p>
          </label>
        </div>
        <div className="form-control mt-6">
        <span className='text-red-500 text-small mb-2'>{error}</span>
          <button className="btn btn-primary" type='button' onClick={login}>تسجيل الدخول</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login