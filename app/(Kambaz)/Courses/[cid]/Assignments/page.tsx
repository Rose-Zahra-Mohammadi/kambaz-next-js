"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as db from "../../../Database";
import { BsGripVertical, BsCaretRightFill } from "react-icons/bs"; 
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, DropdownItem, Modal } from "react-bootstrap";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";

type Assignment = {
  _id?: string;
  title: string;
  course: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  description?: string;
}

// Helper function to format date without timezone issues
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  // Parse the date string as local date to avoid timezone conversion
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const reduxAssignments = useSelector((state: RootState) => state.assignmentReducer.assignments);
  const dbAssignments = db.assignments.filter(a => a.course === cid);
  const reduxFiltered = reduxAssignments.filter(a => a.course === cid);
  
  // Get all assignment IDs that exist in Redux (including deleted ones from initial state)
  const reduxAssignmentIds = new Set(reduxAssignments.map(a => a._id));
  const initialReduxIds = new Set(db.assignments.map(a => a._id));
  
  // Combine assignments: prioritize Redux (updated) assignments, then add DB assignments that don't exist in Redux
  // But exclude DB assignments that were deleted from Redux (were in initial state but no longer in Redux)
  // Create a map to ensure Redux assignments override DB assignments
  const assignmentMap = new Map<string, Assignment>();
  
  // First, add all Redux assignments (these are the most up-to-date)
  reduxFiltered.forEach(assignment => {
    assignmentMap.set(assignment._id || "", assignment);
  });
  
  // Then, add DB assignments only if they don't exist in Redux and weren't deleted
  dbAssignments.forEach(dbAssignment => {
    const wasInInitialState = initialReduxIds.has(dbAssignment._id || "");
    const isStillInRedux = reduxAssignmentIds.has(dbAssignment._id || "");
    const isNotInMap = !assignmentMap.has(dbAssignment._id || "");
    
    // Only add from DB if: it wasn't in initial state, OR it's still in Redux, OR it's a new DB assignment
    if (isNotInMap && (!wasInInitialState || isStillInRedux)) {
      assignmentMap.set(dbAssignment._id || "", dbAssignment);
    }
  });
  
  const assignments: Assignment[] = Array.from(assignmentMap.values());
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (assignmentId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (isFaculty && assignmentId) {
      setAssignmentToDelete(assignmentId);
      setShowDeleteDialog(true);
    }
  };

  const handleConfirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDeleteDialog(false);
      setAssignmentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      <Modal show={showDeleteDialog} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <AssignmentControlButtons />
      </div>
      
      <Dropdown className="w-100">
        <ListGroup id="wd-assignment-list" className="w-100">
          <DropdownToggle 
            as={ListGroupItem} 
            variant="secondary" 
            className="wd-assignment-list-item d-flex justify-content-between align-items-center bg-secondary border-0 w-100 wd-no-caret" 
            id="wd-assignment-dropdown-toggle"
          >
            <div className="d-flex align-items-center">
              <BsCaretRightFill className="me-2 fs-5" style={{ color: 'black' }} /> 
              <strong>ASSIGNMENTS</strong>
            </div>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" className="me-2 rounded-pill">40% of Total</Button>
              <span className="me-2">+</span>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </DropdownToggle>

          <DropdownMenu className="w-100 mt-0" style={{ 
            transform: 'translate3d(0px, 0px, 0px) !important', 
            left: '0 !important', 
            right: '0 !important',
            borderLeft: '4px solid green'
          }}>
            {assignments.map((assignment, index) => (
              <div key={assignment._id}>
                <DropdownItem 
                  className="wd-assignment-list-item" 
                  style={{ whiteSpace: 'normal', padding: '10px 15px', cursor: 'pointer' }}
                  onClick={() => router.push(`/Courses/${cid}/Assignments/${assignment._id}`)}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" /> 
                      <FaPenToSquare className="me-2 text-success" />
                      <div>
                        <strong>{assignment.title}</strong>
                        <div className="text-muted small">
                          <span className="text-danger">Multiple Modules</span> | 
                          {assignment.availableDate && (
                            <> Not available until {new Date(assignment.availableDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</>
                          )}
                          {assignment.dueDate && (
                            <> | Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</>
                          )}
                          {assignment.points && (
                            <> | {assignment.points} pts</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {isFaculty && (
                        <FaTrash 
                          className="text-danger me-2 mb-1" 
                          onClick={(e) => handleDeleteClick(assignment._id || "", e)}
                          style={{ cursor: 'pointer' }}
                        />
                      )}
                      <LessonControlButtons />
                    </div>
                  </div>
                </DropdownItem>
                {index < assignments.length - 1 && <Dropdown.Divider />}
              </div>
            ))}
          </DropdownMenu>
        </ListGroup>   
      </Dropdown>
    </div>
  );
}
