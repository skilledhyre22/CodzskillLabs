import { apiClient } from "../api/axiosInstance";
import type { GoogleLoginRequest, LoginRequest, LoginResponse, SignUpRequest, SignUpResponse, UserProfileResponse, UserUpdateRequest } from "../types";
import type { Result } from "../utilis/result";

export const signUp=async(model:SignUpRequest):Promise<Result<SignUpResponse>>=>{
  return (await apiClient.post<Promise<Result<SignUpResponse>>>("auth/sign-up",model))?.data
}

export const login=async(model:LoginRequest):Promise<Result<LoginResponse>>=>{
  return (await apiClient.post<Promise<Result<LoginResponse>>>("auth/login",model))?.data
}

export const googleLogin=async(model:GoogleLoginRequest):Promise<Result<LoginResponse>>=>{
  return (await apiClient.post<Promise<Result<LoginResponse>>>("auth/google-login",model))?.data
}

export const myProfile=async():Promise<Result<UserProfileResponse>>=>{
  return (await apiClient.get<Promise<Result<UserProfileResponse>>>("auth/my-profile"))?.data
}

export const updateMyProfile=async(model:UserUpdateRequest):Promise<Result<UserProfileResponse>>=>{
  return (await apiClient.put<Promise<Result<UserProfileResponse>>>("auth/update-profile",model))?.data
}

