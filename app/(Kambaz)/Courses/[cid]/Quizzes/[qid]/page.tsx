"use client"
export default function QuizEditor() {
    return (
        <div id="wd-quizzes-editor">
            <label htmlFor="wd-name">Quiz Name</label><br />
            <input id="wd-name" defaultValue="Quiz 1 - React Basics" /><br /><br />
            <textarea id="wd-description">
                This quiz covers React fundamentals including components, props, state, and hooks.
                You will have 30 minutes to complete the quiz. It consists of multiple choice and true/false questions.
                Review the lecture notes and readings before taking the quiz.
            </textarea>
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" defaultValue={50} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label>Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="1">Assignements</option>
                            <option value="2" selected>Quizzes</option>
                            <option value="3">Exams</option>
                            <option value="4">Labs</option>
                            <option value="5">Projects</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">

                        <label htmlFor="wd-points">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="1">Percentage</option>
                            <option value="2">Points</option>
                            <option value="3">Complete/Incomplete</option>
                            <option value="4">Letter Grade</option>
                            <option value="5">GPA Scale</option>
                        </select>

                    </td>
                </tr>
                <td align="right" valign="top">

                    <label htmlFor="wd-points">Submission type</label>
                </td>
                <td>
                    <select id="wd-submission-type">
                        <option value="1">Online</option>
                        <option value="2">On Paper</option>
                        <option value="3">External Tool</option>
                    </select><br /><br />
                    <label>Online Entry Options</label><br />

                    <input id="wd-text-entry" type="checkbox" />
                    <label>Text Entry</label><br />

                    <input id="wd-website-url" type="checkbox" />
                    <label>Website URL</label><br />

                    <input type="checkbox" />
                    <label>Media URL</label><br />

                    <input id="wd-media-recordings" type="checkbox" />
                    <label>Media Recordings</label><br />

                    <input id="wd-student-annotation" type="checkbox" />
                    <label>Student Annotation</label><br />

                    <input id="wd-file-upload" type="checkbox" />
                    <label>File Uploads</label>
                </td>



                <tr>
                    <td align="right" valign="top">
                        <label>Assign to</label>
                    </td>
                    <td>
                        <input id="wd-assign-to" defaultValue={'Everyone'} />
                    </td>
                </tr><br />
                <tr>
                    <td align="right" valign="top">
                        <label>Due</label>
                    </td>
                    <td>
                        <input id="wd-due-date" defaultValue="2025-05-25" type="date" />
                    </td>
                </tr><br />
                <tr>
                    <td align="right" valign="top">
                        <label>Available from</label>
                    </td>
                    <td>
                        <input id="wd-available-from" defaultValue="2025-05-01" type="date" />
                    </td>
                    <td>
                        <label>Until</label>
                    </td>
                    <td>
                        <input id="wd-available-until" defaultValue="2025-05-25" type="date" />
                    </td>
                </tr>
                <button>Save</button>
                <button>Cancel</button>
            </table>
        </div>
    );
}

