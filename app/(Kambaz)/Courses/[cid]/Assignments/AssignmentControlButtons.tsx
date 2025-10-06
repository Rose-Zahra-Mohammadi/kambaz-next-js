import { Button, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
export default function AssignmentControlButtons() {
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
