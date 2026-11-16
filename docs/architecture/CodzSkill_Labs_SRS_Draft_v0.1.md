**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

# **SOFTWARE REQUIREMENTS SPECIFICATION CodzSkill Labs** 

_EdTech & Interview Marketplace Platform_ 

|**Document Control**|**Value**|
|---|---|
|Document ID|CSL-SRS-001|
|Version / Status|0.1 / Initial Draft – Not Approved|
|Date|12 November 2026|
|Prepared for|CodzSkill Labs|
|Prepared by|Project Analysis – Working Draft|
|Source baseline|Requirement Analysis Draft v0.1; Technical Blueprint v1.0 (7 Nov<br>2026); R&D Report (11 Nov 2026); UI Prototype|



**Important: This SRS translates the available project material into testable draft requirements. Items marked TBD or Proposed require product-owner confirmation.** 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

## **Document Information** 

|**Version**|**Date**|**Author**|**Change**|
|---|---|---|---|
||||Initial SRS draft based on|
|0.1|12-Nov-2026|Project Analysis|available blueprint, R&D report<br>and prototype.|



### **Approval** 

|**Role**|**Name**|**Status**|**Date**|
|---|---|---|---|
|Product Owner|TBD|Pending|TBD|
|Engineering Lead|TBD|Pending|TBD|
|Business Stakeholder|TBD|Pending|TBD|



### **How to read this document** 

- Confirmed from source material: explicitly stated in the technical blueprint or R&D report. 

- Proposed: recommended behaviour to make requirements implementable; requires approval. 

- TBD: information is missing and must be decided by the product owner or relevant stakeholder. 

- Prototype observations are treated as screen/workflow references only, not proof that a feature is approved for production. 

## **1. Introduction** 

### **1.1 Purpose** 

This Software Requirements Specification (SRS) defines the expected behaviour, interfaces, constraints and quality requirements for CodzSkill Labs. It is intended to provide a shared baseline for product owners, business analysts, UI/UX designers, frontend and backend developers, QA engineers and operations teams. 

### **1.2 Product scope** 

CodzSkill Labs is a web-based EdTech and interview marketplace platform. It is expected to support course discovery and enrollment, cohort/batch delivery, trainer and interviewer management, one-to-one mock interview booking, payments, live sessions, evaluation and administrative operations. 

The platform is a separate application from Skillezo. CodzSkill Labs will own its operational data in SQL Server and communicate with Skillezo through authenticated, versioned APIs and signed webhooks. Direct database sharing is out of scope. 

### **1.3 Goals** 

- Allow candidates to discover and purchase learning products and interview services. 

- Allow trainers and interviewers to maintain profiles, skills and availability and perform assigned work. 

- Allow administrators to manage platform catalogue, people, bookings, payments and operational exceptions. 

- Enable approved learning/interview evidence to be exchanged with Skillezo with appropriate consent. 

- Provide a secure, maintainable foundation that can be delivered incrementally. 

### **1.4 Intended audience** 

Product/business stakeholders, project manager, architect, developers, QA, UI/UX, DevOps and integration teams. 

### **1.5 Definitions and abbreviations** 

**<mark>Term Meaning</mark>** 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

|SRS|Software Requirements Specification|
|---|---|
|MVP|Minimum Viable Product – smallest useful release|
|Candidate|Learner or customer using courses and/or interview services|
|Cohort / Batch|A scheduled group of learners following a course/program|
|Interviewer|Professional conducting a mock interview|
|Trainer|Person delivering learning sessions|
|SSO|Single Sign-On|
|OIDC|OpenID Connect|
|PKCE|Proof Key for Code Exchange|
|Webhook|Server-to-server event notification|
|TBD|To Be Decided|



## **2. Overall Description** 

### **2.1 Product perspective and system boundary** 

|**System**|**Primary responsibility**<br>i|**Data ownership**|
|---|---|---|
|Skillezo (existing)|Career profile, resume intelligence, skill<br>gaps, employability index, Career GPS and<br>job matching.|Existing Skillezo data store (MongoDB per<br>blueprint).|
|CodzSkill Labs (new)|Courses, cohorts, trainers/interviewers,<br>bookings, schedules, payments, sessions<br>and evaluations.|CodzSkill Labs SQL Server database.|
|External providers|Payment processing, video meeting,<br>email/SMS/notifications and file storage.|Provider-managed; references/statuses<br>retained by CodzSkill Labs.|



### **2.2 User classes and roles** 

|**Role**|**Description**|**Typical permissions**|
|---|---|---|
|Candidate|Learner/customer booking courses or<br>interviews.|Browse catalogue; manage own profile;<br>enroll; pay; view own<br>bookings/sessions/evaluations.|
|Trainer|Delivers courses and cohort sessions.|Manage own trainer profile/availability; view<br>assigned cohorts; record<br>attendance/outcomes where permitted.<br>i|
|Interviewer|Conducts one-to-one mock interviews.|Manage own profile/availability; view<br>assigned bookings; conduct sessions;<br>submit evaluations.|
|Admin|Platform operations user.|Manage users, catalogue, packages, people<br>verification, bookings, payments and<br>operational records.|
|Corporate user|Organization representative managing<br>employee learning.|Potentially manage organization, employee<br>enrollments and progress; exact MVP<br>permissions TBD.|



### **2.3 Operating environment** 

- Frontend: React with TypeScript; responsive browser-based user interface. 

- Backend: ASP.NET Core 10 Web API. 

- Persistence: SQL Server with Entity Framework Core 10. 

- Architecture direction: Clean Architecture foundation organised as a Modular Monolith. 

- Deployment, hosting region, supported browsers and infrastructure sizing: TBD. 

### **2.4 Design and implementation constraints** 

- CodzSkill Labs and Skillezo must remain separately deployable applications with separate databases. 

- No direct access from CodzSkill Labs to Skillezo's MongoDB or from Skillezo to CodzSkill Labs SQL Server. 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

- Cross-platform communication must use authenticated, versioned APIs and signed webhooks. 

- OAuth 2.0 / OpenID Connect Authorization Code flow with PKCE is the proposed SSO approach; identity provider ownership must be confirmed. 

- External identity must be mapped using a stable immutable subject identifier, not email address alone. 

- Sensitive learning/interview evidence must only be shared according to explicit candidate consent and approved data contracts. 

- The first implementation should use a Modular Monolith rather than starting with microservices. 

## **3. Functional Requirements** 

Priority definitions: P0 = required for the proposed first usable release; P1 = important follow-on capability; TBD = priority depends on MVP/business confirmation. All requirements below are draft and require stakeholder validation. 

|**ID**|**Area**|**Requirement**|**Priority**|**Actor**|
|---|---|---|---|---|
|||The system shall allow an|||
|FR-001|Authentication|eligible user to sign in<br>using the approved<br>authentication/SSO flow.|P0|Candidate, Trainer,<br>Interviewer, Admin|
|FR-002|Authorization|The system shall enforce<br>role- and permission-<br>based access to<br>protected functions and<br>data.|P0|All|
|FR-003|Profile|The system shall allow an<br>authenticated user to<br>view and update<br>permitted fields of their<br>own profile.|P0|All|
|FR-004|External identity|The system shall link an<br>external Skillezo identity<br>to a CodzSkill Labs<br>account using a stable<br>external subject<br>identifier.|P0|Integration|
|FR-005|Course catalogue|The system shall display<br>a searchable/browsable<br>list of published courses<br>and course details.|P1|Candidate|
|FR-006|Course administration|The system shall allow<br>authorised<br>administrators to create,<br>view, update,<br>publish/unpublish and<br>archive courses.|P1|Admin|
|||The system shall display<br>available<br>|||
|FR-007|Packages and pricing|course/interview<br>packages and their<br>approved pricing and<br>terms.|P1|Candidate, Admin|
|FR-008|Cohorts and batches|The system shall display<br>available<br>cohorts/batches, their<br>schedules, capacity and<br>relevant course<br>information.|P1|Candidate, Trainer,<br>Admin|
|FR-009|Enrollment|The system shall allow an<br>eligible candidate to<br>enroll in an available<br>cohort or learning<br>offering.|P1|Candidate|
|FR-010|Trainer profile|The system shall allow<br>trainers to maintain their|P1|Trainer|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

|||permitted profile, skills<br>and experience<br>information.|||
|---|---|---|---|---|
|FR-011|Trainer assignment|The system shall allow<br>authorised<br>administrators to assign<br>trainers to courses,<br>cohorts or sessions.|P1|Admin|
|FR-012|Interviewer catalogue|The system shall display<br>interviewer profiles and<br>relevant<br>expertise/interview types<br>to candidates.|P0|Candidate|
|FR-013|Interviewer profile|The system shall allow<br>interviewers to maintain<br>their permitted profile,<br>skills and professional<br>information.|P0|Interviewer|
|FR-014|Interviewer verification|The system shall allow<br>authorised<br>administrators to review<br>and approve/reject<br>interviewer profiles.|P0|Admin|
|FR-015|Availability management|i<br>The system shall allow<br>interviewers/trainers to<br>create, update and<br>deactivate availability<br>according to approved<br>scheduling rules.|P0|Interviewer, Trainer|
|FR-016|Availability lookup|The system shall show<br>candidates eligible<br>available slots for the<br>selected interviewer and<br>interview type.|P0|Candidate|
|FR-017|Booking|The system shall allow a<br>candidate to<br>request/book an<br>available interview slot<br>and create a booking<br>record.|P0|Candidate|
|FR-018|Booking confirmation|The system shall<br>communicate booking<br>status and relevant<br>session details to the<br>candidate and<br>interviewer.|P0|Candidate, Interviewer|
|FR-019|Booking management|The system shall allow<br>users to view their own<br>bookings and authorised<br>staff to view/manage<br>bookings for operations.|P0|Candidate, Interviewer,<br>Admin|
|FR-020|Reschedule/cancel|The system shall support<br>booking reschedule and<br>cancellation according to<br>approved policy and slot<br>rules.|P1|Candidate, Interviewer,<br>Admin|
|FR-021|Checkout/payment|Where payment is<br>required, the system<br>shall initiate checkout<br>through the approved<br>payment provider and<br>associate the transaction<br>with the relevant<br>order/booking.|P0 if paid MVP|Candidate|
|||The system shall process<br>i|||
|FR-022|Payment status|verified payment-<br>provider notifications and<br>updatepayment/booking|P0 if paid MVP|System|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

|||status idempotently.|||
|---|---|---|---|---|
|FR-023|Refunds|The system shall allow<br>authorised<br>administrators to<br>initiate/record refunds<br>according to the<br>approved refund policy<br>and provider capability.|P1|Admin|
|FR-024|Live session|The system shall provide<br>an authorised participant<br>with the approved<br>session join details or<br>provider launch flow.|P0|Candidate, Trainer,<br>Interviewer|
|FR-025|Attendance/session<br>status|The system shall record<br>session<br>lifecycle/attendance<br>information to the extent<br>supported by the<br>selected video provider.|P1|System, Admin|
|FR-026|Evaluation|The system shall allow an<br>assigned interviewer to<br>submit an evaluation for<br>a completed interview<br>using an approved<br>evaluation form.|P0|Interviewer|
|FR-027|Feedback visibility|The system shall allow<br>candidates to view<br>evaluations/feedback<br>that have been published<br>and are permitted for<br>candidate visibility.|P0|Candidate|
|FR-028|Notifications|The system shall send<br>configured booking,<br>payment, schedule and<br>evaluation notifications<br>through approved<br>channels.|P1|System|
|FR-029|Skillezo event publishing|The system shall publish<br>approved events such as<br>MockInterviewBooked,<br>InterviewEvaluationPubli<br>shed and<br>LearningEvidenceUpdate<br>d to Skillezo using signed<br>webhooks.|P0 for integration release|System|
|FR-030|Audit/operations|The system shall record<br>auditable activity for<br>security-sensitive and<br>business-critical actions<br>and provide authorised<br>operational views.|P0|Admin|



## **4. Use Cases and Main Workflows** 

### **4.1 Candidate books a mock interview** 

1. Candidate signs in and opens the interviewer marketplace. 

2. Candidate selects an interview type and views eligible interviewer profiles. 

3. Candidate opens an interviewer profile and requests available slots. 

4. System displays available slots using the candidate's selected/display timezone. 

5. Candidate selects a slot and submits a booking request. 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

6. System validates that the slot is still available and creates a pending/confirmed booking according to the approved payment policy. 

7. If payment is required, candidate completes checkout; verified payment result updates the booking. 

8. System sends confirmation and session details to relevant participants. 

9. At the scheduled time, authorised participants join the live session. 

10. Interviewer completes the evaluation; after publication, candidate can view permitted feedback. 

11. CodzSkill Labs sends approved booking/evaluation events to Skillezo. 

### **4.2 Candidate enrolls in a course** 

12. Candidate signs in and browses the course catalogue. 

13. Candidate opens course details and selects an available package/cohort where applicable. 

14. System validates enrollment eligibility and available capacity. 

15. Candidate completes payment if required. 

16. System records enrollment and displays cohort/batch schedule. 

17. Candidate receives enrollment and session notifications. 

### **4.3 Trainer delivers a cohort session** 

18. Trainer signs in and views assigned courses, cohorts and sessions. 

19. Trainer opens the relevant session and obtains authorised join details. 

20. Trainer conducts the session using the selected live-session provider. 

21. Trainer records attendance or learning outcomes where those capabilities are in scope. 

### **4.4 Admin manages platform operations** 

22. Admin signs in with an authorised administrative account. 

23. Admin reviews pending interviewer/trainer verification and catalogue changes. 

24. Admin monitors bookings, payment states, cancellations, refunds and exceptions. 

25. Admin performs permitted corrective actions; each sensitive action is audited. 

## **5. External Interface Requirements** 

### **5.1 User interface** 

- The UI shall provide role-appropriate navigation and screens for Candidate, Trainer, Interviewer and Admin. 

- The UI shall show clear loading, empty, validation, success and error states for major workflows. 

- The UI shall prevent presentation of actions that the current user is not authorised to perform, while the backend remains the authority for access control. 

- The interface shall be responsive for desktop, tablet and mobile browser layouts; detailed breakpoints and accessibility target are TBD. 

### **5.2 CodzSkill Labs API** 

The backend shall expose versioned REST endpoints. The following are illustrative endpoint groups, not a final API contract: 

|**Area**|**Example endpoints**|
|---|---|
|Identity/profile|POST /api/v1/auth/login (if local auth is approved); GET<br>/api/v1/users/me; PUT /api/v1/users/me|
|Courses|GET /api/v1/courses; GET /api/v1/courses/{courseId}; POST/PUT<br>/api/v1/admin/courses|
|Cohorts|GET /api/v1/cohorts; POST /api/v1/enrollments|
|Interviewers|GET /api/v1/interviewers; GET /api/v1/interviewers/{id}; GET<br>/api/v1/interviewers/{id}/availability|
|Bookings|POST /api/v1/mock-interviews/bookings;GET /api/v1/bookings/my;|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

||POST /api/v1/bookings/{id}/reschedule; POST<br>/api/v1/bookings/{id}/cancel|
|---|---|
|Payments|POST /api/v1/payments/checkout; GET /api/v1/payments/{id};<br>POST /api/v1/payments/webhooks/{provider}|
|Sessions/evaluation|POST /api/v1/sessions/{id}/join; POST /api/v1/evaluations; GET<br>/api/v1/evaluations/my|



### **5.3 Skillezo integration** 

Proposed Skillezo-to-CodzSkill Labs API calls from the technical blueprint: 

- GET /api/v1/interview-packages 

- GET /api/v1/interviewers/{id}/availability 

- POST /api/v1/mock-interviews/bookings 

Proposed CodzSkill Labs-to-Skillezo signed webhook events: 

- MockInterviewBooked 

- InterviewEvaluationPublished 

- LearningEvidenceUpdated 

- Each integration request/event shall use agreed authentication, signature verification, schema versioning, retry policy and idempotency/correlation identifiers. Exact contract details are TBD. 

### **5.4 Payment provider interface** 

- The system shall integrate with one product-approved payment provider; provider, currencies, tax handling and settlement model are TBD. 

- Payment status shall be trusted only after server-side verification of provider response/webhook, not solely from a browser redirect. 

- Webhook handling shall be authenticated, replay-resistant where supported, and idempotent. 

### **5.5 Video/live-session provider interface** 

- The system shall integrate with a selected video/session provider or approved meeting solution. 

- The system shall restrict join information to authorised booking/session participants. 

- Provider choice, recording policy, attendance callbacks and retention requirements are TBD. 

### **5.6 Notifications and file storage** 

- Email/SMS/in-app notification providers and templates are TBD. 

- Profile documents, course assets and session resources shall use an approved object/file storage provider; provider, access policy and retention are TBD. 

## **6. Data Requirements** 

The following is an initial logical data inventory based on the R&D report. It is not a final ERD or approved schema. 

|**Domain**|**Candidate entities / records**|**Key notes**|
|---|---|---|
|Identity|Users, Roles, UserRoles, ExternalIdentities,<br>RefreshTokens|External identity must use immutable<br>subject mapping; token storage/security<br>policy TBD.|
|Learning|Categories, Courses, CoursePackages,<br>Cohorts, Batches, Enrollments|Course lifecycle, cohort capacity and<br>enrollment rules TBD.|
|People|TrainerProfiles, TrainerSkills,<br>InterviewerProfiles, InterviewTypes|Verification and profile visibility rules TBD.|
|Scheduling|AvailabilityRules, AvailabilitySlots, Bookings,<br>BookingParticipants|Timezone, slot holds, expiry, overlap and<br>concurrency rules TBD.|
|Payments|Payments,PaymentTransactions,|Paymentprovider,currency,tax,refund and|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

||Subscriptions, Refunds,<br>PaymentWebhookEvents|subscription rules TBD.|
|---|---|---|
|Sessions|LiveSessions, SessionParticipants,<br>SessionProviderReferences|Provider references and lifecycle status to<br>be defined.|
|Evaluation|Evaluations, EvaluationCriteria,<br>EvaluationScores, Feedback|Form structure, scoring scale, moderation<br>and visibility TBD.|
|Integration/operations|IntegrationEvents, WebhookInbox,<br>OutboxMessages, AuditLogs, Notifications|Reliable delivery, retry, deduplication and<br>audit retention required.|



### **6.1 Data integrity** 

- Every business record shall have a stable unique identifier. 

- Relationships between customers, bookings, payments, sessions and evaluations shall be enforced by appropriate database constraints and application validation. 

- A booking shall not be confirmed against a slot that has become unavailable. 

- Payment and webhook processing shall avoid duplicate financial or booking effects. 

- Data retention, deletion, export and privacy requirements require stakeholder/legal confirmation. 

## **7. Business Rules** 

|**ID**|**Rule**|
|---|---|
|BR-001|Only authenticated users may access protected account and<br>booking functions.|
|BR-002|A user may access or modify only their own private records unless an<br>authorised role grants broader access.|
|BR-003|Only approved/active interviewers may be shown as bookable;<br>approval workflow details are TBD.|
|BR-004|A booking must reference a valid interviewer, interview type,<br>candidate and time slot.|
|BR-005|The system must prevent double booking through server-side<br>concurrency/availability validation.|
|BR-006|Booking confirmation and payment state transitions must follow the<br>approved payment policy.|
|BR-007|Cancellation, rescheduling, refund eligibility and deadlines must<br>follow a product-approved policy; currently TBD.|
|BR-008|Only the assigned interviewer or an authorised administrator may<br>submit/manage an interview evaluation.|
|BR-009|Candidates may view only evaluations that have been published and<br>are designated visible to them.|
|BR-010|Skillezo receives only approved data/events and only under the<br>applicable consent and integration contract.|



## **8. Non-Functional Requirements** 

|**ID**|**Category**|**Requirement**|**Priority**|
|---|---|---|---|
|NFR-001|Security|All protected APIs shall require<br>valid authentication;<br>role/permission checks shall be<br>enforced server-side.|P0|
|NFR-002|Transport security|All production<br>client/API/provider<br>communication shall use<br>HTTPS/TLS.|P0|
|NFR-003|Data protection|Sensitive personal and payment-<br>related data shall be minimised<br>and protected; raw card data<br>should remain with the payment<br>provider unless explicitly|P0|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

|||approved and compliant.<br>||
|---|---|---|---|
|NFR-004|Authorization|The system shall prevent<br>insecure direct object reference<br>by validating<br>ownership/permissions for every<br>protected resource.|P0|
|NFR-005|Integration security|Webhook<br>signatures/authentication shall<br>be verified; secrets shall be<br>stored outside source code.|P0|
|NFR-006|Reliability|Critical integration events shall<br>be persisted and retried<br>according to a defined<br>retry/dead-letter policy.|P0|
|NFR-007|Idempotency|Payment callbacks and<br>externally retried booking/event<br>requests shall be handled<br>without duplicate business<br>effects.|P0|
|NFR-008|Performance|API response-time targets and<br>supported concurrency shall be<br>defined through workload<br>estimates and performance<br>testing; numeric targets TBD.|TBD|
|||The application shall support<br>horizontal/vertical scaling||
|NFR-009|Scalability|options without requiring a<br>microservices split in the initial<br>release.|P1|
|NFR-010|Availability|Production uptime,<br>maintenance window, backup<br>and recovery objectives shall be<br>agreed before launch.|TBD|
|NFR-011|Observability|The system shall produce<br>structured logs, correlation IDs<br>and operational metrics for key<br>workflows.|P0|
|NFR-012|Maintainability|The solution shall follow defined<br>module boundaries,<br>dependency direction and<br>coding conventions.|P0|
|NFR-013|Compatibility|The web application shall<br>support agreed modern<br>browsers and responsive<br>viewport sizes; exact browser<br>matrix TBD.|P1|
|NFR-014|Accessibility|The UI shall follow an agreed<br>accessibility target and support<br>keyboard navigation and<br>understandable validation<br>messages; target TBD.|P1|
|||Database backup frequency,<br>retention and||
|NFR-015|Backup/recovery|recovery-point/recovery-time<br>objectives shall be defined and<br>tested before production.|TBD|



## **9. Security and Privacy Requirements** 

- Use the approved identity provider and OAuth 2.0 / OpenID Connect flow; do not copy or store Skillezo passwords in CodzSkill Labs. 

- Use immutable external subject identifiers for account linking; email alone is not a safe identity key. 

- Enforce least-privilege access for candidates, trainers, interviewers, corporate users and administrators. 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

- Protect personal data, evaluation reports, payment references and meeting join links from unauthorised access. 

- Record audit events for role changes, verification decisions, payment/refund actions, booking overrides and evaluation publication. 

- 

- 

- Obtain and record candidate consent before sharing learning/interview evidence with Skillezo. 

- Define data retention, deletion, access/export and breach response requirements with the product owner and legal/privacy stakeholders. 

## **10. Error Handling and System States** 

|**Scenario**|**Expected behaviour (proposed)**|
|---|---|
|Invalid/expired authentication<br>f|Reject request and return an appropriate authentication error; client<br>prompts re-authentication.|
|Insufficient permission|Reject request; do not disclose protected resource data.|
|Slot no longer available|Do not create a confirmed booking; return a clear conflict/availability<br>response and refresh available slots.|
|Payment pending/failed|Keep booking/payment in an explicit pending or failed state; do not<br>mark paid based only on client redirect.|
|Duplicate provider webhook|Acknowledge safely after deduplication; do not repeat payment or<br>booking side effects.|
|Skillezo temporarily unavailable|Persist outbound event and retry based on agreed policy; expose<br>failure to operations if retries are exhausted.|
|Video provider failure|Show actionable session error and provide an approved<br>recovery/support path; exact policy TBD.|



## **11. Acceptance Criteria and Verification** 

Each requirement shall be testable. QA and product stakeholders should approve detailed test cases before release. Initial examples: 

|**Workflow**|**Minimum acceptance criteria**|
|---|---|
|Role access|Candidate cannot access admin-only endpoints; server returns<br>forbidden and no protected data is returned.|
|Interviewer availability|Candidate sees only valid bookable slots; concurrent requests<br>cannot confirm the same slot twice.|
|Booking|A valid request creates one booking with correct candidate,<br>interviewer, type, slot and status.|
|Payment|Only verified provider success can mark payment successful;<br>duplicate webhook does not duplicate effects.|
|Evaluation|Assigned interviewer can submit evaluation; candidate sees it only<br>after publication and according to visibility rules.|
|Skillezo event|Approved event is signed, versioned, correlated and retried when the<br>receiving system is temporarily unavailable.|



### **11.1 Requirement traceability** 

Every FR/NFR should map to one or more design components, API endpoints, database entities and test cases during HLD/LLD and QA planning. A detailed traceability matrix will be maintained after requirements are validated and numbered requirements are baselined. 

## **12. Proposed Release Scope** 

The R&D report recommends validating a complete end-to-end mock-interview vertical slice. This SRS treats the following as a proposed MVP candidate, not an approved commitment: 

Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

|**MVP candidate capability**|**Related requirements**|
|---|---|
|Sign-in/identity and role access|FR-001 to FR-004; NFR-001 to NFR-005|
|Interviewer catalogue/profile and admin verification|FR-012 to FR-014|
|Availability and slot lookup|FR-015 to FR-016|
|Booking and booking visibility<br>i|FR-017 to FR-019|
|Payment, only if required in first release|FR-021 to FR-023|
|Live session join|FR-024|
|Evaluation and candidate feedback|FR-026 to FR-027|
|Skillezo integration for approved events|FR-029|



Full course marketplace, cohort delivery, corporate portal, subscriptions, advanced reporting and expanded operations may be delivered in later phases subject to stakeholder prioritisation. 

## **13. Assumptions, Dependencies and Open Decisions** 

|**ID**|**Decision required**|**Owner**|**Status**|
|---|---|---|---|
||MVP role set and whether|||
|OD-001|Corporate user is included in<br>first release.|Product Owner|Open|
|OD-002|Identity provider ownership and<br>exact SSO hand-off between<br>Skillezo and CodzSkill Labs.|Product/Engineering|Open|
||Whether CodzSkill Labs|||
|OD-003|supports local authentication in<br>addition to SSO.|Product/Engineering|Open|
|OD-004|Payment gateway, supported<br>currencies, tax/invoice rules and<br>settlement model.|Business/Finance|Open|
|OD-005|Whether payment is mandatory<br>for the first mock-interview MVP.|Product Owner|Open|
|OD-006|Video provider, recording policy,<br>participant limits and<br>attendance callbacks.|Product/Engineering|Open|
|OD-007|Availability model: recurring<br>rules vs manually created slots,<br>timezone and daylight-saving<br>behaviour.|Product/Operations|Open|
|OD-008|Slot hold duration, booking<br>expiry and concurrent booking<br>behaviour.|Product/Engineering|Open|
|OD-009|Cancellation, reschedule, no-<br>show, refund and dispute<br>policies.|Business/Operations|Open|
|OD-010|Evaluation template, scoring<br>scale, moderation and<br>candidate visibility rules.|Product/Interview Operations|Open|
|OD-011|Exact Skillezo API contracts,<br>event schemas, consent fields<br>and webhook security details.|Integration teams|Open|
|OD-012|Notification channels, templates<br>and delivery provider.|Product/Operations|Open|
|OD-013|Hosting/cloud provider,<br>deployment environments,<br>region and backup/recovery<br>objectives.|Engineering/DevOps|Open|
|OD-014|Performance targets, expected<br>users, peak concurrency and<br>availability SLA.|Product/Engineering|Open|
||Data retention, privacy, deletion|||
|OD-015|and audit retention<br>requirements.|Product/Legal|Open|



Draft v0.1  |  12 November 2026  |  For review and validation 

**CODZSKILL LABS  |  SOFTWARE REQUIREMENTS SPECIFICATION** 

## **14. Risks and Mitigations** 

|**Risk**|**Potential impact**|**Suggested mitigation**|
|---|---|---|
|Unconfirmed MVP scope|Rework, schedule slippage and unclear<br>acceptance.|Obtain product-owner sign-off on MVP roles,<br>workflows and exclusions.|
|SSO/identity ambiguity|Duplicate accounts or failed cross-platform<br>journeys.|Agree identity provider, immutable subject<br>mapping and account-linking rules early.|
|Double booking/timezone errors|Poor user experience and operational<br>disputes.|Define timezone model, slot holds,<br>concurrency control and automated tests.|
|Payment webhook duplication/failure|Incorrect payment or booking state.|Verify signatures, use idempotency, persist<br>inbox/outbox events and reconcile.|
|Video provider uncertainty|Session delivery failure or late integration<br>changes.|Select provider and validate join/attendance<br>APIs before committing schedule.|
|Prototype mistaken for final scope|Building mock-only or unapproved features.|Validate each prototype screen and<br>workflow with product owner.|



## **15. Source Material and Relationship to Other Deliverables** 

- CodzSkill Labs ASP.NET Core 10 Architecture and Skillezo Integration – Technical Blueprint v1.0, dated 7 November 2026. 

- CodzSkill Labs R&D Report, dated 11 November 2026. 

- CodzSkill Labs React UI prototype archive supplied for analysis. 

- Requirement Analysis Draft v0.1, dated 12 November 2026. 

This SRS is based on the above materials. Where they are incomplete or inconsistent, the document marks the matter as Proposed or TBD rather than inventing a final decision. 

## **16. Sign-off** 

Approval of this document confirms that the listed requirements and open decisions have been reviewed. Approval should be followed by baselining, change control and traceability into HLD, LLD, implementation and test plans. 

|**Approver role**|**Name**|**Signature / approval**<br>**reference**|**Date**|
|---|---|---|---|
|Product Owner|TBD|Pending|TBD|
|Engineering Lead|TBD|Pending|TBD|
|Business Stakeholder|TBD|Pending|TBD|



Draft v0.1  |  12 November 2026  |  For review and validation 

