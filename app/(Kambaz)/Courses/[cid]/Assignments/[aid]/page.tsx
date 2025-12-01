"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setAssignments } from "../reducer";
import * as db from "../../../../Database"
import * as client from "../../../client";
import { FormControl, FormLabel, FormSelect, FormCheck, Button } from "react-bootstrap";
import { RootState } from "../../../../store";

export default function AssignmentEditor() { 
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  
  const assignments = useSelector((state: RootState) => state.assignmentReducer.assignments);
  const existingAssignment = assignments.find(assignment => assignment._id === aid) || 
                             db.assignments.find(assignment => assignment._id === aid);

  const [assignment, setAssignment] = useState(
    existingAssignment || {
      _id: aid as string,
      title: "",
      course: cid as string,
      dueDate: "",
      points: 100,
      description: "",
      untilDate: "",
      availableDate: ""
    }
  );

  useEffect(() => {
    const loadAssignment = async () => {
      if (aid && aid !== "new") {
        try {
          const fetchedAssignment = await client.fetchAssignmentById(aid as string);
          if (fetchedAssignment) {
            setAssignment(fetchedAssignment);
          }
        } catch {
          // If not found in API, try Redux or local DB
          const found = assignments.find(a => a._id === aid) || 
                        db.assignments.find(a => a._id === aid);
          if (found) {
            setAssignment(found);
          }
        }
      }
    };
    loadAssignment();
  }, [aid, assignments]);

  const handleSave = async () => {
    if (!isFaculty) return; // block students

    const assignmentToSave = {
      ...assignment,
      _id: assignment._id || aid as string,
      course: cid as string,
      title: assignment.title || "New Assignment",
      description: assignment.description || "",
      points: assignment.points || 100,
      dueDate: assignment.dueDate || "",
      availableDate: (assignment as any).availableDate || "",
      untilDate: (assignment as any).untilDate || "",
    };

    try {
      // Check if assignment already exists
      const existingInRedux = assignments.find(a => a._id === assignmentToSave._id);
      const existingInDb = db.assignments.find(a => a._id === assignmentToSave._id);
      
      if (existingInRedux || existingInDb) {
        // Existing assignment - update it
        await client.updateAssignment(assignmentToSave._id, assignmentToSave);
      } else {
        // New assignment - create it
        await client.createAssignment(cid as string, assignmentToSave);
      }
      // Refresh assignments list after save
      const updatedAssignments = await client.fetchAssignmentsForCourse(cid as string);
      dispatch(setAssignments(updatedAssignments));
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  }
  
  if (!assignment) {
    return <div className="m-4 text-danger">Assignment not found.</div>;
  }
  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Assignment Name */}
      <div className="row mb-3">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl id="wd-name"
            type="text"
            value={assignment.title}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            readOnly={!isFaculty} />
        </div>
      </div>

      {/* Description */}
      <div className="row mb-3 align-items-start">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-description">Description</FormLabel>
        </div>
        <div className="col-md-8">
          <FormControl
            id="wd-description"
            as="textarea"
            rows={8}
            value={assignment.description || ""}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            readOnly={!isFaculty}
            placeholder="Enter assignment description..."
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </div>
        <div className="col-md-8">
          <FormControl id="wd-points" value={assignment.points || 100}
            type="number"
            onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
            readOnly={!isFaculty} />
        </div>
      </div>

      {/* Assignment Group */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </div>
        <div className="col-md-8">
          <FormSelect id="wd-group" defaultValue="1">
            <option value="1">Assignments</option>
            <option value="2">Quizzes</option>
            <option value="3">Exams</option>
            <option value="4">Labs</option>
            <option value="5">Projects</option>
          </FormSelect>
        </div>
      </div>

      {/* Display Grade As */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </div>
        <div className="col-md-8">
          <FormSelect id="wd-display-grade-as" defaultValue="1">
            <option value="1">Percentage</option>
            <option value="2">Points</option>
            <option value="3">Complete/Incomplete</option>
            <option value="4">Letter Grade</option>
            <option value="5">GPA Scale</option>
          </FormSelect>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3 align-items-start">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </div>
        <div className="col-md-8">
          <div className="border p-3 bg-light rounded">
            <FormSelect id="wd-submission-type" className="mb-3" defaultValue="1">
              <option value="1">Online</option>
              <option value="2">On Paper</option>
              <option value="3">External Tool</option>
            </FormSelect>

            <div>
              <FormLabel className="fw-bold mb-2">Online Entry Options</FormLabel>
              <div>
                <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-1" />
                <FormCheck type="checkbox" id="wd-website-url" label="Website URL" className="mb-1" />
                <FormCheck type="checkbox" id="wd-media-url" label="Media URL" className="mb-1" />
                <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-1" />
                <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-1" />
                <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Section */}
      <div className="row mb-3 align-items-start">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-assign-to">Assign</FormLabel>
        </div>
        <div className="col-md-8">
          <div className="border p-3 bg-light rounded">
            <FormLabel className="fw-bold mb-2">Assign to</FormLabel>
            <FormControl id="wd-assign-to" value="Everyone" className="mb-3" />

            <div className="row mb-3">
              <div className="col-md-12">
                <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                <FormControl
                  id="wd-due-date"
                  value={assignment.dueDate || ""}
                  type="date"
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                  disabled={!isFaculty}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 pe-2">
                <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                <FormControl
                  id="wd-available-from"
                  value={(assignment as any).availableDate || ""}
                  type="date"
                  onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })}
                  disabled={!isFaculty}
                />
              </div>
              <div className="col-md-6 ps-2">
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  value={(assignment as any).untilDate || ""}
                  type="date"
                  onChange={(e) => setAssignment({ ...assignment, untilDate: e.target.value })}
                  disabled={!isFaculty}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={() => router.push(`/Courses/${cid}/Assignments`)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>

  );

}
