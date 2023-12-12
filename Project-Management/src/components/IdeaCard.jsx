import React from "react";

function IdeaCard({ project }) {
 
  return (
    <div className="card w-96 max-w-96 min-h-80  bg-base-300 shadow-xl hover:scale-105 transition-all">
      <div className="card-body">
        <h2 className="card-title max-sm:text-lg">{project.projectTitle}</h2>
        <p className="break-words max-sm:text-sm	">{project.projectDescription}</p>
        {project.rejectMeassage !== undefined ?
         <>
         <p className="max-sm:text-sm"><span className="text-red-600 font-bold">سبب الرفض : </span>{project.rejectMeassage}</p>
         
         </>
        :"" }
        <div className="flex gap-1 w-full">
          {project.projectStudents.map((student, index) => {
            return (
              <div className="badge p-3" key={index}>
             {student}
              </div>
            );
          })}
        </div>
        <div className="card-actions justify-end ">
          {project.projectStatus ===
            "قيد المعالجة" ? (
              <span className={`badge  text-lg p-3`}>
                {project.projectStatus}
              </span>):""
            }
          {project.projectStatus ===
            "مقبول"?(
              <span className={`badge badge-success text-lg p-3`}>
                {project.projectStatus}
              </span>
            ):""}
             {project.projectStatus ===
            "مرفوض"?(
              <span className={`badge badge-error text-lg p-3`}>
                {project.projectStatus}
              </span>
            ):""}
        </div>
      </div>
    </div>
  );
}

export default IdeaCard;
