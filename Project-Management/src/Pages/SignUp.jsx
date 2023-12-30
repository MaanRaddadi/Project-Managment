import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Config/firebase";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userInput, setUserInput] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const checkUsername = (e) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    if (!usernameRegex.test(e.target.value)) {
      setError((prev) => ({ ...prev, username: "اسم المستخدم غير صحيح" }));
    } else {
      setError((prev) => ({ ...prev, username: "" }));
      setUserInput((prev) => ({ ...prev, username: e.target.value }));
    }
  };
  const checkEmail = (e) => {
    const emailRegex = /^\w+@tuwaiq\.edu\.sa$/;
    if (!emailRegex.test(e.target.value)) {
      setError((prev) => ({
        ...prev,
        email: "يجب ان يكون نطاق البريد Tuwaiq.edu.sa",
      }));
    } else {
      setError((prev) => ({ ...prev, email: "" }));
      setUserInput((prev) => ({ ...prev, email: e.target.value }));
    }
  };

  const checkPassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(e.target.value)) {
      setError({ ...error, password: "كلمة المرور غير صحيحة" });
    } else {
      setError({ ...error, password: "" });
    }
    setUserInput({ ...userInput, password: e.target.value });
  };

  const createUser = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${userInput.username + date}`);

      const uploadTask = uploadBytesResumable(storageRef, userInput.file);
      uploadTask.on(
        (error) => {
          setError({ ...error, general: error.message });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: userInput.username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              userId: res.user.uid,
              username: userInput.username,
              email: userInput.email,
              photoURL: downloadURL,
            });
            navigate("/login");
          });
        }
      );
    } catch (error) {
      setError({ ...error, general: error.message });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left flex flex-col items-center justify-center">
          <img
            className="w-3/4 "
            src="https://i.ibb.co/0JnxnV4/pm-blog-removebg-preview.png"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">اسم المستخدم</span>
              </label>
              <input
                onChange={checkUsername}
                name="username"
                type="text"
                placeholder="إسم المستخدم"
                className="input input-bordered"
                required
              />
              <span className="text-red-500">{error.username}</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">البريد الإلكتروني</span>
              </label>
              <input
                onChange={checkEmail}
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                className="input input-bordered"
                required
              />
              <span className="text-red-500">{error.email}</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">كلمة المرور</span>
              </label>
              <input
                onChange={checkPassword}
                name="password"
                type="password"
                placeholder="كلمة المرور"
                className="input input-bordered"
                required
              />
              <span className="text-red-500">{error.password}</span>
              <label className="mt-2">صورة العرض</label>
              <input
                required
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, file: e.target.files[0] }))
                }
              />
              <label htmlFor="file">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8191/8191581.png"
                  className="w-10"
                  alt=""
                />
              </label>
              <label className="label">
                <p>
                  لديك حساب؟{" "}
                  <span className="text-primary">
                    <Link to={"/login"}>سجل دخول</Link>
                  </span>
                </p>
              </label>
            </div>
            <span className="text-red-500">{error.general}</span>
            <div className="form-control mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={createUser}
              >
                تسجيل
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
