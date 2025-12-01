    import { createSlice } from "@reduxjs/toolkit";
    import { assignments } from "@/app/(Kambaz)/Database";
    import { v4 as uuidv4} from "uuid";

    export interface Assignment {
        _id: string;
        title: string;
        course: string;
        dueDate: string;
        points: number;
        description?: string;
        availableDate?: string;
        untilDate?: string;
    }

    interface AssignmentState {
        assignments: Assignment[];
    }

    const initialState: AssignmentState = {
        assignments : assignments,
    };
    const assignmentsSlice = createSlice({
        name: "assignments",
        initialState,
        reducers: {
            addAssignment: (state, { payload: assignment }) => {
                const newAssignment: Assignment = {
                    _id: uuidv4(),
                    title: assignment.title || "New Assignment",
                    course: assignment.course || "",
                    dueDate: assignment.dueDate || "",
                    points: assignment.points || 100,
                };
                state.assignments.push(newAssignment);
            },
            deleteAssignment: (state, { payload: assignmentId }) => {
                state.assignments = state.assignments.filter(
                    (m) => m._id !== assignmentId);
            },
            updateAssignment: (state, { payload: assignment }) => {
                state.assignments = state.assignments.map((a) => 
                a._id === assignment._id ? assignment : a);
            },
            setAssignments: (state, { payload: assignments }) => {
                state.assignments = assignments;
            },
        },
    });
    export const { addAssignment, deleteAssignment, updateAssignment, setAssignments} = 
    assignmentsSlice.actions;
    export default assignmentsSlice.reducer;