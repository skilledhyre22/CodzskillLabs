import { apiClient } from "../api/axiosInstance";
import type { TrainerRequest, TrainerResponse, TrainerUpdateRequest} from "../types";
import type { Result } from "../utilis/result";

export const trainerRegistration=async(model:TrainerRequest):Promise<Result<TrainerResponse>>=>{
 return (await apiClient.post<Result<TrainerResponse>>("trainer/register",model))?.data;
}


export const getTrainerById=async(id:string):Promise<Result<TrainerResponse>>=>{
 return (await apiClient.get<Result<TrainerResponse>>("trainer/"+ id))?.data;
}

export const getAllTrainers=async():Promise<Result<TrainerResponse[]>>=>{
 return (await apiClient.get<Result<TrainerResponse[]>>("trainer/all-trainers"))?.data;
}

export const updateTrainer=async(model:TrainerUpdateRequest):Promise<Result<TrainerResponse>>=>{
    return (await apiClient.put("trainer/update-trainer",model))?.data;
}




