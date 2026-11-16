CODZSKILL LABS  |  LOW LEVEL DESIGN 

# **CODZSKILL LABS** 

## **LOW LEVEL DESIGN (LLD) DOCUMENT** 

|**Document Attribute**|**Details**|
|---|---|
|Project|CodzSkill Labs|
|Document|Low Level Design|
|Version|1.0 – Draft for Technical Review|
|Prepared on|16 November 2026|
|Architecture baseline|Clean Architecture with Modular Monolith|
|Backend|ASP.NET Core Web API / C#|
|Frontend|React.js / TypeScript|
|Database|Microsoft SQL Server|



Document purpose: This document describes the proposed internal design of CodzSkill Labs, including module responsibilities, application components, API contracts, business workflows, security, integrations, and implementation rules. 

Review note: This is a design baseline prepared from the requirements currently shared. Items marked as configurable or subject to confirmation must be validated with the product owner before implementation. 

Confidential – Internal Project Documentation  |  1 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **Document Control** 

|**Version**|**Date**|**Description**|**Status**|
|---|---|---|---|
|1.0|16-Nov-2026|Initial consolidated LLD draft<br>covering platform foundation,<br>marketplace, payments, live<br>sessions, LMS and Skillezo<br>integration.|Draft|



### **Table of Contents** 

1. 1. Introduction and Purpose 

2. 2. Scope and Design Principles 

3. 3. Technology Stack and Architecture 

4. 4. Solution Structure and Layer Responsibilities 

5. 5. Cross-Cutting Design 

6. 6. Detailed Module Design 

7. 7. API Design Standards 

8. 8. Core Data Model Overview 

9. 9. Business Workflows 

10. 10. Skillezo Integration Design 

11. 11. Security Design 

12. 12. Error Handling and Logging 

13. 13. Non-Functional Design 

14. 14. Deployment and Configuration 

15. 15. Testing Strategy 

16. 16. Assumptions, Dependencies and Open Decisions 

17. 17. Phase-wise Implementation Mapping 

Confidential – Internal Project Documentation  |  2 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **1. Introduction and Purpose** 

#### **1.1 Purpose** 

The purpose of this Low Level Design document is to translate the approved business requirements and High Level Design into implementable software components. It defines module boundaries, class responsibilities, service operations, API endpoints, validation rules, data interactions and integration behaviour. 

#### **1.2 Product Overview** 

CodzSkill Labs is a learning and interview-preparation platform. It is intended to support candidates, trainers, interviewers, administrators and corporate coordinators through learning services, mock-interview discovery and booking, payments, live sessions, evaluations and administrative operations. 

The platform is designed to integrate with Skillezo, a separate career-services platform. CodzSkill Labs remains the system of record for its own users, bookings, payments, sessions and evaluations. Skillezo remains the system of record for its career profiles, employability insights, job matching and related career workflows. 

#### **1.3 Design Goals** 

- Translate functional requirements into implementable modules and components. 

- Keep business rules independent from UI, database and third-party providers. 

- Support multiple user roles with role-based and resource-based authorization. 

- Keep CodzSkill Labs and Skillezo databases separate. 

- Provide reliable booking, payment, session and evaluation workflows. 

- Allow future modules to be added without restructuring the complete application. 

### **2. Scope and Design Principles** 

#### **2.1 In-Scope Modules** 

|**Module**|**Primary capabilities**|**Priority / phase**|
|---|---|---|
|Public Website|Home, About, Services, Courses,<br>Interview Services, Contact, FAQs|Phase 1 / P0|
|Authentication & Identity|Registration, login, logout, password<br>recovery, reset, email verification|Phase 1 / P0|
|Role & User Management|Candidate, Trainer, Interviewer, Admin,<br>Super Admin, Corporate Coordinator;<br>user lifecycle|Phase 1 / P0|
|Profiles & Dashboards|Candidate, trainer and interviewer<br>profiles; role-specific dashboards|Phase 1 / P0|
|Marketplace & Booking|Interviewer catalogue, packages,<br>availability, booking, cancellation and<br>rescheduling|Phase 2 / P0|
|Payments & Finance|Checkout, transactions, invoices, refunds,<br>subscriptions, reconciliation|Phase 3 / P0|
|Live Sessions & Evaluation|Meeting rooms, attendance, interview<br>feedback, evaluation, notifications|Phase 4 / P0|
|LMS|Courses and learning-related capabilities;<br>detailed scope to be confirmed|Phase 5 / P1|
|Skillezo Integration|Secure API and webhook-based exchange<br>of agreed career/interview outcomes|Cross-phase|



Confidential – Internal Project Documentation  |  3 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **2.2 Out of Scope for This LLD** 

- Final visual UI specifications, pixel-perfect screens and design-system tokens. 

- Final physical database ERD, complete column-level schema and index catalogue; these will be detailed in the separate Database Design Document. 

- Vendor-specific payment, video, email or SMS provider configuration until the provider is selected. 

- Detailed LMS submodules not yet supplied in the complete Phase 5 requirements. 

#### **2.3 Design Principles** 

- Separation of concerns: each layer has a clear responsibility. 

- Dependency direction: Domain at the centre; outer layers depend inward. 

- Single responsibility: each service owns a focused use case or domain capability. 

- Secure by default: deny access unless authentication and authorization rules allow it. 

- Consistency: state transitions are validated in the application/domain layer. 

- Idempotency: payment callbacks and external webhook deliveries must tolerate retries. 

- Auditability: important administrative and financial actions are recorded. 

### **3. Technology Stack and Architecture** 

|**Area**|**Proposed technology / approach**|**Design note**|
|---|---|---|
|Frontend|React.js + TypeScript|SPA consuming backend REST APIs.|
|Backend|ASP.NET Core Web API, C#|Single deployable backend organised into<br>modules.|
|Architecture|Clean Architecture + Modular Monolith|Modules are separated logically;<br>microservices are not assumed.|
|Database|Microsoft SQL Server|CodzSkill Labs owns its database.|
|Data access|Entity Framework Core|Repositories or query services as<br>appropriate.|
|Authentication|JWT access tokens|Refresh-token lifecycle and secure<br>storage policy to be finalised.|
|Authorization|Role-based + resource-based policies|Role alone is not sufficient for ownership-<br>sensitive resources.|
|Caching|Redis (planned)|Cache only data with defined invalidation<br>rules.|
|Real-time|SignalR (planned)|Session status, notifications or live<br>collaboration where required.|
|Background jobs|Hangfire (planned)|Email, reminders, expiry and<br>reconciliation jobs.|
|Integration|REST APIs, OAuth 2.0 / OpenID Connect,<br>signed webhooks|Separate platform databases.|



#### **3.1 Architectural Style** 

The backend will use a Modular Monolith. Each business capability is represented by a module with its own application services, domain model and infrastructure access. Modules are deployed together initially, while internal boundaries are maintained to reduce coupling and support future extraction if justified. 

Confidential – Internal Project Documentation  |  4 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **3.2 Logical Request Flow** 

18. React sends an HTTPS request to an API endpoint. 

19. ASP.NET Core middleware performs request correlation, exception handling and authentication. 

20. Authorization policies verify role, permission and resource ownership. 

21. The API endpoint maps the request to an application command/query or service call. 

22. The application layer validates input and executes the use case. 

23. Domain rules validate state changes and invariants. 

24. Infrastructure repositories persist or retrieve data from SQL Server; external adapters call approved providers. 

25. The endpoint returns a consistent response with an appropriate HTTP status. 

### **4. Solution Structure and Layer Responsibilities** 

#### **4.1 Proposed Backend Solution Structure** 

The following is a logical project structure. Exact folder and project names may be adjusted to match the repository conventions. 

src/ 

CodzSkillLabs.Api/ Controllers/ Middleware/ Filters/ Extensions/ Contracts/ Configuration/ CodzSkillLabs.Application/ Common/ Interfaces/ Behaviors/ Exceptions/ Models/ Modules/ Identity/ Users/ Profiles/ Marketplace/ Booking/ Payments/ Sessions/ Evaluations/ Notifications/ Learning/ Integrations/ CodzSkillLabs.Domain/ Common/ Identity/ Users/ Marketplace/ Booking/ Payments/ Sessions/ Evaluations/ Learning/ 

Confidential – Internal Project Documentation  |  5 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

CodzSkillLabs.Infrastructure/ Persistence/ DbContext/ Configurations/ Migrations/ Repositories/ Security/ Caching/ Email/ Payments/ Video/ Jobs/ Integrations/ CodzSkillLabs.Contracts/   (optional shared API contracts) 

tests/ CodzSkillLabs.UnitTests/ CodzSkillLabs.IntegrationTests/ CodzSkillLabs.ApiTests/ 

#### **4.2 Layer Responsibilities** 

|**Layer**|**Contains**|**Must not contain**|
|---|---|---|
|API / Presentation|Controllers/endpoints, request binding,<br>auth attributes, HTTP response mapping|Core business rules or direct SQL queries|
|Application|Use cases, DTOs, validators, interfaces,<br>orchestration|Provider-specific implementation details|
|Domain|Entities, value objects, domain rules,<br>enums, domain events|EF Core, HTTP, UI or provider SDK<br>dependencies|
|Infrastructure|DbContext, repository implementations,<br>email/payment/video adapters, cache,<br>jobs|Business decisions that belong to<br>Domain/Application|



#### **4.3 Dependency Rules** 

- API depends on Application and Infrastructure only for composition-root registration. 

- Application depends on Domain and abstractions. 

- Domain does not depend on other projects. 

- Infrastructure implements interfaces defined by Application or Domain. 

- Controllers should remain thin and delegate work to application use cases. 

### **5. Cross-Cutting Design** 

#### **5.1 DTO and Mapping Strategy** 

API requests and responses use dedicated DTOs rather than exposing persistence entities. Request DTOs are validated before use. Mapping may be manual or performed using a mapping library, but mapping rules must remain explicit and testable. 

#### **5.2 Validation** 

- Required fields, formats, lengths and numeric ranges are validated at the application boundary. 

- Business validation checks ownership, availability, state transitions and policy constraints. 

- Database constraints provide a final integrity safeguard; they do not replace application validation. 

Confidential – Internal Project Documentation  |  6 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **5.3 Transaction Management** 

A single business operation that updates multiple related records in the same database should use a database transaction. External payment or video-provider calls must not be held inside long-running database transactions. Use a persisted workflow state and idempotent callback handling for external operations. 

#### **5.4 Concurrency** 

Availability and booking operations must protect against double booking. Use an appropriate database concurrency strategy, such as unique constraints on confirmed slot allocations, row-version concurrency tokens, or transactional slot reservation. The final strategy must be selected in the Database Design Document. 

#### **5.5 Caching** 

- Cache read-heavy catalogue and public configuration data only where appropriate. 

- Do not treat cache as the source of truth for payments, booking confirmation or user permissions. 

- Define expiry and invalidation when packages, availability or user status changes. 

- Use distributed cache only when multi-instance deployment requires shared cache state. 

#### **5.6 Background Processing** 

- Email verification and password reset messages. 

- Booking reminders and upcoming-session notifications. 

- Temporary booking-hold expiry. 

- Payment status reconciliation and retryable integration events. 

- Webhook retry and dead-letter/manual review handling. 

### **6. Detailed Module Design** 

Each module below defines its responsibility, key components, core operations, API surface and important rules. Endpoint names are proposed REST contracts and should be aligned with the final API naming convention. 

#### **6.1 Public Website & Content** 

Purpose: Serve public-facing pages and information such as Home, About Us, Services, Courses, Interview Services, Contact Us and FAQs. 

##### **Key components** 

- PublicContentController 

- PublicContentService 

- FaqRepository / ContentRepository 

##### **Proposed API endpoints** 

- GET /api/v1/public/pages/{slug} 

- GET /api/v1/public/faqs 

- POST /api/v1/public/contact 

##### **Important business and validation rules** 

- Public pages are readable without login. Contact submissions are validated, rate-limited and routed to the configured support workflow. 

##### **Core data concepts** 

Page, Faq, ContactEnquiry 

Confidential – Internal Project Documentation  |  7 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **6.2 Authentication & Identity** 

Purpose: Manage account registration, login, logout, password recovery, password reset and email verification. 

##### **Key components** 

- AuthController: exposes authentication endpoints. 

- AuthService: coordinates registration, credential verification and token issuance. 

- PasswordService: hashes and verifies passwords using a secure password hasher. 

- TokenService: creates and validates access/refresh tokens. 

- EmailVerificationService: issues and validates one-time verification tokens. 

- RefreshTokenRepository: persists token metadata and revocation state. 

##### **Proposed API endpoints** 

- POST /api/v1/auth/register 

- POST /api/v1/auth/login 

- POST /api/v1/auth/refresh 

- POST /api/v1/auth/logout 

- POST /api/v1/auth/forgot-password 

- POST /api/v1/auth/reset-password 

- POST /api/v1/auth/verify-email 

- POST /api/v1/auth/resend-verification 

##### **Important business and validation rules** 

- Never store plain-text passwords. Apply rate limits to login and recovery endpoints. Return generic login/recovery errors to reduce account enumeration. Refresh tokens must be revocable and stored securely. Account status and email verification must be checked before granting protected access, according to policy. 

##### **Core data concepts** 

User, Role, UserRole, RefreshToken, EmailVerificationToken, PasswordResetToken 

#### **6.3 Role-Based Access Control & User Management** 

Purpose: Manage platform roles and user lifecycle for Candidate, Trainer, Interviewer, Admin, Super Admin and Corporate Coordinator. 

##### **Key components** 

- UsersController: user listing and administrative actions. 

- UserManagementService: create/update/activate/deactivate/block/unblock. 

- AuthorizationPolicyService: evaluates role and resource permissions. 

- AuditService: records privileged actions. 

##### **Proposed API endpoints** 

- GET /api/v1/admin/users 

- GET /api/v1/admin/users/{userId} 

- POST /api/v1/admin/users 

- PATCH /api/v1/admin/users/{userId}/status 

- PUT /api/v1/admin/users/{userId} 

- GET /api/v1/admin/roles 

- PUT /api/v1/admin/users/{userId}/roles 

Confidential – Internal Project Documentation  |  8 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

##### **Important business and validation rules** 

- Only authorised administrators can manage users. Super Admin actions require a stricter policy. Prevent removal or deactivation of the last active Super Admin. Record actor, target, action and timestamp for privileged changes. Resource ownership checks apply to user-specific data. 

##### **Core data concepts** 

User, Role, Permission, UserRole, RolePermission, AuditLog 

#### **6.4 Candidate Profile Management** 

Purpose: Maintain candidate personal details, education, experience, skills, social links and profile completion. 

##### **Key components** 

- CandidateProfileController 

- CandidateProfileService 

- ProfileCompletionService 

- CandidateProfileRepository 

##### **Proposed API endpoints** 

- GET /api/v1/candidates/me/profile 

- PUT /api/v1/candidates/me/profile 

- POST /api/v1/candidates/me/education 

- POST /api/v1/candidates/me/experience 

- PUT /api/v1/candidates/me/skills 

- GET /api/v1/candidates/me/completion 

##### **Important business and validation rules** 

- Candidate identity is derived from the authenticated principal, not trusted from a client-supplied user ID. A candidate can modify only their own profile unless an authorised admin workflow applies. 

##### **Core data concepts** 

CandidateProfile, Education, Experience, Skill, CandidateSkill, SocialLink 

#### **6.5 Trainer & Interviewer Profile Management** 

Purpose: Maintain trainer/interviewer expertise, biography, skills, experience, languages, verification status and professional availability profile. 

##### **Key components** 

- TrainerProfileService 

- InterviewerProfileService 

- ExpertiseService 

- ProfileReviewService 

##### **Proposed API endpoints** 

- GET /api/v1/trainers 

- GET /api/v1/trainers/{id} 

- PUT /api/v1/trainers/me/profile 

- PUT /api/v1/interviewers/me/profile 

- POST /api/v1/admin/profiles/{id}/review 

Confidential – Internal Project Documentation  |  9 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

##### **Important business and validation rules** 

- Trainer and interviewer capabilities may be separate roles or profile types. Approval/verification is required before profiles become publicly bookable. Public responses must not expose private contact or account data. 

##### **Core data concepts** 

TrainerProfile, InterviewerProfile, Expertise, ProfileExpertise, Language, ProfileReview 

#### **6.6 Dashboards** 

Purpose: Provide role-specific summary data and shortcuts for candidates, trainers, interviewers, admins and corporate coordinators. 

##### **Key components** 

- DashboardController 

- DashboardQueryService 

- DashboardReadRepository 

##### **Proposed API endpoints** 

- GET /api/v1/dashboard/candidate 

- GET /api/v1/dashboard/trainer 

- GET /api/v1/dashboard/interviewer 

- GET /api/v1/dashboard/admin 

- GET /api/v1/dashboard/corporate 

##### **Important business and validation rules** 

- Dashboard endpoints return aggregated summaries only. Each endpoint checks the current user's role and data scope. Dashboard counts must not bypass underlying resource permissions. 

##### **Core data concepts** 

Dashboard data is derived from users, bookings, sessions, payments, courses and notifications; a separate dashboard table is optional and requires performance evidence. 

#### **6.7 Interview Marketplace & Packages** 

Purpose: Allow candidates to discover approved interviewers, view expertise, interview packages, pricing and package details. 

##### **Key components** 

- MarketplaceController 

- MarketplaceQueryService 

- PackageService 

- InterviewerSearchRepository 

##### **Proposed API endpoints** 

- GET /api/v1/marketplace/interviewers 

- GET /api/v1/marketplace/interviewers/{id} 

- GET /api/v1/marketplace/packages 

- GET /api/v1/marketplace/packages/{id} 

- POST /api/v1/admin/packages 

- PUT /api/v1/admin/packages/{id} 

Confidential – Internal Project Documentation  |  10 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

##### **Important business and validation rules** 

- Only active and approved interviewer profiles and published packages are visible. Price and package version should be snapshotted into a booking/order to preserve historical accuracy. 

##### **Core data concepts** 

InterviewPackage, PackageFeature, InterviewerProfile, InterviewerExpertise, PackageInterviewer 

#### **6.8 Availability & Booking Management** 

Purpose: Manage interviewer availability, slot discovery, booking, cancellation, rescheduling and booking status. 

##### **Key components** 

- AvailabilityController / BookingController 

- AvailabilityService: creates and retrieves available slots. 

- BookingService: validates and creates booking. 

- BookingPolicy: cancellation/reschedule rules. 

- BookingRepository: transactional persistence. 

##### **Proposed API endpoints** 

- GET /api/v1/interviewers/{id}/availability 

- POST /api/v1/bookings 

- GET /api/v1/bookings/me 

- GET /api/v1/bookings/{id} 

- POST /api/v1/bookings/{id}/cancel 

- POST /api/v1/bookings/{id}/reschedule 

- GET /api/v1/admin/bookings 

##### **Important business and validation rules** 

- A slot must not be confirmed for two bookings. Booking creation validates interviewer status, package validity, slot availability and candidate eligibility. Cancellation and rescheduling must follow configurable cut-off and refund rules. All times are stored consistently (UTC recommended) and displayed in the user's selected timezone. 

##### **Core data concepts** 

AvailabilityRule, AvailabilitySlot, Booking, BookingStatusHistory, BookingReschedule, InterviewPackage 

#### **6.9 Payments & Financial Management** 

Purpose: Handle checkout, payment initiation, gateway callbacks, transactions, invoices, refunds, subscriptions and reconciliation. 

##### **Key components** 

- PaymentController 

- PaymentService 

- PaymentGatewayAdapter 

- WebhookController 

- InvoiceService 

- RefundService 

- ReconciliationJob 

##### **Proposed API endpoints** 

- POST /api/v1/payments/checkout 

- GET /api/v1/payments/{id} 

Confidential – Internal Project Documentation  |  11 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

- POST /api/v1/payments/webhook/{provider} 

- GET /api/v1/invoices/{id} 

- POST /api/v1/admin/payments/{id}/refund 

- GET /api/v1/admin/transactions 

##### **Important business and validation rules** 

- Never store card numbers or CVV. Verify gateway signatures. Use idempotency keys for checkout and callback processing. Booking confirmation must be driven by verified payment state when payment is required. Refunds must be auditable and linked to the original transaction. 

##### **Core data concepts** 

Order, Payment, PaymentTransaction, Invoice, Refund, Subscription, PaymentWebhookEvent 

#### **6.10 Live Session Management** 

Purpose: Create and manage one-to-one interview meeting sessions, meeting access, lifecycle and attendance. 

##### **Key components** 

- SessionController 

- SessionService 

- VideoProviderAdapter 

- SessionAccessService 

- AttendanceService 

##### **Proposed API endpoints** 

- POST /api/v1/bookings/{bookingId}/session 

- GET /api/v1/sessions/{id} 

- POST /api/v1/sessions/{id}/join 

- POST /api/v1/sessions/{id}/attendance 

- PATCH /api/v1/sessions/{id}/status 

##### **Important business and validation rules** 

- Only booking participants and authorised staff can access a session. Meeting credentials must be short-lived and never exposed in public profile responses. Session creation should be idempotent for a booking. Recording requires explicit product, legal and consent decisions. 

##### **Core data concepts** 

InterviewSession, SessionParticipant, Attendance, SessionEvent, Booking 

#### **6.11 Evaluation & Feedback** 

Purpose: Capture interviewer evaluation, scoring, written feedback and candidate-visible reports after an interview. 

##### **Key components** 

- EvaluationController 

- EvaluationService 

- EvaluationPolicy 

- EvaluationRepository 

##### **Proposed API endpoints** 

- POST /api/v1/sessions/{sessionId}/evaluation 

- GET /api/v1/evaluations/{id} 

Confidential – Internal Project Documentation  |  12 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

- GET /api/v1/candidates/me/evaluations 

- PUT /api/v1/evaluations/{id} 

##### **Important business and validation rules** 

- Only an assigned interviewer or authorised reviewer can submit an evaluation. Submission is allowed only for an eligible session state. Once published, changes should be versioned or audited. Candidate visibility follows publication status. 

##### **Core data concepts** 

Evaluation, EvaluationCriterion, EvaluationScore, FeedbackComment, InterviewSession 

#### **6.12 Notification Management** 

Purpose: Deliver in-app and external notifications for account events, booking updates, payment status, reminders and evaluation publication. 

##### **Key components** 

- NotificationService 

- NotificationTemplateService 

- EmailProviderAdapter 

- SignalRNotificationHub 

- NotificationJob 

##### **Proposed API endpoints** 

- GET /api/v1/notifications/me 

- PATCH /api/v1/notifications/{id}/read 

- PATCH /api/v1/notifications/me/read-all 

- PUT /api/v1/notifications/preferences 

##### **Important business and validation rules** 

- Notification delivery is asynchronous where possible. Store delivery status and retry transient failures. Do not include passwords, tokens or sensitive payment data in notification content. 

##### **Core data concepts** 

Notification, NotificationPreference, NotificationTemplate, NotificationDelivery 

#### **6.13 LMS – Learning Management** 

Purpose: Support learning capabilities such as courses and cohorts. Further LMS submodules must be aligned with the full Phase 5 requirements. 

##### **Key components** 

- CourseController 

- CourseService 

- CohortService 

- EnrollmentService 

- LearningContentService 

##### **Proposed API endpoints** 

- GET /api/v1/courses 

- GET /api/v1/courses/{id} 

- POST /api/v1/admin/courses 

Confidential – Internal Project Documentation  |  13 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

- POST /api/v1/cohorts 

- POST /api/v1/courses/{id}/enrollments 

- GET /api/v1/learners/me/courses 

##### **Important business and validation rules** 

- Only published courses are visible for public discovery. Enrollment eligibility, seat limits, course access and completion rules must be validated by the application layer. 

##### **Core data concepts** 

Course, CourseModule, Lesson, Cohort, Enrollment, LearningProgress 

#### **6.14 Admin Configuration & Audit** 

Purpose: Provide controlled configuration for roles, packages, content, platform settings and audit visibility. 

##### **Key components** 

- AdminConfigurationController 

- ConfigurationService 

- AuditQueryService 

##### **Proposed API endpoints** 

- GET /api/v1/admin/configuration 

- PUT /api/v1/admin/configuration/{key} 

- GET /api/v1/admin/audit-logs 

##### **Important business and validation rules** 

- Configuration changes require explicit permissions and audit records. Secrets must be stored in a secret manager or secure environment configuration, never in ordinary configuration records. 

##### **Core data concepts** 

PlatformSetting, AuditLog, Role, Permission 

#### **6.15 Skillezo Integration** 

Purpose: Exchange agreed data and workflow events between CodzSkill Labs and the separate Skillezo platform. 

##### **Key components** 

- SkillezoApiClient 

- ExternalIdentityService 

- WebhookPublisher 

- WebhookReceiver 

- IntegrationOutboxRepository 

##### **Proposed API endpoints** 

- GET /api/v1/integrations/skillezo/packages 

- POST /api/v1/integrations/skillezo/bookings (as agreed) 

- POST /api/v1/integrations/webhooks/skillezo 

- GET /api/v1/integrations/events/{eventId} 

##### **Important business and validation rules** 

- Use OAuth 2.0 / OpenID Connect for approved identity and API access flows. Sign outbound webhooks, verify inbound signatures, timestamp requests and reject replayed events. Keep both platform databases separate. Persist outbound events before delivery and retry safely. 

Confidential – Internal Project Documentation  |  14 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

##### **Core data concepts** 

ExternalIdentityLink, IntegrationEvent, WebhookDelivery, ExternalReference 

### **7. API Design Standards** 

#### **7.1 URL and Versioning** 

Use resource-oriented REST endpoints with a version prefix such as /api/v1. Use plural resource names for collections and stable identifiers for individual resources. 

#### **7.2 HTTP Methods** 

|**Method**|**Purpose**|**Example**|
|---|---|---|
|GET|Read resource(s)|GET /api/v1/bookings/me|
|POST|Create resource or initiate operation|POST /api/v1/bookings|
|PUT|Replace/update a resource<br>representation|PUT /api/v1/candidates/me/profile|
|PATCH|Partial update or state transition|PATCH /api/v1/notifications/{id}/read|
|DELETE|Delete where deletion is permitted|DELETE /api/v1/admin/packages/{id}|



#### **7.3 Standard Response Shape** 

{ 

"success": true, "message": "Booking created successfully.", "data": { "bookingId": "resource-id", "status": "PendingPayment" }, "errors": [], "traceId": "correlation-id" } 

The exact envelope may be replaced by the organisation's standard API response contract. Validation and server errors should use a consistent Problem Details format where appropriate. 

#### **7.4 Status Codes** 

|**Status**|**Usage**|
|---|---|
|200 OK|Successful read or update.|
|201 Created|Resource successfully created.|
|202 Accepted|Asynchronous operation accepted.|
|204 No Content|Successful operation with no response body.|
|400 Bad Request|Malformed request or validation failure.|
|401 Unauthorized|Missing or invalid authentication.|
|403 Forbidden|Authenticated but not permitted.|
|404 Not Found|Resource does not exist or is not visible to caller.|
|409 Conflict|Concurrency, duplicate or invalid state conflict.|
|422 Unprocessable Entity|Semantically invalid business request, if adopted by API|



Confidential – Internal Project Documentation  |  15 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

||convention.|
|---|---|
|429 Too Many Requests|Rate limit exceeded.|
|500 Internal Server Error|Unexpected server-side failure.|



#### **7.5 Pagination and Filtering** 

Collection endpoints should support consistent pagination and bounded page sizes. Common query parameters may include page, pageSize, search, sortBy, sortDirection and status. The API must validate page size and avoid unbounded result sets. 

### **8. Core Data Model Overview** 

This section lists logical entities only. The separate Database Design Document will define exact columns, SQL data types, primary keys, foreign keys, unique constraints, indexes, cardinalities and ER diagrams. 

|**Domain**|**Logical entities / relationships**|
|---|---|
|Identity|User, Role, Permission, UserRole, RolePermission, RefreshToken.<br>A user may have one or more assigned roles according to the<br>approved policy.|
|Profiles|CandidateProfile, TrainerProfile, InterviewerProfile, Education,<br>Experience, Skill, ProfileSkill, Expertise.|
|Marketplace|InterviewPackage, PackageFeature, InterviewerExpertise.<br>Packages may be linked to one or more eligible interviewers.|
|Booking|AvailabilityRule, AvailabilitySlot, Booking, BookingStatusHistory,<br>BookingReschedule. A booking references a candidate,<br>interviewer, package and selected slot.|
|Payments|Order, Payment, PaymentTransaction, Invoice, Refund,<br>Subscription. A payment belongs to an order; refunds reference<br>an original payment/transaction.|
|Sessions|InterviewSession, SessionParticipant, Attendance, SessionEvent.<br>A session is associated with a booking.|
|Evaluation|Evaluation, EvaluationCriterion, EvaluationScore,<br>FeedbackComment. An evaluation references a<br>completed/eligible session.|
|Notifications|Notification, NotificationPreference, NotificationTemplate,<br>NotificationDelivery.|
|LMS|Course, CourseModule, Lesson, Cohort, Enrollment,<br>LearningProgress.|
|Integration|ExternalIdentityLink, IntegrationEvent, WebhookDelivery,<br>ExternalReference.|
|Governance|AuditLog, PlatformSetting.|



#### **8.1 Data Ownership Rules** 

- CodzSkill Labs is authoritative for its users, profiles, bookings, payments, sessions and evaluations. 

- Skillezo is authoritative for its own career profiles, employability insights, job matching and recruiter workflows. 

- Cross-platform records use external identifiers and integration mappings; do not create cross-database foreign keys. 

- Financial and booking records should be retained according to approved legal and business retention policies. 

Confidential – Internal Project Documentation  |  16 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **9. Business Workflows** 

#### **9.1 Registration and Login** 

26. User submits registration details. 

27. API validates input and checks duplicate account identifiers. 

28. Password is securely hashed and user account is created in an appropriate initial status. 

29. Email verification token is generated and delivery is queued. 

30. User verifies email through a time-limited token. 

31. User submits login credentials. 

32. System verifies credentials, account status and applicable verification requirements. 

33. System issues an access token and refresh token according to the configured token policy. 

#### **9.2 Interview Discovery and Booking** 

34. Candidate searches the marketplace using filters such as expertise, package and availability. 

35. System returns only active and approved interviewers and published packages. 

36. Candidate selects an interviewer, package and available slot. 

37. Booking service revalidates the slot and applies a concurrency-safe reservation. 

38. System creates a booking in a pending-payment or configured initial state. 

39. Payment is initiated if payment is required. 

40. After verified payment success, booking is confirmed and notifications are queued. 

41. If payment fails or the hold expires, the booking is released or moved to the configured failure state. 

#### **9.3 Cancellation and Rescheduling** 

42. Authenticated participant requests cancellation or rescheduling. 

43. System verifies participant ownership and booking state. 

44. System checks cancellation/reschedule cut-off and applicable package policy. 

45. For rescheduling, the new slot is validated and reserved without losing the original booking prematurely. 

46. System updates booking history and any payment/refund workflow as required. 

47. Notifications are sent to affected participants. 

#### **9.4 Payment Callback** 

48. Payment provider sends a callback/webhook to the backend. 

49. Webhook endpoint validates provider signature and event authenticity. 

50. System checks whether the event has already been processed using a provider event ID/idempotency key. 

51. Payment state is updated transactionally. 

52. Related order and booking state are updated according to the payment outcome. 

53. An integration/notification event is persisted for asynchronous processing. 

54. Duplicate callbacks return a safe acknowledgement without duplicating financial operations. 

#### **9.5 Live Interview and Evaluation** 

55. Confirmed booking becomes eligible for session creation. 

56. Session service creates or retrieves the provider meeting room. 

57. Participants receive authorised, time-limited join access. 

58. Attendance and session lifecycle events are recorded. 

59. After session completion, the assigned interviewer submits evaluation criteria, scores and feedback. 

60. Evaluation is reviewed or published according to configured policy. 

61. Candidate receives a notification and can view the published report. 

Confidential – Internal Project Documentation  |  17 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **10. Skillezo Integration Design** 

#### **10.1 Integration Boundary** 

CodzSkill Labs and Skillezo are separate applications with separate databases. Integration is performed through authenticated APIs and signed webhooks. Neither application directly reads or writes the other's database. 

#### **10.2 Authentication and Trust** 

- Use OAuth 2.0 / OpenID Connect according to the agreed identity and service-to-service flows. 

- Use least-privilege scopes and rotate client credentials/secrets. 

- Validate issuer, audience, signature, expiry and required scopes/claims. 

- Use HTTPS for all integration traffic. 

#### **10.3 Proposed Event Flow** 

62. Skillezo identifies a candidate need for interview preparation or learning support. 

63. Skillezo requests available CodzSkill Labs packages or relevant catalogue information. 

64. Candidate is directed to or securely connected with CodzSkill Labs to complete booking and payment. 

65. CodzSkill Labs conducts the booked session and records the evaluation. 

66. After the evaluation is published, CodzSkill Labs emits a signed webhook containing the agreed minimal result reference and summary. 

67. Skillezo validates the webhook and updates the relevant Career Launchpad workflow. 

#### **10.4 Webhook Reliability** 

- Persist outgoing events in an outbox before attempting delivery. 

- Include event ID, event type, timestamp, schema version and correlation ID. 

- Sign the request body and include a timestamp to reduce replay risk. 

- Retry transient failures with bounded exponential backoff. 

- Make consumers idempotent and provide a manual replay/dead-letter process. 

- Do not transmit unnecessary personal or payment data. 

#### **10.5 Example Event Contract** 

{ 

"eventId": "unique-event-id", 

"eventType": "evaluation.published", 

"schemaVersion": "1.0", 

"occurredAtUtc": "2026-11-16T08:00:00Z", 

"correlationId": "correlation-id", 

"data": { 

- "externalCandidateReference": "skillezo-candidate-reference", 

- "bookingReference": "codzskill-booking-reference", 

- "evaluationReference": "codzskill-evaluation-reference", 

- "status": "Published" 

} 

} 

The payload is illustrative. The final contract, data minimisation rules and field mapping require approval from both platform teams. 

Confidential – Internal Project Documentation  |  18 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **11. Security Design** 

#### **11.1 Authentication** 

- Require authentication for all non-public endpoints. 

- Validate JWT signature, issuer, audience and expiry. 

- Use short-lived access tokens and revocable refresh tokens. 

- Hash passwords with a modern, adaptive password hashing algorithm. 

- Use secure, time-limited, single-use password reset and verification tokens. 

#### **11.2 Authorization** 

- Apply role-based policies for broad capabilities. 

- Apply resource-based checks for ownership and assignment (for example, candidate owns profile; assigned interviewer owns evaluation submission). 

- Use deny-by-default policy configuration. 

- Do not rely on hidden frontend buttons as an authorization mechanism. 

- Restrict Super Admin and financial operations to narrowly defined permissions. 

#### **11.3 Data Protection** 

- Use HTTPS in all environments beyond local development. 

- Store secrets outside source control. 

- Encrypt sensitive data in transit and at rest using approved platform capabilities. 

- Mask sensitive values in logs. 

- Restrict access to payment and identity data. 

- Define retention, deletion and audit requirements with the product owner. 

#### **11.4 API Protection** 

- Apply rate limiting to authentication, public forms and sensitive endpoints. 

- Validate and normalise user input. 

- Use anti-replay and signature validation for payment and integration webhooks. 

- Apply CORS only for approved frontend origins. 

- Keep API documentation and administrative endpoints protected as required. 

### **12. Error Handling and Logging** 

#### **12.1 Error Handling** 

Use centralized exception-handling middleware. Convert known validation, not-found, unauthorized, forbidden and conflict exceptions into consistent HTTP responses. Unexpected exceptions should return a generic error message and a trace/correlation identifier; internal stack traces must not be returned to clients. 

#### **12.2 Logging** 

- Use structured logs with timestamp, severity, environment, trace ID and module name. 

- Record security-sensitive and administrative actions in an audit log. 

- Never log passwords, access tokens, refresh tokens, CVV or full payment credentials. 

- Use correlation IDs across API requests, background jobs and webhook processing. 

- Define alerting for repeated payment failures, webhook delivery failures and authentication abuse. 

Confidential – Internal Project Documentation  |  19 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

### **13. Non-Functional Design** 

|**Attribute**|**Design requirement**|
|---|---|
|Performance|Use pagination, database indexes, bounded queries and caching<br>only where justified. Define measurable targets during technical<br>planning.|
|Scalability|Keep modules stateless where possible; externalise shared state<br>such as distributed cache and job storage when multiple<br>instances are deployed.|
|Availability|Use health checks, graceful error handling, retry policies and<br>operational monitoring.|
|Reliability|Use transactions for local consistency, idempotency for external<br>callbacks and durable background processing.|
|Maintainability|Enforce layer boundaries, modular folders, code reviews and<br>automated tests.|
|Security|Apply authentication, authorization, input validation, secret<br>management and audit logging.|
|Accessibility|Frontend screens should follow the organisation's accessibility<br>and responsive design standards.|
|Observability|Provide structured logs, metrics, traces and health endpoints.|



#### **13.1 Health Checks** 

Expose health endpoints for application liveness and readiness. Readiness checks may validate required dependencies such as SQL Server and background-job storage. Do not expose sensitive infrastructure details in public health responses. 

### **14. Deployment and Configuration** 

#### **14.1 Environment Separation** 

|**Environment**|**Purpose**|**Data guidance**|
|---|---|---|
|Development|Local developer testing|Synthetic or anonymised data.|
|Testing / QA|Integration and acceptance testing|Non-production data only.|
|Staging|Production-like release validation|Controlled test data.|
|Production|Live platform|Protected production data and restricted<br>access.|



#### **14.2 Configuration Areas** 

- SQL Server connection settings. 

- JWT issuer, audience, signing key reference and token expiry policy. 

- Frontend allowed origins and CORS policy. 

- Email provider configuration and templates. 

- Payment provider credentials and webhook secrets. 

- Video provider credentials and meeting settings. 

- Redis and Hangfire connection settings where enabled. 

- Skillezo API base URL, OAuth client configuration and webhook signing secret. 

Confidential – Internal Project Documentation  |  20 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **14.3 Release Practices** 

- Use environment-specific configuration and managed secrets. 

- Run database migrations through a controlled release process. 

- Deploy backward-compatible API and database changes where practical. 

- Maintain rollback and backup/restore procedures. 

- Never commit secrets, production connection strings or private certificates to Git. 

### **15. Testing Strategy** 

|**Test level**|**Focus**|**Examples**|
|---|---|---|
|Unit tests|Domain rules and application services|Booking policy, cancellation eligibility,<br>token expiry rules.|
|Integration tests|Database and infrastructure adapters|Repository persistence, transaction<br>behaviour, webhook idempotency.|
|API tests|HTTP contracts and authorization|401/403 handling, validation, pagination,<br>response schema.|
|End-to-end tests|Critical user journeys|Register → login; search → book → pay →<br>attend → evaluate.|
|Security tests|Common application security risks|Access control, rate limiting, token<br>validation, input handling.|
|Performance tests|Expected workload and bottlenecks|Marketplace search, slot availability,<br>dashboard queries.|



#### **15.1 Minimum Acceptance Scenarios** 

- A candidate cannot view or modify another candidate's private profile. 

- An unapproved interviewer is not shown as bookable. 

- Two candidates cannot successfully confirm the same interviewer slot. 

- A payment callback replay does not create a duplicate transaction or booking confirmation. 

- Only an assigned interviewer or authorised reviewer can submit an evaluation. 

- An unauthorised user cannot access a private session join link. 

- Failed Skillezo webhook delivery is retried without creating duplicate downstream records. 

### **16. Assumptions, Dependencies and Open Decisions** 

#### **16.1 Assumptions** 

- Clean Architecture with a Modular Monolith is the baseline; separate microservices are not assumed. 

- CodzSkill Labs and Skillezo maintain separate databases. 

- Integration uses approved APIs, OAuth 2.0 / OpenID Connect and signed webhooks. 

- Candidate, Trainer, Interviewer, Admin, Super Admin and Corporate Coordinator are the currently identified roles. 

- Marketplace, booking, payments, live sessions and evaluations are P0 phases; LMS is an expansion phase (P1). 

- React.js with TypeScript and ASP.NET Core Web API are the proposed frontend/backend technologies. 

#### **16.2 Decisions Requiring Product / Technical Confirmation** 

|**Decision**|**Why it is required**|
|---|---|
|Exact Phase 5 LMS scope|The shared requirement extract is incomplete; modules and<br>workflows must be confirmed.|



Confidential – Internal Project Documentation  |  21 

||CODZSKILL LABS  |  LOW LEVEL DESIGN|
|---|---|
|Payment gateway|Determines callback signature, refund and reconciliation adapter<br>details.|
|Video meeting provider|Determines meeting creation, participant tokens, attendance<br>and recording capabilities.|
|Email/SMS provider|Determines delivery adapter, templates and retry policy.|
|Role model|Confirm whether users may hold multiple roles and how role<br>switching works.|
|Booking payment policy|Confirm pending-payment hold duration, cancellation cut-offs<br>and refund rules.|
|Corporate Coordinator scope|Confirm organisation, team, candidate and reporting<br>permissions.|
|Skillezo API contracts|Confirm identity mapping, event payloads, scopes and<br>ownership of each data field.|
|Hosting and CI/CD|Confirm cloud provider, deployment topology, secrets manager<br>and release strategy.|
|Retention and compliance|Confirm data retention, consent, deletion and audit<br>requirements.|



#### **16.3 Dependencies** 

- Approved SRS and complete phase-wise requirements. 

- Final HLD and architecture review. 

- Database Design Document and ER diagram. 

- UML class/sequence/component diagrams and activity diagrams. 

- Third-party provider credentials, API documentation and sandbox environments. 

- Security, privacy and operational approval. 

### **17. Phase-wise Implementation Mapping** 

|**Phase**|**Implementation focus**|**LLD modules**|
|---|---|---|
|Phase 1 – Foundation & Core Platform<br>(P0)|Public site, identity, roles, user<br>management, profiles, dashboards, admin<br>configuration and infrastructure.|6.1–6.6, 6.14|
|Phase 2 – Mock Interview Marketplace &<br>Booking (P0)|Interviewer catalogue, packages,<br>availability, booking, cancellation and<br>rescheduling.|6.5, 6.7, 6.8|
|Phase 3 – Payments & Financial<br>Management (P0)|Checkout, gateway, transactions, invoices,<br>refunds, subscriptions and reconciliation.|6.9|
|Phase 4 – Live Sessions & Evaluation (P0)|Meeting rooms, attendance, evaluations,<br>feedback and notifications.|6.10–6.12|
|Phase 5 – Learning Management System<br>(P1)|Courses and cohorts; remaining LMS<br>scope to be confirmed.|6.13|
|Cross-phase integration|Secure interaction with Skillezo and<br>exchange of approved events.|6.15|



Confidential – Internal Project Documentation  |  22 

CODZSKILL LABS  |  LOW LEVEL DESIGN 

#### **17.1 Suggested End-to-End Delivery Slice** 

A useful vertical implementation slice is: interviewer catalogue → availability → booking → payment → live session → evaluation → notification / Skillezo outcome event. This validates the critical marketplace journey across modules rather than implementing isolated screens only. 

### **Appendix A – Naming Conventions** 

- Classes and public methods: PascalCase. 

- Local variables and parameters: camelCase. 

- Interfaces: prefix with I (for example, IBookingService). 

- DTOs: use clear Request/Response suffixes (for example, CreateBookingRequest). 

- API routes: lowercase plural resource names and version prefix. 

- Database tables and columns: follow one consistent approved naming convention. 

### **Appendix B – Glossary** 

|**Term**|**Meaning**|
|---|---|
|LLD|Low Level Design – implementation-level component and<br>behaviour specification.|
|HLD|High Level Design – system architecture and major component<br>view.|
|RBAC|Role-Based Access Control.|
|OIDC|OpenID Connect – identity layer built on OAuth 2.0.|
|DTO|Data Transfer Object.|
|Idempotency|Processing the same request/event more than once without<br>duplicating its effect.|
|Outbox pattern|Persisting an event with local data changes before asynchronous<br>delivery.|
|P0|Essential priority for the planned release.|
|P1|Expansion priority.|



###### **END OF DOCUMENT** 

Confidential – Internal Project Documentation  |  23 

