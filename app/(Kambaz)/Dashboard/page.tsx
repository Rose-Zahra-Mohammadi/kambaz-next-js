import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt={"react"} />
            <div>
              <h5> CS1 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
             <div className="wd-dashboard-course">
          <Link href="/Courses/2" className="wd-dashboard-course-link">
            <Image src="/images/Clrs4.jpg" width={200} height={150} alt={"clrs"} />
            <div>
              <h5> CS2 CLRS </h5>
              <p className="wd-dashboard-course-title">
                Algorithems
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
               <div className="wd-dashboard-course">
          <Link href="/Courses/3" className="wd-dashboard-course-link">
            <Image src="/images/DBMS.jpg" width={200} height={150} alt={"dbms"} />
            <div>
              <h5> CS3 DBMS </h5>
              <p className="wd-dashboard-course-title">
                Database Management System
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
               <div className="wd-dashboard-course">
          <Link href="/Courses/4" className="wd-dashboard-course-link">
            <Image src="/images/ML.jpg" width={200} height={150} alt={"ml"} />
            <div>
              <h5> CS4 ML </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
               <div className="wd-dashboard-course">
          <Link href="/Courses/5" className="wd-dashboard-course-link">
            <Image src="/images/DL.jpg" width={200} height={150} alt={"dl"} />
            <div>
              <h5> CS5 DL </h5>
              <p className="wd-dashboard-course-title">
                Deep Learning
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
               <div className="wd-dashboard-course">
          <Link href="/Courses/6" className="wd-dashboard-course-link">
            <Image src="/images/pdp.jpg" width={200} height={150} alt={"pdp"} />
            <div>
              <h5> CS6 PDP </h5>
              <p className="wd-dashboard-course-title">
                Parallel Data Processing
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
               <div className="wd-dashboard-course">
          <Link href="/Courses/7" className="wd-dashboard-course-link">
            <Image src="/images/DS.jpg" width={200} height={150} alt={"ds"} />
            <div>
              <h5> CS7 DS </h5>
              <p className="wd-dashboard-course-title">
                Data Strcuctures
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
