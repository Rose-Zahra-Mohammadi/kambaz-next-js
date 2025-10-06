import { Button } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
export default function AssignmentControlButtons() {
    return (
        <div className="d-flex align-items-center justify-content-between w-100">
            <FormControl placeholder="Search..." style={{ width: '300px' }} id="wd-search-assignment" />
            <div className="d-flex">
                <Button variant="danger" size="lg" className="me-2" id="wd-add-assignment" >
                    + Assignment
                </Button>
                <Button variant="secondary" size="lg" id="wd-add-assignment-group">
                    + Group
                </Button>
            </div>
        </div>
    );
}
