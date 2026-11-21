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
