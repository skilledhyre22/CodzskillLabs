import { apiClient } from "../api/axiosInstance";
import type { CourseRequest, CourseResponse, CourseUpdateRequest, CourseUpdateStatus } from "../types";
import type { Result } from "../utilis/result";

export const createCourse=async(model:CourseRequest):Promise<Result<CourseResponse>>=>{
    return (await apiClient.post<Result<CourseResponse>>("course/create-course",model))?.data;
}

export const getPublishedCourses=async():Promise<Result<CourseResponse[]>>=>{
    return (await apiClient.get<Result<CourseResponse[]>>("course/published-courses"))?.data;
}

export const getPendingCourses=async():Promise<Result<CourseResponse[]>>=>{
    return (await apiClient.get<Result<CourseResponse[]>>("course/pending-courses"))?.data;
}

export const getCourseById=async(id:string):Promise<Result<CourseResponse>>=>{
    return (await apiClient.get<Result<CourseResponse>>("course/"+id))?.data;
}

export const getAllCourses=async():Promise<Result<CourseResponse[]>>=>{
    return (await apiClient.get<Result<CourseResponse[]>>("course/all-courses"))?.data;
}

export const updateCourse = async (id: string,model: CourseUpdateRequest): Promise<Result<CourseResponse>> => {
    return (await apiClient.put<Result<CourseResponse>>(`course/update-course/${id}`, model)).data;
};

export const updateStatus = async (id: string,model: CourseUpdateStatus): Promise<Result<CourseResponse>> => {
    return (await apiClient.put<Result<CourseResponse>>(`course/update-status/${id}`, model)).data;
};

export const searchCourses=async(name:string):Promise<Result<CourseResponse[]>>=>{
    return (await apiClient.get<Result<CourseResponse[]>>(`course/search-course/?name=${name}`))?.data;
}

export const filterCourse=async(price:number):Promise<Result<CourseResponse[]>>=>{
    return (await apiClient.get<Result<CourseResponse[]>>(`course/filter-course/?price=${price}`))?.data;
}
