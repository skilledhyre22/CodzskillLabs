import { apiClient } from "../api/axiosInstance";
import type { AssignRoleRequest, SuperAdminUpdateRequest, UpdateUserStatusRequest, UserListResponse } from "../types";
import type { Result } from "../utilis/result";

export const getAllUsers=async():Promise<Result<UserListResponse[]>>=>{
    return (await apiClient.get<Result<UserListResponse[]>>("usermanagement/all-users"))?.data
}

export const getUserById=async(id:string):Promise<Result<UserListResponse>>=>{
    return (await apiClient.get<Result<UserListResponse>>("usermanagement/get-user/"+ id))?.data
}

export const updateUser =async(id:string,model: SuperAdminUpdateRequest):Promise<Result<UserListResponse>> => {
 return (await apiClient.put<Result<UserListResponse>>(`usermanagement/update-user/${id}`,model))?.data
}

export const deleteUser=async(id:string):Promise<Result<boolean>>=>{
    return (await apiClient.delete<Result<boolean>>("usermanagement/delete-user/"+id))?.data
}

export const restoreUser=async(id:string):Promise<Result<boolean>>=>{
    return (await apiClient.patch<Result<boolean>>("usermanagement/restore-user/"+id))?.data
}

export const updateStatus=async(id:string,model:UpdateUserStatusRequest):Promise<Result<boolean>>=>{
    return (await apiClient.patch<Result<boolean>>("usermanagement/update-status/"+id,model))?.data
}

export const searchUsers = async (name?: string,email?: string): Promise<Result<UserListResponse[]>> => {

    return (await apiClient.get<Result<UserListResponse[]>>("usermanagement/search",
        {
            params: { name, email }
        }
    ))?.data
}


export const getUsersPagination = async (pageNumber: number,pageSize: number): Promise<Result<UserListResponse[]>> => {

    return (await apiClient.get<Result<UserListResponse[]>>("usermanagement/pagination",
        {
            params: { pageNumber, pageSize }
        }
    ))?.data
}

export const filterUsers = async (role?: string,isActive?: boolean,isDeleted?: boolean): Promise<Result<UserListResponse[]>> => {

    return (await apiClient.get<Result<UserListResponse[]>>(
        "usermanagement/filter",
        {
            params: { role, isActive, isDeleted }
        }
    ))?.data
}


export const assignRole=async(model:AssignRoleRequest):Promise<Result<boolean>>=>{
    return (await apiClient.patch<Result<boolean>>("usermanagement/assign-role",model))?.data
}

