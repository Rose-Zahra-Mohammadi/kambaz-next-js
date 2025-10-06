import Link from "next/link";
import { BsGripVertical, BsCaretRightFill} from "react-icons/bs"; 
import { FaPenToSquare } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { Button, Dropdown, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, DropdownItem, DropdownDivider } from "react-bootstrap";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <AssignmentControlButtons />
      </div>
      
      <Dropdown className="w-100">
        <ListGroup id="wd-assignment-list" className="w-100">
          <DropdownToggle 
            as={ListGroupItem} 
            variant="secondary" 
            className="wd-assignment-list-item d-flex justify-content-between align-items-center bg-secondary border-0 w-100 wd-no-caret" 
            id="wd-assignment-dropdown-toggle">
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
        <DropdownItem className="wd-assignment-list-item" style={{ whiteSpace: 'normal', padding: '10px 15px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> 
              <FaPenToSquare className="me-2 text-success" />
              <div>
                <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none">
                  <strong>A1</strong>
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <LessonControlButtons />
          </div>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem className="wd-assignment-list-item" style={{ whiteSpace: 'normal', padding: '10px 15px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> 
              <FaPenToSquare className="me-2 text-success" />
              <div>
                <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none">
                  <strong>A2</strong>
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <LessonControlButtons />
          </div>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem className="wd-assignment-list-item" style={{ whiteSpace: 'normal', padding: '10px 15px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" /> 
              <FaPenToSquare className="me-2 text-success" />
              <div>
                <Link href="/Courses/1234/Assignments/123" className="wd-assignment-link text-decoration-none">
                  <strong>A3</strong>
                </Link>
                <div className="text-muted small">
                  <span className="text-danger">Multiple Modules</span> | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts
                </div>
              </div>
            </div>
            <LessonControlButtons />
          </div>
        </DropdownItem>
            </DropdownMenu>

      </ListGroup>
      
      </Dropdown>
    </div>
  );
}