# **CODZSKILL LABS** 

# **DATABASE DESIGN DOCUMENT (DBD)** 

**Document Version:** 1.0 **Project Name:** CodzSkill Labs **Database:** Microsoft SQL Server **ORM:** Entity Framework Core 10 **Backend:** ASP.NET Core 10 Web API **Architecture:** Clean Architecture – Modular Monolith **Document Status:** Draft – Pending Stakeholder Approval 

# **1. INTRODUCTION** 

## **1.1 Purpose** 

The purpose of this Database Design Document is to define the database structure of the CodzSkill Labs platform. 

This document describes the database tables, columns, data types, primary keys, foreign keys, relationships, constraints, indexes, and Entity Relationship Diagram (ERD). 

It provides a structured database design that supports authentication, user management, interviewer marketplace, interview booking, payment processing, live sessions, evaluations, and administrative operations. 

## **1.2 Scope** 

The database design covers the following modules: 

1. Authentication and Identity Management 

2. Role-Based Access Control (RBAC) 

3. User Management 

4. Candidate Profiles 

5. Interviewer Profiles 

6. Trainer Profiles 

7. Interview Marketplace 

8. Interview Packages 

9. Availability and Slot Management 

10. Booking Management 

11. Payment and Refund Management 

12. Live Interview Sessions 

13. Evaluation and Feedback 

14. Audit Logging 

15. External System Integration 

## **1.3 Database Technology** 

|**Component**|**Technology**|
|---|---|
|Database|Microsoft SQL Server|
|ORM|Entity Framework Core 10|
|Backend|ASP.NET Core 10 Web API|
|Primary Key Strategy|GUID|
|Data Access|Entity Framework Core|
|Architecture|Clean Architecture|



## **1.4 Database Design Approach** 

The platform will use a relational database model. 

The database will follow these principles: 

- Each table will represent a specific business entity. 

- Primary keys will uniquely identify records. 

- Foreign keys will maintain relationships between tables. 

- Unique constraints will prevent duplicate records. 

- Check constraints will enforce valid data. 

- Indexes will improve query performance. 

- Sensitive information will be securely stored. 

# **2. DATABASE MODULES** 

**Module Description** Authentication User registration, login and credentials RBAC Roles and role assignments User Management Centralized user information Candidate Profile Candidate-specific information Interviewer Profile Interviewer details and expertise Trainer Profile Trainer information Marketplace Interview categories and packages Availability Interviewer available time slots Booking Candidate interview bookings Payments Payment transactions Refunds Refund processing Live Sessions Interview meeting information Evaluations Interview feedback and scoring Audit Logs Administrative activity tracking 

Integration 

Communication with external platforms 

# **3. DATABASE TABLE DESIGN** 

## **3.1 Users Table** 

**Purpose:** Stores the basic account information of all registered users. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|UserId|UNIQUEIDENTIFIE|R PRIMARY KEY|
|FullName|NVARCHAR(150)|NOT NULL|
|Email|NVARCHAR(255)|NOT NULL, UNIQUE|
|PasswordHash|NVARCHAR(500)|NOT NULL|
|PasswordSalt|VARBINARY(64)|NULL|
|PhoneNumber|NVARCHAR(20)|NULL|
|IsEmailVerified|BIT|NOT NULL, DEFAULT 0|
|IsActive|BIT|NOT NULL, DEFAULT 1|
|CreatedAt|DATETIME2|NOT NULL|
|UpdatedAt|DATETIME2|NULL|



### **Notes:** 

- 

- 

- 

   - UserId uniquely identifies each user. 

   - Email must be unique. 

   - PasswordHash stores the securely hashed password. 

- PasswordSalt stores a separate salt only if a custom password-hashing implementation is used. 

- 

- IsActive indicates whether the account is active. 

**Security Note:** If ASP.NET Core Identity's standard password hasher is used, the generated PasswordHash already contains the salt and hashing metadata. In that case, a separate PasswordSalt column is unnecessary. Never store plain-text passwords or use a shared static salt. 

## **3.2 Roles Table** 

**Purpose:** Stores the available system roles. 

**Column Name Data Type Constraints** RoleId INT PRIMARY KEY, IDENTITY RoleName NVARCHAR(50) NOT NULL, UNIQUE Description NVARCHAR(250) NULL 

### **Example Roles:** 

- Candidate 

- Interviewer 

- Trainer 

- Admin 

- Super Admin 

## **3.3 UserRoles Table** 

**Purpose:** Establishes the many-to-many relationship between Users and Roles. 

|**Column Nam**|**e**<br>**Data Type**|**Constraints**|
|---|---|---|
|UserId|UNIQUEIDENTIFIER|PK, FK|
|RoleId|INT|PK, FK|
|AssignedAt|DATETIME2|NOT NULL|



**Primary Key:** Composite Primary Key (UserId, RoleId). 

### **Foreign Keys:** 

- UserId references Users(UserId). 

- RoleId references Roles(RoleId). 

## **3.4 CandidateProfiles Table** 

**Purpose:** Stores candidate-specific profile information. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|CandidateId|UNIQUEIDENTIFIER|PRIMARY KEY|
|UserId|UNIQUEIDENTIFIER|FK, UNIQUE, NOT NULL|
|ResumeUrl|NVARCHAR(500)|NULL|
|CurrentDesignation|NVARCHAR(150)|NULL|
|ExperienceYears|DECIMAL(4,1)|NULL|
|Skills|NVARCHAR(MAX)|NULL|
|CreatedAt|DATETIME2|NOT NULL|



## **3.5 InterviewerProfiles Table** 

**Purpose:** Stores interviewer information and expertise. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|InterviewerId|UNIQUEIDENTIFIER|PRIMARY KEY|
|UserId|UNIQUEIDENTIFIER|FK, UNIQUE, NOT NULL|
|Bio|NVARCHAR(1000)|NULL|
|ExperienceYears|DECIMAL(4,1)|NULL|
|Expertise|NVARCHAR(MAX)|NULL|
|HourlyRate|DECIMAL(10,2)|NULL|



IsApproved BIT NOT NULL, DEFAULT 0 CreatedAt DATETIME2 NOT NULL 

## **3.6 TrainerProfiles Table** 

**Purpose:** Stores trainer-specific profile information. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|TrainerId|UNIQUEIDENTIFIER|PRIMARY KEY|
|UserId|UNIQUEIDENTIFIER|FK, UNIQUE, NOT NULL|
|Bio|NVARCHAR(1000)|NULL|
|Expertise|NVARCHAR(MAX)|NULL|
|ExperienceYears|DECIMAL(4,1)|NULL|
|IsApproved|BIT|NOT NULL, DEFAULT 0|
|CreatedAt|DATETIME2|NOT NULL|



## **3.7 InterviewCategories Table** 

**Purpose:** Stores categories available in the interview marketplace. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|CategoryId|UNIQUEIDENTIFIER|PRIMARY KEY|
|CategoryName|NVARCHAR(150)|NOT NULL, UNIQUE|
|Description|NVARCHAR(500)|NULL|
|IsActive|BIT|NOT NULL, DEFAULT 1|



## **3.8 InterviewPackages Table** 

**Purpose:** Stores interview packages available for candidates. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|PackageId|UNIQUEIDENTIFIER|PRIMARY KEY|
|CategoryId|UNIQUEIDENTIFIER|FK, NOT NULL|
|PackageName|NVARCHAR(150)|NOT NULL|
|Description|NVARCHAR(1000)|NULL|
|DurationMinutes|INT|NOT NULL|
|Price|DECIMAL(10,2)|NOT NULL|
|IsActive|BIT|NOT NULL, DEFAULT 1|
|CreatedAt|DATETIME2|NOT NULL|



## **3.9 AvailabilitySlots Table** 

**Purpose:** Stores interviewer availability and time slots. 

|**Column Name**<br>**Data Type**|**Constraints**|
|---|---|



|SlotId|UNIQUEIDENTIFIER|PRIMARY KEY|
|---|---|---|
|InterviewerId|UNIQUEIDENTIFIER|FK, NOT NULL|
|StartTime|DATETIME2|NOT NULL|
|EndTime|DATETIME2|NOT NULL|
|SlotStatus|NVARCHAR(30)|NOT NULL|
|CreatedAt|DATETIME2|NOT NULL|



### **Possible SlotStatus Values:** 

- Available 

- Reserved 

- Booked 

- Blocked 

## **3.10 Bookings Table** 

**Purpose:** Stores candidate interview booking information. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|BookingId|UNIQUEIDENTIFIER|PRIMARY KEY|
|CandidateId|UNIQUEIDENTIFIER|FK, NOT NULL|
|InterviewerId|UNIQUEIDENTIFIER|FK, NOT NULL|
|PackageId|UNIQUEIDENTIFIER|FK, NOT NULL|
|SlotId|UNIQUEIDENTIFIER|FK, NOT NULL|
|BookingDate|DATETIME2|NOT NULL|
|BookingStatus|NVARCHAR(30)|NOT NULL|
|TotalAmount|DECIMAL(10,2)|NOT NULL|
|CreatedAt|DATETIME2|NOT NULL|



### **Possible BookingStatus Values:** 

- Pending 

- Confirmed 

- Cancelled 

- Completed 

- Rescheduled 

- Expired 

## **3.11 Payments Table** 

**Purpose:** Stores payment transaction details. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|PaymentId|UNIQUEIDENTIFIER|PRIMARY KEY|
|BookingId|UNIQUEIDENTIFIER|FK, NOT NULL|
|TransactionReference|NVARCHAR(150)|NULL, UNIQUE when supplied|
|Amount|DECIMAL(10,2)|NOT NULL|



Currency CHAR(3) NOT NULL PaymentMethod NVARCHAR(50) NULL PaymentStatus NVARCHAR(30) NOT NULL PaidAt DATETIME2 NULL CreatedAt DATETIME2 NOT NULL 

### **Possible PaymentStatus Values:** 

- Pending 

- Successful 

- Failed 

- Refunded 

- PartiallyRefunded 

## **3.12 Refunds Table** 

**Purpose:** Stores refund transaction information. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|RefundId|UNIQUEIDENTIFIER|PRIMARY KEY|
|PaymentId|UNIQUEIDENTIFIER|FK, NOT NULL|
|RefundReference|NVARCHAR(150)|NULL|
|RefundAmount|DECIMAL(10,2)|NOT NULL|
|RefundReason|NVARCHAR(500)|NULL|
|RefundStatus|NVARCHAR(30)|NOT NULL|
|CreatedAt|DATETIME2|NOT NULL|



## **3.13 LiveSessions Table** 

**Purpose:** Stores live interview session details. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|SessionId|UNIQUEIDENTIFIER|PRIMARY KEY|
|BookingId|UNIQUEIDENTIFIER|FK, UNIQUE|
|MeetingUrl|NVARCHAR(1000)|NULL|
|ScheduledStartTime|DATETIME2|NOT NULL|
|ActualStartTime|DATETIME2|NULL|
|ActualEndTime|DATETIME2|NULL|
|SessionStatus|NVARCHAR(30)|NOT NULL|
|CreatedAt|DATETIME2|NOT NULL|



## **3.14 Evaluations Table** 

**Purpose:** Stores interviewer assessment and candidate feedback. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|



|EvaluationId|UNIQUEIDENTIFIER|PRIMARY KEY|
|---|---|---|
|BookingId|UNIQUEIDENTIFIER|FK, UNIQUE|
|InterviewerId|UNIQUEIDENTIFIER|FK, NOT NULL|
|OverallScore|DECIMAL(5,2)|NULL|
|TechnicalScore|DECIMAL(5,2)|NULL|
|CommunicationScore|DECIMAL(5,2)|NULL|
|Feedback|NVARCHAR(MAX)|NULL|
|EvaluationStatus|NVARCHAR(30)|NOT NULL|
|SubmittedAt|DATETIME2|NULL|



## **3.15 AuditLogs Table** 

**Purpose:** Tracks administrative and important user activities. 

|**Column Nam**|**e**<br>**Data Type**|**Constraints**|
|---|---|---|
|AuditLogId|UNIQUEIDENTIFIER|PRIMARY KEY|
|UserId|UNIQUEIDENTIFIER|FK, NULL|
|Action|NVARCHAR(150)|NOT NULL|
|EntityName|NVARCHAR(100)|NULL|
|EntityId|NVARCHAR(100)|NULL|
|OldValues|NVARCHAR(MAX)|NULL|
|NewValues|NVARCHAR(MAX)|NULL|
|CreatedAt|DATETIME2|NOT NULL|



## **3.16 IntegrationEvents Table** 

**Purpose:** Tracks events exchanged with external systems such as Skillezo. 

|**Column Name**|**Data Type**|**Constraints**|
|---|---|---|
|IntegrationEventId|UNIQUEIDENTIFIER|PRIMARY KEY|
|EventType|NVARCHAR(150)|NOT NULL|
|ExternalSystem|NVARCHAR(100)|NOT NULL|
|ReferenceId|NVARCHAR(150)|NULL|
|Payload|NVARCHAR(MAX)|NULL|
|ProcessingStatus|NVARCHAR(30)|NOT NULL|
|RetryCount|INT|NOT NULL, DEFAULT 0|
|CreatedAt|DATETIME2|NOT NULL|
|ProcessedAt|DATETIME2|NULL|



# **4. ENTITY RELATIONSHIP DIAGRAM (ERD)** 

The following ERD represents the proposed logical relationships between the core database entities. 

```
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned
    USERS ||--o| CANDIDATE_PROFILES : owns
    USERS ||--o| INTERVIEWER_PROFILES : owns
    USERS ||--o| TRAINER_PROFILES : owns
    INTERVIEW_CATEGORIES ||--o{ INTERVIEW_PACKAGES : contains
    INTERVIEWER_PROFILES ||--o{ AVAILABILITY_SLOTS : provides
    CANDIDATE_PROFILES ||--o{ BOOKINGS : creates
    INTERVIEWER_PROFILES ||--o{ BOOKINGS : receives
    INTERVIEW_PACKAGES ||--o{ BOOKINGS : selected_for
    AVAILABILITY_SLOTS ||--o| BOOKINGS : reserved_for
    BOOKINGS ||--o{ PAYMENTS : has
    PAYMENTS ||--o{ REFUNDS : may_have
    BOOKINGS ||--o| LIVE_SESSIONS : schedules
    BOOKINGS ||--o| EVALUATIONS : receives
    INTERVIEWER_PROFILES ||--o{ EVALUATIONS : submits
    USERS ||--o{ AUDIT_LOGS : generates
```

### **ERD Explanation:** 

- One User can have multiple role assignments. 

- One User can have a Candidate, Interviewer or Trainer profile, subject to the assigned role. 

- One Interview Category can contain multiple Interview Packages. 

- One Interviewer can create multiple Availability Slots. 

- One Candidate can create multiple Bookings. 

- One Interviewer can receive multiple Bookings. 

- One Booking can have multiple Payment Attempts. 

- One Payment can have multiple Refund records. 

- One Booking can have one Live Session and one final Evaluation in this proposed design. 

- One User can generate multiple Audit Logs. 

# **5. DATABASE RELATIONSHIPS** 

**Parent Table Child Table Relationship** Users UserRoles One-to-Many Roles UserRoles One-to-Many 

|Users|CandidateProfiles|One-to-One|
|---|---|---|
|Users|InterviewerProfiles|One-to-One|
|Users|TrainerProfiles|One-to-One|
|InterviewCategories|InterviewPackages|One-to-Many|
|InterviewerProfiles|AvailabilitySlots|One-to-Many|
|CandidateProfiles|Bookings|One-to-Many|
|InterviewerProfiles|Bookings|One-to-Many|
|InterviewPackages|Bookings|One-to-Many|
|AvailabilitySlots|Bookings|One-to-Zero-or-One|
|Bookings|Payments|One-to-Many|
|Payments|Refunds|One-to-Many|
|Bookings|LiveSessions|One-to-Zero-or-One|
|Bookings|Evaluations|One-to-Zero-or-One|
|InterviewerProfiles|Evaluations|One-to-Many|
|Users|AuditLogs|One-to-Many|



## **5.1 Relationship Rules** 

1. Each User must have a unique UserId. 

2. A User can be assigned one or more Roles. 

3. Each profile must reference a valid User. 

4. Each Interview Package must belong to a valid Category. 

5. Each Availability Slot must belong to a valid Interviewer. 

6. Each Booking must reference a valid Candidate, Interviewer, Package and Slot. 

7. Each Payment must reference a valid Booking. 

8. Each Refund must reference a valid Payment. 

9. Each Live Session must reference a valid Booking. 

10. Each Evaluation must reference a valid Booking and Interviewer. 

# **6. DATABASE CONSTRAINTS** 

Constraints are used to maintain data integrity and prevent invalid records. 

## **6.1 Primary Key Constraints** 

- Every main table must have a Primary Key. 

- Primary Keys must contain unique values. 

- GUID-based identifiers will be used for business entities. 

- Roles will use an integer-based Primary Key. 

- UserRoles will use a composite Primary Key consisting of UserId and RoleId. 

## **6.2 Foreign Key Constraints** 

### **Child Table Foreign Key References** 

|UserRoles|UserId|Users.UserId|
|---|---|---|
|UserRoles|RoleId|Roles.RoleId|
|CandidateProfiles|UserId|Users.UserId|
|InterviewerProfiles|UserId|Users.UserId|
|TrainerProfiles|UserId|Users.UserId|
|InterviewPackages|CategoryId|InterviewCategories.CategoryId|
|AvailabilitySlots|InterviewerId|InterviewerProfiles.InterviewerId|
|Bookings|CandidateId|CandidateProfiles.CandidateId|
|Bookings|InterviewerId|InterviewerProfiles.InterviewerId|
|Bookings|PackageId|InterviewPackages.PackageId|
|Bookings|SlotId|AvailabilitySlots.SlotId|
|Payments|BookingId|Bookings.BookingId|
|Refunds|PaymentId|Payments.PaymentId|
|LiveSessions|BookingId|Bookings.BookingId|
|Evaluations|BookingId|Bookings.BookingId|
|Evaluations|InterviewerId|InterviewerProfiles.InterviewerId|
|AuditLogs|UserId|Users.UserId|



## **6.3 Unique Constraints** 

The following columns must contain unique values: 

- Users.Email 

- Roles.RoleName 

- CandidateProfiles.UserId 

- InterviewerProfiles.UserId 

- TrainerProfiles.UserId 

- InterviewCategories.CategoryName 

- Payments.TransactionReference, when supplied 

- Bookings.SlotId, if each slot is assigned to only one booking 

- LiveSessions.BookingId 

- Evaluations.BookingId 

## **6.4 Check Constraints** 

The following validations should be implemented: 

|**Table**|**Constraint**|
|---|---|
|CandidateProfiles|ExperienceYears >= 0|
|InterviewerProfiles|ExperienceYears >= 0|
|TrainerProfiles|ExperienceYears >= 0|
|InterviewerProfiles|HourlyRate >= 0|
|InterviewPackages|DurationMinutes > 0|
|InterviewPackages|Price >= 0|
|AvailabilitySlots|EndTime > StartTime|
|Bookings|TotalAmount >= 0|



Payments Amount > 0 Refunds RefundAmount > 0 Evaluations Scores must be within the approved scoring range 

Refund totals must also be validated transactionally so they cannot exceed the remaining refundable payment amount. 

## **6.5 Default Constraints** 

|**Column**|**Default Value**|
|---|---|
|Users.IsActive|1|
|Users.IsEmailVerified|0|
|InterviewerProfiles.IsApproved|0|
|TrainerProfiles.IsApproved|0|
|InterviewPackages.IsActive|1|
|IntegrationEvents.RetryCount|0|
|CreatedAt|SYSUTCDATETIME()|



# **7. INDEXING STRATEGY** 

Indexes will be created to improve database query performance. 

|**Table**|**Column**|**Index Type**|
|---|---|---|
|Users|Email|Unique Index|
|UserRoles|UserId, RoleId|Composite Primary Key|
|AvailabilitySlots|InterviewerId, StartTime|Non-Clustered Index|
|Bookings|CandidateId|Non-Clustered Index|
|Bookings|InterviewerId|Non-Clustered Index|
|Bookings|BookingStatus|Non-Clustered Index|
|Payments|TransactionReference|Unique Index|
|Payments|BookingId|Non-Clustered Index|
|Evaluations|InterviewerId|Non-Clustered Index|
|AuditLogs|UserId, CreatedAt|Non-Clustered Index|



Indexes should be reviewed against actual query patterns and execution plans. 

# **8. DATA INTEGRITY AND BUSINESS RULES** 

1. A registered email address must be unique. 

2. Only active users should be allowed to access protected modules. 

3. Users must have valid role assignments. 

4. Candidate, Interviewer and Trainer profiles must reference valid Users. 

5. Only approved Interviewers should be displayed in the public marketplace. 

6. An Interviewer must not have overlapping active reservations. 

7. A time slot must not be booked by multiple candidates. 

8. Successful payment must be verified by the payment gateway before confirming a booking. 

9. Payment retries must not create duplicate successful transactions. 

10. Refunds must not exceed the refundable payment balance. 

11. Only authorized Interviewers can submit evaluations. 

12. Important administrative changes must be recorded in AuditLogs. 

13. External integration events must support retries and idempotent processing. 

# **9. DATABASE SECURITY** 

The following security measures will be implemented: 

1. Passwords must never be stored in plain text. 

2. Passwords must be stored using a secure password-hashing algorithm. 

3. Database access must follow the principle of least privilege. 

4. Sensitive application configuration must be stored securely. 

5. Payment gateway credentials must not be stored as plain text. 

6. External systems must not have direct access to the database. 

7. Audit logs must be protected from unauthorized modification. 

8. Database backups and recovery procedures must be configured. 

9. API authorization must be enforced on the backend. 

10. Sensitive data must be protected during transmission and storage. 

# **10. EXTERNAL SYSTEM INTEGRATION – SKILLEZO** 

CodzSkill Labs and Skillezo will maintain separate databases. 

There will be no direct database-to-database access. 

Integration will take place through: 

- REST APIs 

- OAuth 2.0 / OpenID Connect, where applicable 

- Signed Webhooks 

- Integration Event Tracking 

## **10.1 Proposed Integration Flow** 

1. Candidate identifies an interview requirement in Skillezo. 2. Skillezo requests available interview packages from CodzSkill Labs. 3. Candidate selects an Interviewer and available time slot. 4. CodzSkill Labs manages the booking and payment. 5. Candidate attends the live interview. 

6. Interviewer submits the evaluation. 7. CodzSkill Labs sends the approved evaluation result to Skillezo through a signed webhook. 

8. Skillezo processes the received information in its own database. 

# **11. FUTURE DATABASE EXPANSION** 

The following tables may be introduced as the platform expands into LMS functionality: 

- Courses 

- CourseCategories 

- Cohorts 

- Enrollments 

- TrainerAssignments 

- Subscriptions 

- SubscriptionPlans 

- Notifications 

- Certificates 

- LearningProgress 

These entities will be finalized after the LMS requirements are approved. 

# **12. ASSUMPTIONS AND OPEN DECISIONS** 

The following items require confirmation from the Product Owner and Technical Team: 

1. Final role hierarchy and role assignment rules. 

2. Whether a user can have multiple roles simultaneously. 

3. Whether Interview Packages are linked to specific Interviewers. 

4. Whether a Booking supports multiple Payment Attempts. 

5. Whether one Booking can have multiple Live Sessions. 

6. Whether Evaluations can be revised after submission. 

7. Exact Payment Gateway and Refund requirements. 

8. Whether Courses and Cohorts are included in the initial release. 

9. Whether unpaid slot reservations expire automatically. 

10. Whether Skillezo integration requires external user identifiers in CodzSkill Labs. 

11. Whether the application will use ASP.NET Core Identity or a custom authentication implementation. 

12. Whether PasswordSalt will be stored separately or included within the passwordhashing implementation. 

# **13. CONCLUSION** 

This Database Design Document defines the proposed relational database structure for the CodzSkill Labs platform. 

It establishes the core entities, table structures, relationships, constraints, indexing strategy, security requirements and external integration boundaries. 

The proposed design provides a foundation for implementing the platform using Microsoft SQL Server and Entity Framework Core 10. 

The database schema will be reviewed and updated according to final business requirements before database migrations and implementation begin. 

### **DOCUMENT STATUS: DRAFT – PENDING STAKEHOLDER APPROVAL** 

