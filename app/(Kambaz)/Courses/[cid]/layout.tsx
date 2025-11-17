"use client";
import { ReactNode, useEffect } from "react";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout(
  { children }: { children: ReactNode }) {
 const { cid } = useParams()  as { cid: string };
 const router = useRouter();
 const { courses } = useSelector((state: RootState) => state.coursesReducer);
 const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
 const enrollments = useSelector((state: RootState) => state.enrollmentsReducer.enrollments);
 const course = courses.find((course) => course._id === cid);
 
 const isFaculty = currentUser?.role === "FACULTY";
 const isEnrolled = enrollments.some(
   e => e.userId === currentUser?._id && e.courseId === cid
 );
 
 // Protect route: redirect to Dashboard if not enrolled and not faculty
 useEffect(() => {
   if (currentUser && !isFaculty && !isEnrolled) {
     router.push("/Dashboard");
   }
 }, [currentUser, isFaculty, isEnrolled, router]);
 
 // Don't render if user shouldn't have access
 if (currentUser && !isFaculty && !isEnrolled) {
   return null;
 }
 
 return (
   <div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course?.name}
       <Breadcrumb course={course}/>
  </h2>
 
   <hr />
 
  <div className="d-flex">
    <div className="d-none d-md-block">
      <CourseNavigation params ={{cid}}/>
    </div>
    <div className="flex-fill">
      {children}
    </div></div>
   </div>
);}

