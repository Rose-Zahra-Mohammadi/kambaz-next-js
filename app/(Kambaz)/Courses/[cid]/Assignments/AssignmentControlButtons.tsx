"use client";
import { useParams, useRouter } from "next/navigation";
import { Button, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function AssignmentControlButtons() {
    const router = useRouter();
    const { cid } = useParams();
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";

    const handleAddAssignment = () => {
        if (!isFaculty) return;

        // Generate a new ID and navigate to editor without creating assignment yet
        const newAssignmentId = crypto.randomUUID();
        router.push(`/Courses/${cid}/Assignments/${newAssignmentId}`);
    };

  const handleAddGroup = () => {
    if (!isFaculty) return;
    alert("Add Group clicked! Implement group creation logic here.");
  };
    return (
        <div className="d-flex align-items-center justify-content-between w-100">
            <div className="position-relative" style={{ width: '300px' }}>
                <FormControl
                    placeholder="Search..."
                    style={{ paddingLeft: '35px' }}
                    id="wd-search-assignment"
                />
                <FaSearch
                    className="position-absolute top-50 translate-middle-y"
                    style={{ left: '10px', color: '#6c757d' }}
                />
            </div>
            <div className="d-flex">
                {isFaculty && (
                <>
                <Button variant="danger" size="lg" className="me-2" id="wd-add-assignment" onClick={handleAddAssignment}>
                    + Assignment
                </Button>
                <Button variant="secondary" size="lg" id="wd-add-assignment-group" onClick={handleAddGroup}>
                    + Group
                </Button>
                </>
                )}
            </div>
        </div>
    );
}
