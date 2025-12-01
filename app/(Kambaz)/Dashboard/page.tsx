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
    image: "",
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
      await client.createCourse(courseToSend);
      // Refresh courses and enrollments from server to ensure persistence
      await fetchCourses();
      await fetchEnrollments();
      // Reset form
      setCourse({
        _id: crypto.randomUUID(),
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "",
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

  // Removed toggleEnrollment - now using separate buttons

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

  // const handleAddCourse = (e?: React.MouseEvent) => {
  //   if (e) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   if (!currentUser) return;
  //   const newCourse = {
  //     ...course,
  //     _id: crypto.randomUUID(),
  //     creator: currentUser._id
  //   };
  //   dispatch(addNewCourse(newCourse));
  //   // Reset form
  //   setCourse({
  //     _id: crypto.randomUUID(),
  //     name: "New Course",
  //     number: "New Number",
  //     startDate: "2023-09-10",
  //     endDate: "2023-12-15",
  //     image: "/images/reactjs.jpg",
  //     description: "New Description",
  //   });
  // };

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div className="d-flex gap-2">
          <Button 
            variant={!showAll ? "primary" : "outline-primary"}
            onClick={() => setShowAll(false)}
          >
            My Courses
          </Button>
          <Button 
            variant={showAll ? "primary" : "outline-primary"}
            onClick={() => setShowAll(true)}
          >
            All Courses
          </Button>
        </div>
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
              onClick={async () => {
                // Check if this is an existing course (exists in courses array)
                const existingCourse = courses.find(c => c._id === course._id);
                if (!existingCourse) {
                  alert("Please select a course to edit first by clicking 'Edit' on a course card.");
                  return;
                }
                try {
                  const { _id, ...courseToUpdate } = course;
                  await client.updateCourse(_id, courseToUpdate);
                  // Refresh courses from server to ensure persistence
                  await fetchCourses();
                  // Reset form
                  setCourse({
                    _id: crypto.randomUUID(),
                    name: "New Course",
                    number: "New Number",
                    startDate: "2023-09-10",
                    endDate: "2023-12-15",
                    image: "",
                    description: "New Description",
                  });
                  alert("Course updated successfully!");
                } catch (error: any) {
                  console.error("Failed to update course:", error);
                  const errorMessage = error.response?.data?.message || error.message || "Failed to update course";
                  alert(`Failed to update course: ${errorMessage}`);
                }
              }}
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
            placeholder="Image URL (e.g., /images/reactjs.jpg or https://example.com/image.jpg)"
            value={course.image || ""}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, image: e.target.value })}
          />
          {course.image && (
            <div className="mb-2">
              <small className="text-muted d-block mb-1">Image Preview:</small>
              <div className="mt-1" style={{ maxWidth: "200px", maxHeight: "150px", overflow: "hidden", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#f5f5f5" }}>
                <img 
                  src={course.image} 
                  alt="Course preview" 
                  style={{ width: "100%", height: "auto", display: "block" }}
                  onError={(e: any) => {
                    e.target.style.display = "none";
                    const errorDiv = e.target.parentElement?.querySelector('.image-error');
                    if (errorDiv) {
                      (errorDiv as HTMLElement).style.display = "block";
                    }
                  }}
                />
                <div className="image-error" style={{ display: "none", padding: "20px", textAlign: "center", color: "#999", fontSize: "12px" }}>
                  Invalid image URL
                </div>
              </div>
            </div>
          )}
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
                    <CardImg 
                      variant="top" 
                      src={course.image || "/images/reactjs.jpg"} 
                      width="100%" 
                      height={220} 
                      style={{ objectFit: "cover" }} 
                      onError={(e: any) => {
                        e.target.src = "/images/reactjs.jpg";
                      }}
                    />
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
                            onClick={async (e) => { 
                              e.preventDefault(); 
                              e.stopPropagation(); 
                              if (confirm("Are you sure you want to delete this course?")) {
                                try {
                                  await client.deleteCourse(course._id);
                                  // Refresh courses from server to ensure persistence
                                  await fetchCourses();
                                } catch (error) {
                                  console.error("Failed to delete course:", error);
                                  alert("Failed to delete course. Please try again.");
                                }
                              }
                            }}
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
