import Link from "next/link";

export default async function Project({ params }: { params: Promise<{ cid: string }> }) {
  const { cid } = await params;
  return (
    <div id="wd-projects">
      <input placeholder="Search for Projects"
             id="wd-search-project" />
      <button id="wd-add-project-group">+ Group</button>
      <button id="wd-add-project">+ Project</button>
      <h3 id="wd-projects-title">
        PROJECTS 20% of Total <button>+</button> </h3>
      <ul id="wd-project-list">
        <li className="wd-project-list-item">
          <Link href={`/Courses/${cid}/Project/123`}
             className="wd-project-link" >
            Project 1 - Web Application
          </Link> </li>
          Multiple Modules | Not available until May 10 at 12:00am | Due May 25 at 11:59pm | 150 pts
        <li className="wd-project-list-item">
          <Link href={`/Courses/${cid}/Project/124`}
             className="wd-project-link" >
            Project 2 - Full Stack Application
          </Link> 
        </li>
        Multiple Modules | Not available until May 26 at 12:00am | Due June 10 at 11:59pm | 200 pts
      </ul>
    </div>
);}
