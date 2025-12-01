import Link from "next/link";

export default async function Exams({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  return (
    <div id="wd-exams">
      <input placeholder="Search for Exams"
             id="wd-search-exam" />
      <button id="wd-add-exam-group">+ Group</button>
      <button id="wd-add-exam">+ Exam</button>
      <h3 id="wd-exams-title">
        EXAMS 30% of Total <button>+</button> </h3>
      <ul id="wd-exam-list">
        <li className="wd-exam-list-item">
          <Link href={`/Courses/${cid}/Exams/123`}
             className="wd-exam-link" >
            Midterm Exam
          </Link> </li>
          Multiple Modules | Not available until May 15 at 12:00am | Due May 20 at 11:59pm | 100 pts
        <li className="wd-exam-list-item">
          <Link href={`/Courses/${cid}/Exams/124`}
             className="wd-exam-link" >
            Final Exam
          </Link> 
        </li>
        Multiple Modules | Not available until May 25 at 12:00am | Due May 30 at 11:59pm | 200 pts
      </ul>
    </div>
);}
