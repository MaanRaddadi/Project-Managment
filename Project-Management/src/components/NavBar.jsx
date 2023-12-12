import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../Config/firebase";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Theme from "./Theme";
function NavBar({ title }) {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
        
      <div className="flex-none gap-2">
      <Theme></Theme>
        <p>{currentUser.displayName}</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={`${currentUser.photoURL}`}
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/user"} className="justify-between">
                معلومات الحساب
              </Link>
            </li>

            <li>
              <button
                onClick={() => {
                  signOut(auth);
                  navigate("/login");
                }}
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
