"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import * as client from "../../client";
import { BsGripVertical, BsCaretRightFill } from "react-icons/bs"; 
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, DropdownItem, Modal } from "react-bootstrap";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const assignments = useSelector((state: RootState) => state.assignmentReducer.assignments)
    .filter(a => a.course === cid);

  const fetchAssignments = useCallback(async () => {
    try {
      const fetchedAssignments = await client.fetchAssignmentsForCourse(cid as string);
      dispatch(setAssignments(fetchedAssignments));
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (assignmentId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (isFaculty && assignmentId) {
      setAssignmentToDelete(assignmentId);
      setShowDeleteDialog(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await client.deleteAssignment(assignmentToDelete);
        // Refresh assignments from server
        await fetchAssignments();
        setShowDeleteDialog(false);
        setAssignmentToDelete(null);
      } catch (error) {
        console.error("Failed to delete assignment:", error);
        alert("Failed to delete assignment. Please try again.");
      }
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
