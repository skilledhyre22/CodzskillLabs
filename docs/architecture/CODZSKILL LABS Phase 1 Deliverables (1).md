# **CODZSKILL LABS** 

# **PHASE 1 – FOUNDATION & CORE PLATFORM** 

## **Consolidated Module Documentation (P1-01 to P1-04)** 

**Project:** CodzSkill Labs **Phase:** Phase 1 – Foundation & Core Platform **Priority:** P0 – Essential **Document Type:** Functional & Technical Design Document **Date:** 16 November 2026 **Status:** Proposed – Pending Stakeholder Review 

# **PART 1: P1-01 – PUBLIC WEBSITE & LANDING PAGE** 

## **1. Introduction** 

The Public Website & Landing Page module provides visitors with information about the CodzSkill Labs platform, its services, courses, and interview-related offerings. 

It serves as the public-facing entry point of the platform and allows visitors to explore available information before registering or logging in. 

## **2. Objectives** 

- Present information about CodzSkill Labs. 

- Explain the services offered by the platform. 

- Display course and interview service information. 

- Provide contact and support information. 

- Answer common visitor questions. 

- Provide navigation to registration and login. 

## **3. Functional Requirements** 

### **3.1 Home Page** 

- Display platform introduction. 

- Display key services. 

- Highlight available courses and interview services. 

- Provide registration and login navigation. 

- Display relevant promotional content. 

### **3.2 About Us** 

- Display company and platform information. 

- Explain the platform's purpose. 

- Present its mission and vision where provided. 

### **3.3 Services** 

- Display available platform services. 

- Provide descriptions of each service. 

- Allow visitors to explore relevant service information. 

### **3.4 Courses** 

- Display course-related information. 

- Show available course categories or offerings. 

- Provide navigation to course details where available. 

### **3.5 Interview Services** 

- Display mock interview service information. 

- Explain available interview services. 

- Provide navigation towards interview-related functionality. 

### **3.6 Contact Us** 

- Display contact information. 

- Provide a contact form if required. 

- Allow visitors to submit enquiries. 

### **3.7 FAQs** 

- Display frequently asked questions. 

- Provide answers to common platform-related queries. 

## **4. Proposed Pages** 

|**Page**|**Purpose**|
|---|---|
|Home|Platform introduction|
|About Us|Company and platform information|
|Services|Available services|
|Courses|Course information|
|Interview Services|Mock interview information|
|Contact Us|Visitor enquiries|
|FAQs|Common questions|



## **5. Expected Deliverables** 

1. Public landing page. 

2. About Us page. 

3. Services page. 

4. Courses page. 

5. Interview Services page. 

6. Contact Us page. 

7. FAQs page. 

8. Navigation to registration and login. 

## **6. Pending Clarifications** 

- Who will provide website content and images? 

- Will the contact form store enquiries in the database? 

- Will courses be publicly visible without login? 

- Will website content be managed through an admin panel? 

- Are any additional public pages required? 

# **PART 2: P1-02 – AUTHENTICATION & IDENTITY** 

## **1. Introduction** 

The Authentication & Identity module manages user identity and provides secure access to the CodzSkill Labs platform. 

It allows users to register, log in, log out, recover forgotten passwords, reset passwords, and verify their email addresses. 

This module provides the foundation for authorization and role-based access control. 

## **2. Objectives** 

- Provide secure user registration. 

- Authenticate users using credentials. 

- Generate and validate authentication tokens. 

- Support secure logout. 

- Provide password recovery functionality. 

- Verify registered email addresses. 

- Prevent unauthorized access. 

- Integrate with RBAC. 

## **3. Functional Requirements** 

### **3.1 User Registration** 

#### **Input Fields:** 

- Full Name 

- Email Address 

- Password 

- Confirm Password 

#### **Process:** 

1. User opens the registration page. 

2. User enters the required information. 

3. Frontend validates the input. 

4. Registration request is sent to the backend. 

5. Backend validates the submitted information. 

6. System checks whether the email already exists. 

7. Password is securely hashed. 

8. User account is created. 

9. Email verification process is initiated. 

10. Registration confirmation is returned. 

#### **Validation Rules:** 

- Email must be valid. 

- Email must be unique. 

- Password must satisfy the configured policy. 

- Confirm Password must match Password. 

- Required fields cannot be empty. 

### **3.2 User Login** 

#### **Input Fields:** 

- Email Address 

- Password 

#### **Process:** 

1. User enters login credentials. 

2. Frontend validates input. 

3. Login request is sent to the backend. 

4. Backend retrieves the user by email. 

5. Password is verified against the stored hash. 

6. System checks account status. 

7. System checks email verification requirements. 

8. JWT access token is generated. 

9. Authentication response is returned. 

#### **Validation Rules:** 

- Email must exist. 

- Password must be correct. 

- Blocked or inactive accounts must not be allowed to log in. 

- Email verification requirements must be enforced according to platform policy. 

### **3.3 User Logout** 

#### **Process:** 

1. User selects Logout. 

2. Frontend sends a logout request where applicable. 

3. Backend invalidates the refresh token or session if supported. 

4. Frontend clears authentication credentials. 

5. User is redirected to the login page. 

**Note:** JWT access tokens are stateless. Immediate access-token revocation requires an additional mechanism, such as a token blacklist or short token lifetime combined with refresh-token revocation. 

### **3.4 Forgot Password** 

**Input:** Registered Email Address. 

#### **Process:** 

1. User selects Forgot Password. 

2. User enters their email. 

3. Request is sent to the backend. 

4. Backend processes the recovery request. 

5. A secure, time-limited reset token is generated. 

6. Password reset link is sent to the user's email. 

The API should not reveal whether an email address is registered. 

### **3.5 Reset Password** 

#### **Input Fields:** 

- Reset Token 

- New Password 

- Confirm New Password 

#### **Process:** 

1. User opens the password reset link. 

2. User enters a new password. 

3. Frontend submits the reset request. 

4. Backend validates the token. 

5. Backend checks expiration and usage. 

6. New password is securely hashed. 

7. Password is updated. 

8. Reset token is invalidated. 

9. Confirmation response is returned. 

### **3.6 Email Verification** 

#### **Process:** 

1. User completes registration. 

2. System generates a verification token. 

3. Verification link is sent to the registered email. 

4. User opens the link. 

5. Backend validates the token. 

6. Email verification status is updated. 

7. Verification confirmation is returned. 

## **4. Proposed API Endpoints** 

Base Route: `/api/auth` 

|**Metho**|**d**<br>**Endpoint**|**Purpose**|
|---|---|---|
|POST|/register|Register user|
|POST|/login|Authenticate user|
|POST|/logout|End session|
|POST|/forgot-password|Request password recovery|
|POST|/reset-password|Reset password|
|POST|/verify-email|Verify email|
|POST|/resend-verification|Resend verification email|
|POST|/refresh-token|Refresh access token|



## **5. Proposed Database Requirements** 

### **5.1 Users Table** 

|**Column**|**Data Type**|**Description**|
|---|---|---|
|UserId|UNIQUEIDENTIFIER|Primary Key|
|FullName|NVARCHAR(150)|User's full name|
|Email|NVARCHAR(256)|Unique email|
|PasswordHash|NVARCHAR(500)|Secure password hash|
|PasswordSalt|VARBINARY(64) NULL|Optional separate salt for custom hashing|
|IsEmailVerified|BIT|Email verification status|
|IsActive|BIT|Account status|



|IsBlocked|BIT|Block status|
|---|---|---|
|CreatedAt|DATETIME2|Creation date|
|UpdatedAt|DATETIME2 NULL|Last update date|



**Security Note:** ASP.NET Core Identity's standard password hasher stores salt and hashing metadata within the password hash. A separate PasswordSalt column is generally unnecessary when using it. Keep it only if a custom, vetted hashing implementation requires it. 

### **5.2 RefreshTokens Table (Proposed)** 

|**Column**|**Data Type**|
|---|---|
|RefreshTokenId|UNIQUEIDENTIFIER PK|
|UserId|UNIQUEIDENTIFIER FK|
|TokenHash|NVARCHAR(500)|
|ExpiresAt|DATETIME2|
|CreatedAt|DATETIME2|
|RevokedAt|DATETIME2 NULL|



### **5.3 EmailVerificationTokens Table (Proposed)** 

|**Column**|**Data Type**|
|---|---|
|VerificationTokenId|UNIQUEIDENTIFIER PK|
|UserId|UNIQUEIDENTIFIER FK|
|TokenHash|NVARCHAR(500)|
|ExpiresAt|DATETIME2|
|UsedAt|DATETIME2 NULL|



### **5.4 PasswordResetTokens Table (Proposed)** 

|**Column**|**Data Type**|
|---|---|
|PasswordResetTokenId|UNIQUEIDENTIFIER PK|
|UserId|UNIQUEIDENTIFIER FK|
|TokenHash|NVARCHAR(500)|
|ExpiresAt|DATETIME2|
|UsedAt|DATETIME2 NULL|



## **6. Security Requirements** 

- Passwords must never be stored in plain text. 

- Passwords must use secure hashing. 

- JWT signing keys must be stored securely. 

- Access tokens must have configured expiration. 

- Refresh tokens must be securely generated and stored. 

- Reset and verification tokens must be time-limited and single-use. 

- Authentication endpoints should use rate limiting. 

- HTTPS must be enforced in production. 

- Blocked and inactive users must not receive access. 

## **7. Expected Deliverables** 

1. Registration API. 

2. Login API. 

3. JWT authentication. 

4. Logout functionality. 

5. Forgot password. 

6. Reset password. 

7. Email verification. 

8. Refresh token handling, if approved. 

9. Authentication database structure. 

10. Authentication unit and integration tests. 

## **8. Pending Clarifications** 

- ASP.NET Core Identity or custom authentication? 

- Is email verification mandatory before login? 

- Will Google OAuth be included? 

- Will refresh tokens be used? 

- Which email service provider will be used? 

- What are the password complexity requirements? 

- What are token expiration periods? 

# **PART 3: P1-03 – ROLE-BASED ACCESS CONTROL (RBAC)** 

## **1. Introduction** 

The Role-Based Access Control module manages user access and permissions across CodzSkill Labs. 

It ensures that users can access only the modules, features, APIs, and resources permitted by their assigned roles and permissions. 

This module integrates with Authentication and User Management. 

## **2. Objectives** 

- Define and manage platform roles. 

- Assign roles to registered users. 

- Control access to platform modules. 

- Implement role-based API authorization. 

- Implement resource-based authorization. 

- Manage role permissions. 

- Restrict unauthorized operations. 

- Provide centralized permission management. 

## **3. Supported User Roles** 

|**Role I**|**D**<br>**Role Name**<br>**Description**|
|---|---|
|R01|Candidate<br>User accessing interview and learning services|
|R02|Trainer<br>User responsible for training activities|
|R03|Interviewer<br>User responsible for conducting interviews|
|R04|Admin<br>User responsible for platform administration|
|R05|Super Admin<br>User responsible for high-level platform configuration|
|R06|Corporate Coordinator User responsible for corporate coordination|



Exact responsibilities and permissions require stakeholder confirmation. 

## **4. Functional Requirements** 

### **4.1 Role Management** 

Functionalities: 

- Create roles where custom roles are permitted. 

- View available roles. 

- Edit role details. 

- Activate or deactivate roles. 

- View users assigned to a role. 

#### **Process:** 

1. Authorized administrator opens role management. 

2. System retrieves available roles. 

3. Administrator selects a role. 

4. System displays role details and permissions. 

5. Authorized changes are saved. 

6. Updated configuration is made available to the authorization system. 

### **4.2 Role Assignment** 

Functionalities: 

- Assign roles to users. 

- View assigned roles. 

- Change user roles. 

- Remove role assignments. 

- Validate assignment permissions. 

#### **Process:** 

1. Administrator opens user management. 

2. Administrator selects a user. 

3. System displays available roles. 

4. Administrator selects a role. 

5. Backend validates authorization. 

6. Role assignment is saved. 

7. Updated role information is returned. 

### **4.3 Permission Management** 

Proposed permission categories: 

- View 

- Create 

- Edit 

- Delete 

- Approve 

- Manage 

- Configure 

#### **Example Permission Matrix** 

**Module Permission Operation** User Management View Users View listing User Management Create Users Add user User Management Edit Users Update user User Management Delete Users Delete if permitted Role Management Manage Roles Manage role assignments Configuration Manage Settings Update settings Reports View Reports View permitted reports 

### **4.4 Role-Based API Authorization** 

#### **Process:** 

1. User logs in. 

2. Authentication validates credentials. 

3. Backend issues an access token with relevant identity and role claims. 

4. User sends a request to a protected API. 

5. Authentication middleware validates the token. 

6. Authorization policies evaluate the user's roles. 

7. Request proceeds if access is allowed. 

8. Otherwise, API returns an access-denied response. 

### **4.5 Resource-Based Authorization** 

Access to individual resources is controlled according to the user's relationship with the requested resource and applicable permissions. 

Examples: 

- Candidate accesses permitted profile information. 

- Trainer accesses assigned training resources. 

- Interviewer accesses authorized interview resources. 

- Administrator performs operations within assigned privileges. 

#### **Process:** 

1. User requests a resource. 

2. Backend authenticates the user. 

3. Backend retrieves the resource. 

4. Authorization logic evaluates ownership and permissions. 

5. Access is granted or denied. 

6. API returns the appropriate response. 

## **5. Proposed Permission Matrix** 

This is an initial proposal, not a confirmed permission policy. 

|**Module**|**Candidate **|**Trainer **|**Interviewer**|**Admin**|**Super**<br>**Admin**|**Corporate**<br>**Coordinator**|
|---|---|---|---|---|---|---|
|Candidate<br>Profile|Own|Not<br>specified|Not<br>specified|If authorized|If authorized|Not specified|
|Trainer Profile|<sup>Not</sup><br>specified|Own|Not<br>specified|If authorized|If authorized|Not specified|
|Interviewer<br>Profile|Not<br>specified|Not<br>specified|<sup>Own</sup>|If authorized|If authorized|Not specified|
|User<br>Management|No|No|No|Configurable|Configurable|Not specified|
|Role<br>Management|No|No|No|Configurable|Configurable|No|
|System<br>Configuration|<sup>No</sup>|No|No|Limited if<br>authorized|Configurable|No|
|Audit Logs|No|No|No|Configurable|Configurable|No|



"Not specified" and "Configurable" require stakeholder confirmation. 

## **6. Proposed API Endpoints** 

Base Route: `/api/roles` 

|**Method**<br>**Endpoint**|**Purpose**|
|---|---|
|GET<br>/api/roles|Retrieve roles|
|GET<br>/api/roles/{id}|Retrieve role details|



POST /api/roles Create role if permitted PUT /api/roles/{id} Update role GET /api/roles/{id}/permissions Retrieve permissions PUT /api/roles/{id}/permissions Update permissions 

Base Route: `/api/user-roles` 

**Method Endpoint Purpose** GET /api/user-roles/{userId} Retrieve assigned roles POST /api/user-roles Assign a role DELETE /api/user-roles/{userId}/{roleId} Remove role assignment 

## **7. Proposed Database Design** 

### **7.1 Roles Table** 

**Column Data Type** RoleId UNIQUEIDENTIFIER PK RoleName NVARCHAR(100) Description NVARCHAR(500) NULL IsActive BIT CreatedAt DATETIME2 UpdatedAt DATETIME2 NULL 

### **7.2 Permissions Table** 

**Column Data Type** PermissionId UNIQUEIDENTIFIER PK PermissionName NVARCHAR(150) ModuleName NVARCHAR(100) Action NVARCHAR(50) Description NVARCHAR(500) NULL 

### **7.3 UserRoles Table** 

**Column Data Type** UserRoleId UNIQUEIDENTIFIER PK UserId UNIQUEIDENTIFIER FK RoleId UNIQUEIDENTIFIER FK AssignedAt DATETIME2 AssignedBy UNIQUEIDENTIFIER NULL 

### **7.4 RolePermissions Table** 

**Column Data Type** RolePermissionId UNIQUEIDENTIFIER PK 

RoleId UNIQUEIDENTIFIER FK PermissionId UNIQUEIDENTIFIER FK CreatedAt DATETIME2 

## **8. Entity Relationships** 

1. Users and Roles have a many-to-many relationship through UserRoles. 2. Roles and Permissions have a many-to-many relationship through RolePermissions. 

3. One user can have multiple roles if platform policy permits. 

4. One role can contain multiple permissions. 

5. One permission can be assigned to multiple roles. 

### **ER Diagram** 

```
erDiagram
    USERS ||--o{ USERROLES : assigned
    ROLES ||--o{ USERROLES : contains
    ROLES ||--o{ ROLEPERMISSIONS : has
    PERMISSIONS ||--o{ ROLEPERMISSIONS : includes
    USERS {
        uniqueidentifier UserId PK
        string FullName
        string Email
    }
    ROLES {
        uniqueidentifier RoleId PK
        string RoleName
        bit IsActive
    }
    USERROLES {
        uniqueidentifier UserRoleId PK
        uniqueidentifier UserId FK
        uniqueidentifier RoleId FK
    }
    PERMISSIONS {
        uniqueidentifier PermissionId PK
        string PermissionName
        string ModuleName
        string Action
    }
    ROLEPERMISSIONS {
        uniqueidentifier RolePermissionId PK
        uniqueidentifier RoleId FK
        uniqueidentifier PermissionId FK
    }
```

## **9. Database Constraints** 

- RoleId is the primary key of Roles. 

- PermissionId is the primary key of Permissions. 

- UserId and RoleId are valid foreign keys in UserRoles. 

- RoleId and PermissionId are valid foreign keys in RolePermissions. 

- RoleName should be unique. 

- PermissionName should be unique. 

- A user-role combination should not be duplicated. 

- A role-permission combination should not be duplicated. 

- Required fields must not be NULL. 

## **10. Security Requirements** 

- Every protected API must validate the authenticated user's identity. 

- Authorization must be enforced on the backend. 

- Frontend navigation is not a security boundary. 

- Users must not assign themselves unauthorized roles. 

- Only authorized administrators can manage roles. 

- Resource ownership must be validated where applicable. 

- Unauthenticated requests should return HTTP 401. 

- Authenticated but unauthorized requests should return HTTP 403. 

- Role and permission changes should be recorded in audit logs. 

## **11. Integration with Other Modules** 

**P1-02 – Authentication:** Identifies the user and provides identity and role claims. 

**P1-04 – User Management:** Supports authorized role assignment and account status checks. 

**P1-05 to P1-07 – Profiles:** Determines access to Candidate, Trainer, and Interviewer profile functionality. 

**P1-08 to P1-12 – Dashboards and Configuration:** Controls access to dashboard and administrative APIs. 

## **12. Testing Requirements** 

- Retrieve roles. 

- Create and update roles where permitted. 

- Assign and remove roles. 

- Prevent duplicate assignments. 

- Test valid and invalid role access. 

- Test unauthenticated API access. 

- Test expired tokens. 

- Test resource ownership. 

- Verify HTTP 401 and 403 behavior. 

## **13. Expected Deliverables** 

1. Role management. 

2. Role assignment. 

3. Permission management foundation. 

4. Role-based API authorization. 

5. Resource-based authorization. 

6. Role and permission database structure. 

7. Integration with Authentication and User Management. 

8. Authorization test cases. 

## **14. Pending Clarifications** 

- Can one user have multiple roles? 

- Can users select their role during registration? 

- Who can create or deactivate roles? 

- Can Admin manage other Admin accounts? 

- What permissions belong to each role? 

- Can custom roles be created? 

- What resource ownership rules apply? 

- Who approves Trainer and Interviewer profiles? 

- When do permission changes take effect? 

# **PART 4: P1-04 – USER MANAGEMENT** 

## **1. Introduction** 

The User Management module provides centralized management of all users registered on the CodzSkill Labs platform. 

It allows authorized administrators to create, view, edit, activate, deactivate, block, and unblock user accounts. 

The module also supports role assignment through integration with the RBAC module. 

The Users & Roles screen provided by the project team is a reference for the proposed administrative user management interface. 

## **2. Objectives** 

- Provide centralized user management. 

- Allow administrators to create new users. 

- Display and search registered users. 

- Update user information. 

- Manage user account status. 

- Activate and deactivate accounts. 

- Block and unblock accounts. 

- Assign and manage user roles through RBAC. 

- Maintain administrative activity records. 

## **3. Functional Requirements** 

### **3.1 User Listing** 

**Description:** Display registered platform users in an administrative listing. 

#### **Proposed Listing Fields:** 

- User ID 

- Full Name 

- Email Address 

- Assigned Role 

- Account Status 

- Last Login 

- Actions 

#### **Functionalities:** 

- View all permitted users. 

- Search users. 

- Filter users by role. 

- Filter users by status. 

- Navigate between pages. 

- View individual user details. 

#### **Process:** 

1. Administrator opens User Management. 

2. Frontend requests the user listing. 

3. Backend retrieves authorized user records. 

4. Search and filters are applied. 

5. Paginated results are returned. 

6. Frontend displays the user listing. 

### **3.2 Create User** 

**Description:** Allow authorized administrators to create user accounts. 

#### **Proposed Input Fields:** 

- Full Name 

- Email Address 

- Role 

- Account Status, where permitted 

#### **Process:** 

1. Administrator selects Add New User. 

2. System displays the user creation form. 

3. Administrator enters user details. 

4. Frontend validates the input. 

5. Backend checks the administrator's permissions. 

6. Backend validates the email address. 

7. System creates the user account. 

8. The permitted role is assigned. 

9. Confirmation is returned. 

#### **Validation Rules:** 

- Full Name is required. 

- Email must be valid and unique. 

- Role must be valid and assignable by the administrator. 

- Account creation must be restricted to authorized administrators. 

The initial password or account activation method must be confirmed with stakeholders. A secure invitation or password setup flow is recommended. 

### **3.3 Edit User** 

**Description:** Allow authorized administrators to update user information. 

#### **Proposed Editable Fields:** 

- Full Name 

- Email Address, subject to verification rules 

- Account information 

- Assigned Role, if authorized 

#### **Process:** 

1. Administrator selects a user. 

2. System retrieves user details. 

3. Administrator updates permitted fields. 

4. Backend validates the request. 

5. Changes are saved. 

6. Updated user information is returned. 

Changes to sensitive fields should be recorded in the audit log. 

### **3.4 Activate User** 

**Description:** Allow authorized administrators to activate an inactive account. 

#### **Process:** 

1. Administrator selects an inactive user. 

2. Administrator selects Activate. 

3. Backend validates authorization. 

4. Account status is updated. 

5. Confirmation is returned. 

### **3.5 Deactivate User** 

**Description:** Allow authorized administrators to deactivate an active account. 

#### **Process:** 

1. Administrator selects a user. 

2. Administrator selects Deactivate. 

3. Backend validates authorization. 

4. Account status is updated. 

5. Confirmation is returned. 

A deactivated account must not receive normal platform access. 

### **3.6 Block User** 

**Description:** Restrict a user's access to the platform. 

#### **Process:** 

1. Administrator selects a user. 

2. Administrator selects Block. 

3. Backend validates authorization. 

4. Block status is updated. 

5. Relevant access restrictions are enforced. 

6. Confirmation is returned. 

The reason for blocking may be recorded if required by platform policy. 

### **3.7 Unblock User** 

**Description:** Restore account access for a previously blocked user, subject to other account restrictions. 

#### **Process:** 

1. Administrator selects a blocked user. 

2. Administrator selects Unblock. 

3. Backend validates authorization. 

4. Block status is updated. 

5. System checks other account restrictions. 

6. Confirmation is returned. 

Unblocking should not automatically activate an account that remains inactive. 

### **3.8 View User Details** 

**Description:** Allow authorized administrators to inspect user information. 

#### **Proposed Information:** 

- Personal Details 

- Email Address 

- Assigned Roles 

- Account Status 

- Registration Date 

- Last Login 

- Relevant Profile Information 

Sensitive information must be excluded or restricted according to authorization rules. 

### **3.9 Search and Filtering** 

#### **Search Options:** 

- Search by Full Name. 

- Search by Email Address. 

- Search by User ID, if supported. 

#### **Filters:** 

- Role 

- Active Status 

- Blocked Status 

- Registration Date, if required 

#### **Pagination:** 

- Configurable page size. 

- Next and Previous navigation. 

- Total record count. 

### **3.10 User Activity History** 

The administrative interface may display relevant user activity, including: 

- Successful Login 

- Failed Login 

- Password Updated 

- Role Modified 

- Account Activated 

- Account Deactivated 

- User Blocked 

- User Unblocked 

Detailed event recording will be implemented through P1-14 – Audit & Activity Logs. 

## **4. Proposed User Status Model** 

The screenshot displays statuses such as Active, Inactive, Deactivated, Archived, and Suspended. 

These labels should be mapped to an agreed account status model before implementation. 

#### **Proposed Statuses:** 

#### **Description** 

**Status Description** Active Account is active Inactive Account is not currently active Blocked Access is restricted by an administrator Deactivated Account has been deactivated Suspended Account is temporarily restricted Archived Account is retained for historical purposes and not available for normal use 

The final status list and transitions require stakeholder approval. Blocked, inactive, and deactivated should not be treated as interchangeable. 

## **5. Proposed API Endpoint Design** 

Base Route: `/api/users` 

|**HTTP Met**|**hod**<br>**Endpoint**|**Purpose**|
|---|---|---|
|GET|/api/users|Retrieve paginated user listing|
|GET|/api/users/{id}|Retrieve user details|
|POST|/api/users|Create user|
|PUT|/api/users/{id}|Update user|
|PATCH|/api/users/{id}/activate|Activate user|
|PATCH|/api/users/{id}/deactivate|Deactivate user|
|PATCH|/api/users/{id}/block|Block user|
|PATCH|/api/users/{id}/unblock|Unblock user|



Additional proposed query parameters for listing: 

- search 

- roleId 

- status 

- pageNumber 

- pageSize 

Role assignment endpoints are managed through P1-03 – RBAC. 

All endpoints must enforce appropriate authentication and authorization. 

## **6. Proposed Database Requirements** 

### **6.1 Users Table** 

The Users table is shared with P1-02 – Authentication & Identity. 

|**Column**|**Data Type**|**Description**|
|---|---|---|
|UserId|UNIQUEIDENTIFIER|Primary Key|
|FullName|NVARCHAR(150)|User's full name|
|Email|NVARCHAR(256)|Unique email address|
|PasswordHash|NVARCHAR(500)|Secure password hash|
|PasswordSalt|VARBINARY(64) NULL|Optional custom hashing salt|
|IsEmailVerified|BIT|Email verification status|
|IsActive|BIT|Active status|
|IsBlocked|BIT|Block status|
|CreatedAt|DATETIME2|Creation date|
|UpdatedAt|DATETIME2 NULL|Last update date|



### **6.2 UserRoles Table** 

Shared with P1-03 – RBAC. 

|**Column**|**Data Type**|**Description**|
|---|---|---|
|UserRoleId|UNIQUEIDENTIFIER|Primary Key|
|UserId|UNIQUEIDENTIFIER|Foreign Key to Users|
|RoleId|UNIQUEIDENTIFIER|Foreign Key to Roles|
|AssignedAt|DATETIME2|Assignment date|
|AssignedBy|UNIQUEIDENTIFIER NU|LL Assigning user|



### **6.3 Optional User Activity Summary** 

Detailed audit records should be maintained by P1-14. If the administrative screen needs login history, it can retrieve relevant events from the audit logging system rather than duplicating the records. 

## **7. Authorization Requirements** 

- 

- 

- 

- 

- 

- 

- 

- Only authorized administrators can access the user management APIs. 

- Only users with appropriate permissions can create or edit users. 

- Only authorized administrators can activate, deactivate, block, or unblock accounts. 

- Administrators must not assign roles beyond their own permission scope. 

- Users must not modify another user's administrative account information. 

- Sensitive operations must be recorded in audit logs. 

- Resource-level checks must be applied where required. 

## **8. Integration with Other Modules** 

### **P1-02 – Authentication & Identity** 

- User records are created and maintained centrally. 

- Login checks account status. 

- Blocked and inactive accounts must not be granted normal access. 

### **P1-03 – RBAC** 

- User roles are assigned through the role management system. 

- User listing displays permitted role information. 

- Role assignment is restricted by permissions. 

### **P1-05 to P1-07 – Profile Management** 

- User records connect to Candidate, Trainer, and Interviewer profiles. 

- Profile information is managed by the corresponding profile modules. 

### **P1-12 – Super Admin Configuration** 

- Administrative permissions determine which user management operations are available. 

### **P1-14 – Audit & Activity Logs** 

- User creation and modification are recorded. 

- Account status changes are recorded. 

- Role assignment changes are recorded. 

## **9. Testing Requirements** 

### **User Listing Testing** 

- Retrieve all permitted users. 

- Search by name. 

- Search by email. 

- Filter by role. 

- Filter by status. 

- Test pagination. 

### **User Creation Testing** 

- Create user with valid information. 

- Reject duplicate email. 

- Reject invalid email. 

- Reject unauthorized creation. 

- Reject unauthorized role assignment. 

### **User Update Testing** 

- Update permitted user information. 

- Reject invalid input. 

- Reject unauthorized modification. 

- Verify audit logging. 

### **Account Status Testing** 

- Activate inactive account. 

- Deactivate active account. 

- Block account. 

- Unblock account. 

- Prevent access for blocked or inactive accounts. 

- Verify status transition rules. 

### **Authorization Testing** 

- Access user management as authorized Admin. 

- Attempt access as Candidate. 

- Attempt access without authentication. 

- Attempt to modify a restricted user. 

- Verify HTTP 401 and 403 responses. 

## **10. Expected Deliverables** 

At the completion of P1-04: 

1. Centralized user listing. 

2. Search and filtering. 

3. Pagination. 

4. Create user functionality. 

5. Edit user functionality. 

6. Activate and deactivate functionality. 

7. Block and unblock functionality. 

8. User detail view. 

9. Role assignment integration. 

10. Audit logging integration. 

11. User management API tests. 

## **11. Pending Stakeholder Clarifications** 

1. Can Admin create users with all six roles? 2. Can Admin create or modify other Admin accounts? 3. Is user deletion required, or should accounts only be deactivated? 

4. What is the exact difference between Inactive, Blocked, Deactivated, Suspended, and Archived? 

5. Should new users receive an invitation email? 

6. Should administrators be able to change user email addresses? 7. Should users be able to update their own profile information? 8. Which user details should be visible to administrators? 

9. Should login history appear directly in the user detail screen? 

10. What restrictions apply to Super Admin and Admin accounts? 

# **5. PHASE 1 – CONSOLIDATED DELIVERABLES** 

The following deliverables are defined by the project team for Phase 1: 

1. Complete user registration and login system. 2. Separate dashboards for different user roles. 3. Role-based and resource-based API authorization. 4. Admin and Super Admin control panel. 5. Centralized user and profile management. 

## **5.1 Module-to-Deliverable Mapping** 

|**Phase 1 Deliverable**||**Related Modules**|
|---|---|---|
|Registration and Login System|P1-02,|P1-03|
|Separate Role-Based Dashboards|P1-03,|P1-08, P1-09, P1-10, P1-11|
|Role-Based and Resource-Based Authorizati|on P1-03||
|Admin and Super Admin Control Panel|P1-03,|P1-04, P1-08, P1-12|
|Centralized User and Profile Management|P1-04,|P1-05, P1-06, P1-07|



## **5.2 Remaining Phase 1 Modules** 

The following modules remain part of Phase 1 and require their own detailed design documentation: 

- P1-05 – Candidate Profile Management 

- P1-06 – Trainer Profile Management 

- P1-07 – Interviewer Profile Management 

- P1-08 – Admin Dashboard 

- P1-09 – Candidate Dashboard 

- P1-10 – Trainer Dashboard 

- P1-11 – Interviewer Dashboard 

- P1-12 – Super Admin Configuration 

- P1-13 – Document Management 

- P1-14 – Audit & Activity Logs 

## **5.3 Overall Phase 1 Outcome** 

At the end of Phase 1, CodzSkill Labs is expected to have a functional platform foundation with: 

- Public-facing website. 

- Secure registration and authentication. 

- Role-based and resource-based authorization. 

- Centralized user management. 

- Candidate, Trainer, and Interviewer profiles. 

- Separate dashboards for different user roles. 

- Administrative and Super Admin controls. 

- Secure document management. 

- Audit and activity logging. 

This foundation will support subsequent development phases, including the Mock Interview Marketplace, Booking, Payments, Live Sessions, Evaluation, and Learning Management System. 

# **6. GENERAL ASSUMPTIONS AND DOCUMENT STATUS** 

1. The module designs in this document are proposed based on the Phase 1 scope shared by the project team. 

2. API routes, database structures, permission matrices, and workflows are initial design proposals. 

3. Final implementation details must be confirmed with the project stakeholders. 4. Modules should follow the agreed backend architecture and frontend structure. 5. Authentication and authorization must be enforced by the backend. 

6. Security-sensitive activities must be recorded where required. 

7. Any change in requirements should be reflected in the relevant module documentation. 

**Document Status:** Proposed – Pending Stakeholder Review and Approval. 

