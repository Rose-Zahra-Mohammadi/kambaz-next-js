"use client";
import { useState} from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addNewCourse, Course, deleteCourse, updateCourse } from "../Courses/reducer";
import { enrollCourse, unenrollCourse } from "../Courses/enrollmentsSlice";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const enrollments = useSelector((state: RootState) => state.enrollmentsReducer.enrollments);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: crypto.randomUUID(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
    creator: currentUser?._id || "",
  });

  const [showAll, setShowAll] = useState(false); // toggle enrollments/all
  const isFaculty = currentUser?.role === "FACULTY";

  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.userId === currentUser?._id && e.courseId === courseId);

  // Filter courses for display
  let visibleCourses = courses;
  if (!isFaculty && !showAll) {
    visibleCourses = courses.filter(course => isEnrolled(course._id));
  }

  const toggleEnrollment = () => setShowAll(prev => !prev);

  const handleEnroll = (courseId: string) => {
    if (!currentUser) return;
    dispatch(enrollCourse({ userId: currentUser._id, courseId }));
  };

  const handleUnenroll = (courseId: string) => {
    if (!currentUser) return;
    dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {!isFaculty && (
          <Button variant="primary" onClick={toggleEnrollment}>
            Enrollments
          </Button>
        )}
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
            <button
              className="btn btn-primary float-end"
              onClick={() => dispatch(addNewCourse({ ...course, _id: crypto.randomUUID(), creator: currentUser._id }))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map(course => {
            const enrolled = isEnrolled(course._id);
            return (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={enrolled || isFaculty ? `/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!enrolled && !isFaculty) e.preventDefault();
                    }}
                  >
                    <CardImg variant="top" src={course.image} width="100%" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      {isFaculty ? (
                        <>
                          <Button variant="primary">Go</Button>
                          <button
                            onClick={(e) => { e.preventDefault(); dispatch(deleteCourse(course._id)); }}
                            className="btn btn-danger float-end"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); setCourse(course); }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      ) : (
                        <Button
                          variant={enrolled ? "danger" : "success"}
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                            enrolled 
                            ? handleUnenroll(course._id)
                             : handleEnroll(course._id);
                          }}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
