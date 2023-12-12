import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../Config/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminIdeaCard({ project, loadingState }) {
  const [currentProject, setCurrentProject] = useState({
    projectTitle: "",
    projectDescription: "",
  });
  const [loading, setLoading] = useState(2);
  const [rejectMsg, setRejectMsg] = useState("");
  const editModal = (selectedProject) => {
    setCurrentProject(selectedProject);
    document.getElementById("my_modal_3").showModal();
  };
  const handelEditRequest = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "projectIdeas", currentProject.id), {
        projectTitle: currentProject.projectTitle,
        projectDescription: currentProject.projectDescription,
        projectStatus: currentProject.projectStatus,
        projectStudents: currentProject.projectStudents,
        userId: currentProject.userId,
      }).then((res) => {
        document.getElementById("my_modal_3").close();
        notifySuccess("تم تحديث الفكرة بنجاح");
        setLoading(false);
        setTimeout(() => {
          loadingState();
        }, 4000);
      });
    } catch (error) {
      console.log(error);
      error ? notifyError() : "";
    }
  };

  const deleteIdea = async (project) => {
try{
    await deleteDoc(doc(db, "projectIdeas", project.id)).then(()=>{
    notifySuccess("تم حذف الفكرة")
    setTimeout(() => {
        loadingState();
      }, 4000);
    })
} catch(error){
    console.log(error)
}
  };

  const acceptIdea = async (project) => {
    setLoading(true);

    try {
      await updateDoc(doc(db, "projectIdeas", project.id), {
        projectStatus: "مقبول",
        rejectMeassage: deleteField(),
      }).then((res) => {
        notifySuccess("تم قبول الفكرة");
        setLoading(false);
        setTimeout(() => {
          loadingState();
        }, 4000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rejectIdea = async (project) => {
    try {
      await updateDoc(doc(db, "projectIdeas", project.id), {
        projectStatus: "مرفوض",
        rejectMeassage: rejectMsg,
      }).then(() => {
        notifySuccess("تم تعديل حالة الفكرة إلى رفض ");
        document.getElementById("my_modal_4").close();
        setTimeout(() => {
            loadingState();
          }, 4000);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const rejectModal = (project) => {
    setCurrentProject(project);
    document.getElementById("my_modal_4").showModal();
  };

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
  const notifyError = () => {
    toast.warn("حدث خطأ", {
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
      <div className="card w-96    min-h-80 bg-base-300 shadow-xl  transition-all max-sm:w-72 hover:bg-base-200">
        <div className="card-body">
          <h2 className="card-title">{project.projectTitle}</h2>
          <p className="break-words	">{project.projectDescription}</p>
          <div className="flex gap-1 w-full">
            {project.projectStudents.map((student, index) => {
              return (
                <div className="badge p-3" key={index}>
                  {student}
                </div>
              );
            })}
          </div>
          <div className="card-actions justify-center  flex-wrap mt-2 items-center    ">
            <button
              className="btn btn-success btn-sm"
              onClick={() => acceptIdea(project)}
            >
              <span className="max-sm:hidden">قبول</span>
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
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                editModal(project);
              }}
              className="btn btn-warning btn-sm"
            >
              <span className="max-sm:hidden">تعديل</span>
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <button
              className="btn btn-error btn-sm "
              onClick={() => rejectModal(project)}
            >
              <span className="max-sm:hidden">رفض </span>
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
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </button>
            <button className="btn btn-error btn-sm" onClick={()=> deleteIdea(project)}>
              <span className="max-sm:hidden">حذف</span>
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*Edit Modal */}
      {currentProject && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-base-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex flex-col">
              <h1 className="text-center text-lg font-bold">تعديل الفكرة</h1>
              <label className="mt-3">عنوان الفكرة</label>
              <input
                className="input mt-1"
                value={currentProject.projectTitle}
                onChange={(e) => {
                  setCurrentProject({
                    ...currentProject,
                    projectTitle: e.target.value,
                  });
                }}
              ></input>
              <label className="mt-3">وصف الفكرة</label>
              <textarea
                className="input mt-1 h-24"
                value={currentProject.projectDescription}
                onChange={(e) => {
                  setCurrentProject({
                    ...currentProject,
                    projectDescription: e.target.value,
                  });
                }}
              ></textarea>
              <div className="w-full flex justify-center items-center flex-col mt-3 ">
                <button
                  className="btn btn-success w-24"
                  onClick={handelEditRequest}
                >
                  حفظ وإرسال
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
      {/*reject Modal */}
      {currentProject && (
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box bg-base-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex flex-col">
              <h1 className="text-center text-lg font-bold">رفض الفكرة</h1>

              <label className="mt-3">سبب الرفض</label>
              <textarea
                className="input mt-1 h-24"
                placeholder="سبب الرفض"
                name="rejectMeassage"
                onChange={(e) => {
                  setRejectMsg(e.target.value);
                }}
              ></textarea>
              <div className="w-full flex justify-center items-center flex-col mt-3 ">
                <button
                  className="btn btn-success w-24"
                  onClick={() => rejectIdea(project)}
                >
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default AdminIdeaCard;
