import { apiClient } from "../api/axiosInstance";
import type { CohortRequest, CohortResponse, CohortUpdateRequest, CohortUpdateStatus } from "../types";
import type { Result } from "../utilis/result";

export const createCohort=async(model:CohortRequest):Promise<Result<CohortResponse>>=>{

 return (await apiClient.post<Result<CohortResponse>>("cohort/create-cohort",model))?.data;

}

export const updateCohort=async(id:string,model:CohortUpdateRequest):Promise<Result<CohortResponse>>=>{

 return (await apiClient.put<Result<CohortResponse>>("cohort/update-cohort/"+id,model))?.data;

}

export const updateCohortStatus=async(id:string,model:CohortUpdateStatus):Promise<Result<CohortResponse>>=>{

 return (await apiClient.put<Result<CohortResponse>>("cohort/update-status/"+id,model))?.data;

}


export const getAllCohorts=async():Promise<Result<CohortResponse[]>>=>{

 return (await apiClient.get<Result<CohortResponse[]>>("cohort/all-cohorts"))?.data;

}

export const getCohortById=async(id:string):Promise<Result<CohortResponse>>=>{

 return (await apiClient.get<Result<CohortResponse>>("/cohort/cohort/"+id))?.data;

}

export const getCohortByCourseId=async(id:string):Promise<Result<CohortResponse[]>>=>{

 return (await apiClient.get<Result<CohortResponse[]>>("cohort/course-id/"+id))?.data;

}

export const getCohortBySpecificUser=async():Promise<Result<CohortResponse[]>>=>{

 return (await apiClient.get<Result<CohortResponse[]>>("cohort/by-specific-user"))?.data;

}

export const getPublishedCohorts=async():Promise<Result<CohortResponse[]>>=>{

 return (await apiClient.get<Result<CohortResponse[]>>("cohort/published-cohorts"))?.data;

}







