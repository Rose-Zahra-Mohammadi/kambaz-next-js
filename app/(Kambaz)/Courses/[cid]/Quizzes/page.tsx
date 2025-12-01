import Link from "next/link";

export default async function Quizzes({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  return (
    <div id="wd-quizzes">
      <input placeholder="Search for Quizzes"
             id="wd-search-quiz" />
      <button id="wd-add-quiz-group">+ Group</button>
      <button id="wd-add-quiz">+ Quiz</button>
      <h3 id="wd-quizzes-title">
        QUIZZES 10% of Total <button>+</button> </h3>
      <ul id="wd-quiz-list">
        <li className="wd-quiz-list-item">
          <Link href={`/Courses/${cid}/Quizzes/123`}
             className="wd-quiz-link" >
            Quiz 1 - React Basics
          </Link> </li>
          Multiple Modules | Not available until May 5 at 12:00am | Due May 8 at 11:59pm | 50 pts
        <li className="wd-quiz-list-item">
          <Link href={`/Courses/${cid}/Quizzes/124`}
             className="wd-quiz-link" >
            Quiz 2 - State Management
          </Link> 
        </li>
        Multiple Modules | Not available until May 12 at 12:00am | Due May 15 at 11:59pm | 50 pts
        <li className="wd-quiz-list-item">
          <Link href={`/Courses/${cid}/Quizzes/125`}
             className="wd-quiz-link" >
            Quiz 3 - API Integration
          </Link> 
        </li>
        Multiple Modules | Not available until May 19 at 12:00am | Due May 22 at 11:59pm | 50 pts
      </ul>
    </div>
);}
