import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
    const { data } = await axios.get(COURSES_API);
    return data;
};

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};
export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}`, course);
    return data;
};
export const fetchCourseById = async (courseId: string) => {
    const { data } = await axios.get(`${COURSES_API}/${courseId}`);
    return data;
};

export const fetchModulesForCourse = async (courseId: string) => {
    const { data } = await axios.get(`${COURSES_API}/${courseId}/modules`);
    return data;
};

export const createModule = async (courseId: string, module: any) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
    return data;
};

export const updateModule = async (courseId: string, module: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
    return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
    const response= await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
    return response.data;
};

export const enrollInCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/enroll`);
    return data;
};

export const fetchEnrollmentsForCurrentUser = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/enrollments`);
    return data;
}

export const updateUser = async (user: any) => {
    const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return data;
};
export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
   };
   export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
   };
   