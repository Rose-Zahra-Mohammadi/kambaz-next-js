export default function Modules() {
  return (
    <div>
  
      <button>Collapse All</button>{' ' }
      <button>View Progress</button> {' '}
      <select>
        <option value="default">Publish All</option>
      </select>
      <button>+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Intro</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
          </ul>
        </li>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces</li>
              </ul>
            </li>
          </ul>
              <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 2 - Formating User Interfaces with HTML</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user Interfaces with HTML</li>
                <li className="wd-content-item">Deploy the assignment to Netify</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Intro</li>
                <li className="wd-content-item">Format</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 3 - Learning CSS</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to style user interfaces with CSS</li>
                <li className="wd-content-item">Understand the box model</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">CSS Basics</li>
                <li className="wd-content-item">Box Model</li>
              </ul>
            </li>
          </ul>  
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 4, TypeScript</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn about JavaScript</li>
                <li className="wd-content-item">Learn about TypeScript</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">JavaScript</li>
                <li className="wd-content-item">TypeScript</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
