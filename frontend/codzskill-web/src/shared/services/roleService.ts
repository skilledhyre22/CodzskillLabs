import { apiClient } from "../api/axiosInstance";
import type { RoleResponse } from "../types";
import type { Result } from "../utilis/result";

export const getRoles=async():Promise<Result<RoleResponse[]>>=>{
    return (await apiClient.get<Result<RoleResponse[]>>("role/get-all-roles"))?.data
}