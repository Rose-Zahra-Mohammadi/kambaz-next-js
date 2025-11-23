"use client";
import * as client from "../Courses/client";
import { useEffect, useState} from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addNewCourse, Course, deleteCourse, updateCourse, setCourses } from "../Courses/reducer";
import { enrollCourse, unenrollCourse, setEnrollments } from "../Courses/enrollmentsSlice";

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
  });
  const fetchCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.fetchEnrollmentsForCurrentUser();
      const formattedEnrollments = enrollments.map((e: any) => ({
        userId: e.user,
        courseId: e.course
      }));
      dispatch(setEnrollments(formattedEnrollments));
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    }
  };
  const onAddNewCourse = async () => {
    try {
      // Remove _id before sending - server will generate it
      const { _id, ...courseToSend } = course;
      console.log("Creating course with data:", courseToSend);
      const newCourse = await client.createCourse(courseToSend);
      console.log("Course created successfully:", newCourse);
      dispatch(setCourses([ ...courses, newCourse ]));
      // Reset form
      setCourse({
        _id: crypto.randomUUID(),
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
      });
    } catch (error: any) {
      console.error("Failed to create course:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create course";
      alert(`Failed to create course: ${errorMessage}`);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser]);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showAll, setShowAll] = useState(isFaculty); // Faculty see all by default, students see enrolled only

  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.userId === currentUser?._id && e.courseId === courseId);

  // Filter courses for display
  // When showAll is false, show only enrolled courses
  // When showAll is true, show all courses
  let visibleCourses = courses;
  if (!showAll) {
    visibleCourses = courses.filter(course => isEnrolled(course._id));
  }

  const toggleEnrollment = () => setShowAll(prev => !prev);

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollInCourse(courseId);
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Failed to enroll:", error);
      alert("Failed to enroll in course. Please try again.");
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollFromCourse(courseId);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Failed to unenroll:", error);
      alert("Failed to unenroll from course. Please try again.");
    }
  };

  const handleAddCourse = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!currentUser) return;
    const newCourse = {
      ...course,
      _id: crypto.randomUUID(),
      creator: currentUser._id
    };
    dispatch(addNewCourse(newCourse));
    // Reset form
    setCourse({
      _id: crypto.randomUUID(),
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button variant="primary" onClick={toggleEnrollment}>
          Enrollments
        </Button>
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
            <button
              type="button"
              className="btn btn-primary float-end"
              onClick={onAddNewCourse}
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
            className="mb-2"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <FormControl
            placeholder="Image URL (e.g., /images/reactjs.jpg)"
            value={course.image || ""}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
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
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "380px" }}>
                <Card>
                  <Link
                    href={enrolled || isFaculty ? `/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!enrolled && !isFaculty) e.preventDefault();
                    }}
                  >
                    <CardImg variant="top" src={course.image} width="100%" height={220} style={{ objectFit: "cover" }} />
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
                        <div className="d-flex flex-nowrap gap-2">
                          <Button variant="primary">Go</Button>
                          <Button
                            variant={enrolled ? "danger" : "success"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              enrolled 
                                ? handleUnenroll(course._id)
                                : handleEnroll(course._id);
                            }}
                          >
                            {enrolled ? "Unenroll" : "Enroll"}
                          </Button>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCourse(course); }}
                            className="btn btn-warning"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); dispatch(deleteCourse(course._id)); }}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <Button
                          variant={enrolled ? "danger" : "success"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
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
