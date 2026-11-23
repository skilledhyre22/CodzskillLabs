import { apiClient } from "../api/axiosInstance";
import type { TrainerRequest, TrainerResponse, UpdateTrainerrStatusRequest } from "../types";
import type { Result } from "../utilis/result";

export const trainerRegistration=async(model:TrainerRequest):Promise<Result<TrainerResponse>>=>{
 return (await apiClient.post<Result<TrainerResponse>>("trainer/register",model))?.data;
}

export const getPendingApplications=async():Promise<Result<TrainerResponse[]>>=>{
 return (await apiClient.get<Result<TrainerResponse[]>>("trainer/get-pending-applications"))?.data;
}

export const getTrainerById=async(id:string):Promise<Result<TrainerResponse>>=>{
 return (await apiClient.get<Result<TrainerResponse>>("trainer/"+ id))?.data;
}


export const updateTrainerStatus=async(id:string,model:UpdateTrainerrStatusRequest):Promise<Result<TrainerResponse>>=>{
 return (await apiClient.put<Result<TrainerResponse>>("trainer/update-trainer-status/"+id,model))?.data;
}