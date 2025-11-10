import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { v4 as uuidv4 } from "uuid";

export interface Course {
  _id: string;
  name: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
}

interface CoursesState {
  courses: Course[];
}


const initialState: CoursesState = {
 courses: courses,
};
const coursesSlice = createSlice({
 name: "courses",
 initialState,
 reducers: {
   addNewCourse: (state, { payload: course }) => {
     const newCourse = { ...course, _id: uuidv4() };
     state.courses.push(newCourse);
   },
   deleteCourse: (state, { payload: courseId }) => {
     state.courses = state.courses.filter(
       (course) => course._id !== courseId
     );
   },
   updateCourse: (state, { payload: course }) => {
     state.courses = state.courses.map((c) =>
       c._id === course._id ? course : c
     );
   },
   setCourses: (state, { payload: courses }) => {
     state.courses = courses;
   },
 },
});
export const { addNewCourse, deleteCourse, updateCourse } =
 coursesSlice.actions;
export default coursesSlice.reducer;