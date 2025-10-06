"use client"

import { Button, FormControl, FormLabel, FormSelect, FormCheck } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="mb-3">
                <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
            </div>
            
            <div className="mb-3">
                <FormLabel htmlFor="wd-description">Description</FormLabel>
                <FormControl as="textarea" id="wd-description" rows={5}>
                    The assignment is available online Submit a link to the landing page of your web application running on Netlify.
                    The landing page should include the following: Your full name and section Link to the Kanbas application.
                    Links to all relevent source code repositories.
                    The kanbas application should include a link to navigate back to the landing page.
                </FormControl>
            </div>
            
            <div className="row mb-3">
                <div className="col-md-6">
                    <FormLabel htmlFor="wd-points">Points</FormLabel>
                    <FormControl id="wd-points" defaultValue={100} />
                </div>
            </div>
            
            <div className="row mb-3">
                <div className="col-md-6">
                    <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
                    <FormSelect id="wd-group">
                        <option value="1">Assignments</option>
                        <option value="2">Quizzes</option>
                        <option value="3">Exams</option>
                        <option value="4">Labs</option>
                        <option value="5">Projects</option>
                    </FormSelect>
                </div>
            </div>
            
            <div className="row mb-3">
                <div className="col-md-6">
                    <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
                    <FormSelect id="wd-display-grade-as">
                        <option value="1">Percentage</option>
                        <option value="2">Points</option>
                        <option value="3">Complete/Incomplete</option>
                        <option value="4">Letter Grade</option>
                        <option value="5">GPA Scale</option>
                    </FormSelect>
                </div>
            </div>
            
            <div className="row mb-3">
                <div className="col-md-8">
                    <FormLabel htmlFor="wd-submission-type">Submission type</FormLabel>
                    <div className="border p-3 bg-light rounded">
                        <FormSelect id="wd-submission-type" className="mb-3">
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
            
            <div className="row mb-3">
                <div className="col-md-8">
                    <FormLabel htmlFor="wd-assign-to">Assign</FormLabel>
                    <div className="border p-3 bg-light rounded">
                        <FormLabel className="fw-bold mb-2">Assign to</FormLabel>
                        <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />
                        
                        <div className="row">
                            <div className="col-md-6">
                                <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                                <FormControl id="wd-due-date" defaultValue="2025-05-25" type="date" />
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                                <FormControl id="wd-available-from" defaultValue="2025-05-01" type="date" />
                            </div>
                            <div className="col-md-6">
                                <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                                <FormControl id="wd-available-until" defaultValue="2025-05-25" type="date" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-8">
                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <Button variant="secondary">Cancel</Button>
                        <Button variant="danger">Save</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
