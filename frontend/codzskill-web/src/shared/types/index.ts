import type { CourseCategory, CourseStatus } from "../enums/Enums"

export interface SignUpRequest
{
   email:string,
   firstName:string,
   lastName:string,
   password:string
}

export interface SignUpResponse
{
  id:string,
  email:string,
  firstName:string,
  lastName:string
}

export interface LoginRequest
{
  email:string,
  password:string
}
export interface LoginResponse
{
  userId:string,
  email:string,
  token:string,
  roles:string[]
}

export interface GoogleLoginRequest{

  idToken:string
}

export interface AssignRoleRequest
{
  userId:string,
  roleId:string
}

export interface SuperAdminUpdateRequest
{
  firstName:string,
  lastName:string
}

export interface UpdateUserStatusRequest{
  isActive:boolean
}

export interface UserFilterResult
{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  role?:string,
  isActive:boolean,
  isDeleted:boolean,
}

export interface UserListResponse
{
   id:string,
  firstName:string,
  lastName:string,
  email:string,
  role:string[],
  isActive:boolean,
  isDeleted:boolean,
}

export interface UserProfileResponse
{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  role:string[],
  isActive:boolean,
}

export interface UserSearchResult
{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  role?:string,
  isActive:boolean,
  isDeleted:boolean
}

export interface UserUpdateRequest
{
  
  firstName:string,
  lastName:string
}

export interface RoleResponse
{
   id:string,
   name:string
}

export interface TrainerRequest
{
  fullName:string,
  email:string,
  password:string,
  yearsOfExperience:number,
  primarySkill:string,

}

export interface TrainerUpdateRequest
{
  id:string,
  yearsOfExperience:number,
  primarySkill:string,

}

export interface TrainerResponse
{
  id:string,
  userId:string,
  fullName:string,
  email:string,
  primarySkill:string,
  yearsOfExperience:number,
  role:string,
  createdAt:Date
}



export interface CourseRequest
{
  title:string,
  description?:string,
  category:CourseCategory,
  price:number,
  badgeLabel?:string
}

export interface CourseResponse
{
  id:string,
  title:string,
  description?:string,
  category:CourseCategory,
  price:number,
  badgeLabel?:string,
  status:CourseStatus
}
export interface CourseUpdateRequest
{
  id:string,
  title:string,
  description?:string,
  category:CourseCategory,
  price:number,
  badgeLabel?:string,
}

export interface CourseUpdateStatus
{
  status:CourseStatus
}