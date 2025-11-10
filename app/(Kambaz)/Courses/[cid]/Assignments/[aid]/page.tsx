"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, deleteAssignment, updateAssignment } from "../reducer";
import Link from "next/link";
import * as db from "../../../../Database"
import { FormControl, FormLabel, FormSelect, FormCheck } from "react-bootstrap";
import { RootState } from "../../../../../(Kambaz)/store";

interface User {
  _id: string;
  name: string;
  email?: string;
  role: "STUDENT" | "FACULTY" | string;
}

export default function AssignmentEditor() { 
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const existingAssignment = db.assignments.find(assignment => assignment._id === aid);

  const [assignment, setAssignment] = useState(
    existingAssignment || {
      _id: undefined,
      title: "",
      course: cid,
      dueDate: "",
      points: 100,
      description: "",
      untilDate: "",
      availableDate: ""
    }
  );

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  const handleSave = () => {
    if (!isFaculty) return; // block students


    if (assignment._id) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }

    router.push(`/Courses/${cid}/Assignments`);
  }

  const handleDelete = () => {
    if (!isFaculty || !assignment._id) return;
    dispatch(deleteAssignment(assignment._id));
    router.push(`/Courses/${cid}/Assignments`);
  }
  if (!assignment) {
    return <div className="m-4 text-danger">Assignment not found.</div>;
  }
  const highlightOnline = (text: string) =>
    text.split(/(available online)/gi).map((part, i) =>
      part.toLocaleLowerCase() === "available online" ? (
        <span key={i} style={{ color: "red", fontWeight: "bold" }}>{part}</span>

      ) : (part));

  let descriptionPart = assignment.description;
  let listItems: string[] = [];
  let afterListText = "";
  const listStartIndex = descriptionPart.indexOf("Your full name");
  const listEndIndex = descriptionPart.indexOf(
    "The kanbas application should include a link"
  );
  if (listStartIndex !== -1 && listEndIndex !== -1) {
    const beforeList = descriptionPart.substring(0, listStartIndex).trim();
    const listText = descriptionPart.substring(listStartIndex, listEndIndex).trim();
    afterListText = descriptionPart.substring(listEndIndex).trim();
    listItems = listText.split(".").map((item) => item.trim()).filter(Boolean);
    descriptionPart = beforeList;
  }
  return (
    <div id="wd-assignments-editor" className="p-4">
      {/* Assignment Name */}
      <div className="row mb-3">
        <div className="col-md-2"></div>
        <div className="col-md-4">
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
        <div className="col-md-2 text-end"></div>
        <div className="col-md-4">
          <div
            className="form-control"
            style={{
              height: "auto",
              minHeight: "120px",
              padding: "12px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #ced4da",
            }}
          >
            {highlightOnline(descriptionPart)}
            {listItems.length > 0 && (
              <ul>
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {afterListText && <p>{afterListText}</p>}
          </div>
        </div>
      </div>

      {/* Points */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-2 text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </div>
        <div className="col-md-4">
          <FormControl id="wd-points" defaultValue={assignment.points || 100}
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
        <div className="col-md-4">
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
        <div className="col-md-4">
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
        <div className="col-md-4">
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
        <div className="col-md-4">
          <div className="border p-3 bg-light rounded">
            <FormLabel className="fw-bold mb-2">Assign to</FormLabel>
            <FormControl id="wd-assign-to" value="Everyone" className="mb-3" />

            <div className="row">
              <div className="col-md-6">
                <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                <FormControl
                  id="wd-due-date"
                  defaultValue={assignment.dueDate || "2025-05-25"}
                  type="date"
                  onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                  readOnly={!isFaculty}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                <FormControl
                  id="wd-available-from"
                  defaultValue={assignment.availableDate || "2025-05-01"}
                  type="date"
                />
              </div>
              <div className="col-md-6">
                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  defaultValue={assignment.untilDate || "2025-05-25"}
                  type="date"
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
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary" onClick={handleDelete}>
              Cancel
            </Link>
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger" onClick={handleSave}>
              Save
            </Link>
          </div>
        </div>
      </div>
    </div>

  );

}
