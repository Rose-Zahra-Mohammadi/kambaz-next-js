import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  userId: string;
  courseId: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      const { userId, courseId } = action.payload;
      const exists = state.enrollments.find(e => e.userId === userId && e.courseId === courseId);
      if (!exists) state.enrollments.push({ userId, courseId });
    },
    unenrollCourse: (state, action: PayloadAction<{ userId: string; courseId: string }>) => {
      state.enrollments = state.enrollments.filter(
        e => !(e.userId === action.payload.userId && e.courseId === action.payload.courseId)
      );
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    }
  }
});

export const { enrollCourse, unenrollCourse, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
