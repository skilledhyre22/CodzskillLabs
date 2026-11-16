**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

# **CODZSKILL LABS Requirement Analysis** 

Initial Baseline • Draft v0.1 

**Prepared: 12 November 2026** 

Based on the supplied R&D report, architecture/integration blueprint and frontend prototype archive. 

**STATUS: WORKING DRAFT — NOT YET APPROVED** 

Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

## **Document Control** 

|**Field**|**Details**|
|---|---|
|Document|CodzSkill Labs – Requirement Analysis|
|Version|0.1 – Initial baseline|
|Date|12 November 2026|
|Status|Draft for product/engineering validation|
|Primary inputs|CodzSkill Labs R&D Report (11 Nov 2026); CodzSkill Labs ASP.NET<br>Core 10 Architecture & Skillezo Integration (Version 1.0, 7 Nov 2026);<br>supplied React prototype ZIP|
|Purpose|Establish an initial understanding of product scope, users,<br>workflows, functional needs, quality expectations, assumptions and<br>decisions required before the SRS is baselined.|



### **How to read this document** 

- Confirmed from source: directly stated in the supplied product/architecture documents or visible in the prototype. 

- Proposed requirement: a reasonable requirement inferred from the intended workflow; it needs product-owner confirmation. 

- Open decision: information not defined clearly enough in the source material and must be clarified. 

- The prototype is a reference UI, not proof that a feature is implemented or approved. Its mock data and mock services must not be treated as production behavior. 

## **1. Introduction** 

### **1.1 Purpose** 

This document captures the initial business and system requirements for CodzSkill Labs. It is intended to align the product owner, business stakeholders, design team and engineering team on what the platform is expected to support. It will be refined after stakeholder review and then used as an input to the Software Requirements Specification (SRS), architecture design and delivery planning. 

### **1.2 Product vision** 

CodzSkill Labs is envisioned as a learning, training and professional-services platform that brings together course discovery, cohort-based learning, trainer operations, one-to-one mock interview bookings, payments, live sessions, assessments and evaluations. It is designed to work alongside Skillezo, which owns the career-intelligence and employability journey. 

### **1.3 Business outcomes** 

- Provide candidates with a single place to discover learning programs and professional interview services. 

- Enable trainers and interviewers to manage their profiles, schedules and assigned activities. 

- Give administrators operational control over catalogue, people, bookings, payments and platform activity. 

- Support corporate learning workflows where approved, including team rosters and assigned learning tracks. 

- Connect permitted learning and interview evidence with Skillezo through secure, consent-aware integration. 

## **2. Product Boundary and Scope** 

The two platforms have separate responsibilities and must remain independently deployable with independently owned databases. 

|**System**|**Primary responsibility**|**Technology boundary stated in source**|
|---|---|---|
|Skillezo|Candidate careerprofile,resume|ExistingMERNplatform(React/Next.js,|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

||intelligence, skill gaps, Employability Index,<br>Career GPS, job matching, recruiter journey.|Node.js, MongoDB).|
|---|---|---|
|CodzSkill Labs|Courses, cohorts, trainers/interviewers,<br>packages, bookings, schedules, payments,<br>live sessions and evaluations.|New React.js frontend + ASP.NET Core 10<br>Web API + EF Core 10 + SQL Server.|
|Integration|Identity linking, consent references, API<br>requests, event/webhook delivery.|Authenticated, versioned REST APIs,<br>OIDC/OAuth 2.0 and signed webhooks; no<br>shared database.|



### **2.1 In-scope capability areas (initial candidate scope)** 

- Public landing experience and course/service discovery. 

- Candidate, trainer, interviewer and administrator experiences. 

- Course catalogue and marketplace. 

- Cohort and batch management, enrolment and seat reservation. 

- Trainer profiles and trainer-led learning operations. 

- Interviewer marketplace, interview types, availability and one-to-one bookings. 

- Payments, invoices, subscriptions/packages and payment status handling. 

- Live classroom/interview session access. 

- Assessments, coding labs, evaluations, feedback and certificates. 

- Corporate portal/team learning management (release priority to be confirmed). 

- Skillezo identity and permitted learning/interview evidence integration. 

### **2.2 Out of scope / not assumed** 

- Replacing or migrating Skillezo's MERN stack or MongoDB database. 

- Building Skillezo's Employability Index, resume intelligence, job matching or recruiter portal inside CodzSkill Labs. 

- Direct cross-database access between Skillezo and CodzSkill Labs. 

- Selecting a payment gateway, video provider, identity provider or hosting vendor before the product team confirms it. 

- Treating every prototype interaction as a production-ready or MVP-approved feature. 

## **3. Stakeholders and User Roles** 

|**Role / stakeholder**|**Primary goals**|**Expected capabilities (subject to**<br>**approval)**|
|---|---|---|
|Candidate / Student|Find suitable learning or interview services<br>and track outcomes.|Manage own profile; browse<br>courses/interviewers; enrol/book; pay;<br>attend sessions; view permitted progress,<br>feedback and certificates.|
|Trainer|Deliver courses and cohort learning.|Maintain trainer profile; manage<br>availability/assigned cohorts; access<br>session information; record<br>attendance/progress; publish or deliver<br>course material as permitted.|
|Interviewer|Conduct one-to-one mock interviews and<br>submit evaluations.|Maintain expertise/profile; manage<br>availability; view assigned bookings; join<br>sessions; submit evaluation and feedback;<br>view session history.|
|Operations Admin|Operate and govern the platform.|Manage users/roles, catalogue,<br>trainers/interviewers, bookings,<br>payments/refunds and operational<br>exceptions.|
|Super Admin|Configure platform-wide controls.|Manage privileged configuration and audited<br>support access; exact permissions require<br>confirmation.|
|Corporate customer / coordinator|Coordinate learning for an employee group.|Manage team roster, assign learning tracks<br>and monitor permitted team-level progress;<br>MVP inclusion requires confirmation.|
|Skillezo integration client|Enable cross-platform journeys.|Use onlyapproved machine-to-machine|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

scopes and exchange minimum necessary data/events. 

### **3.1 Stakeholder groups for requirement validation** 

- Product owner / business sponsor – confirms business goals, priorities and MVP boundaries. 

- CodzSkill operations – validates trainer/interviewer operations, booking exceptions and admin workflows. 

- Engineering / architecture – validates technical constraints, API contracts, security and feasibility. 

- Design / UX – validates screens, navigation, states and accessibility. 

- Skillezo product/engineering – confirms SSO, identity mapping, consent and event contracts. 

- Finance / payment operations – confirms pricing, taxes, settlement, refunds and reconciliation. 

## **4. User Journeys and Business Workflows** 

### **4.1 Candidate – course learning journey** 

1. Candidate opens the public platform and browses the course catalogue. 

2. Candidate searches or filters courses and views course details, level, trainer, duration, schedule and price. 

3. Candidate selects an available cohort/batch or learning option. 

4. Candidate enrols or reserves a seat; if payment is required, checkout is initiated. 

5. System records enrolment/payment outcome and makes eligible learning information available to the candidate. 

6. Candidate attends scheduled sessions and completes assigned labs/assessments. 

7. Candidate views progress and, if eligibility rules are met, receives a certificate. 

### **4.2 Candidate – one-to-one mock interview journey** 

8. Candidate enters the mock-interview journey, directly or from Skillezo. 

9. Candidate selects an interview type/topic and browses eligible interviewers. 

10. Candidate views interviewer profile, expertise, price and available time slots. 

11. Candidate selects a slot and submits a booking request. 

12. System validates eligibility, slot availability, price and booking rules; it prevents conflicting confirmed bookings. 

13. If payment is required, system initiates checkout and verifies the payment outcome server-to-server. 

14. After confirmation, candidate and interviewer receive booking/session details. 

15. Authorized participants join the live session at the scheduled time. 

16. Interviewer submits the required evaluation; candidate can view feedback according to visibility rules. 

17. Where consent and integration rules permit, CodzSkill Labs publishes the agreed event/evidence to Skillezo. 

### **4.3 Trainer journey** 

18. Trainer signs in and views their profile and verification/approval state. 

19. Trainer views assigned courses, cohorts, batches and sessions. 

20. Trainer accesses relevant learner/session information within their permissions. 

21. Trainer conducts scheduled learning sessions and records required attendance or learning outcomes. 

22. Trainer views relevant history and operational updates. 

### **4.4 Interviewer journey** 

23. Interviewer maintains profile, expertise and verification details. 

24. Interviewer defines or updates availability. 

25. Interviewer reviews assigned booking requests and upcoming sessions. 

26. Interviewer joins the authorized session and conducts the interview. 

27. Interviewer completes the evaluation rubric and submits feedback. 

28. Interviewer views permitted session and earnings history. 

Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

### **4.5 Admin journey** 

29. Admin signs in with an authorized role. 

30. Admin manages users and role/status controls. 

31. Admin manages course catalogue, interview types, packages and pricing. 

32. Admin verifies trainers/interviewers and handles booking/payment exceptions. 

33. Admin reviews refunds/disputes and evaluation quality where authorized. 

34. Admin monitors platform operations and audit history. 

### **4.6 Corporate journey – proposed / priority to confirm** 

35. Corporate coordinator accesses an authorized organization workspace. 

36. Coordinator manages or imports team members. 

37. Coordinator assigns approved learning tracks or courses. 

38. Coordinator reviews permitted team-level completion and assessment summaries. 

## **5. Functional Requirements** 

Priority notation: P0 = required for the first agreed release; P1 = important follow-on; TBD = product owner must prioritize. These are proposed priorities, not approved commitments. 

|**ID**|**Area**|**Requirement**<br>**statement**|**Priority**|**Notes / acceptance**<br>**considerations**|
|---|---|---|---|---|
|FR-001|Identity & access|The system shall allow an<br>authorized user to sign in<br>and access functions<br>permitted by their role.|P0|Candidate,<br>trainer/interviewer and<br>admin authentication<br>flows; identity provider<br>and exact role model to<br>confirm.|
|FR-002|Identity & access|The system shall enforce<br>role- and resource-based<br>authorization on<br>protected operations.|P0|A user cannot access<br>another user's private<br>booking, payment, profile<br>or evaluation without<br>permission.|
|FR-003|User profile|The system shall allow<br>users to view and update<br>permitted profile<br>information.|P0|Profile fields and editable<br>fields differ by role; audit<br>sensitive changes.|
|FR-004|Course catalogue|The system shall display<br>published courses with<br>details such as title,<br>category, level, trainer,<br>duration, price and<br>syllabus.|P0|Only published/active<br>catalogue entries are<br>visible publicly.|
|FR-005|Course catalogue|The system shall support<br>course search/filtering<br>and course detail<br>viewing.|P1|Search/filter fields and<br>sorting rules to be<br>confirmed.|
|FR-006|Course management|Authorized staff shall<br>create, update,<br>publish/unpublish and<br>archive course catalogue<br>entries.|P1|Draft/published lifecycle<br>and who can publish to<br>be confirmed.|
|FR-007|Cohort/batch|Authorized staff shall<br>create and manage<br>cohorts/batches<br>associated with a course.|P1|Batch dates, schedule,<br>capacity, trainer and<br>status are recorded.|
|FR-008|Cohort/batch|The system shall allow<br>eligible candidates to<br>reserve/enrol in a cohort<br>while enforcing capacity.|P1|Concurrent last-seat<br>reservation must not<br>exceed capacity.|
|FR-009|Trainer management|The system shall|P1|Verification and approval|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

|||maintain trainer profiles,<br>skills, availability and<br>assignment information.||workflow to be<br>confirmed.|
|---|---|---|---|---|
|FR-010|Interviewer marketplace|The system shall list<br>eligible interviewers and<br>show approved profile<br>and expertise details.|P0|Only active/approved<br>interviewers appear in<br>candidate discovery.|
|FR-011|Interview catalogue|The system shall display<br>interview types,<br>packages, durations,<br>eligibility and prices.|P0|Package structure and<br>price ownership must be<br>confirmed.|
|FR-012|Availability|The system shall display<br>interviewer availability in<br>the candidate's<br>selected/local timezone.|P0|Timezone handling, slot<br>duration, buffers and<br>working-hour rules to be<br>confirmed.|
|FR-013|Booking|The system shall allow a<br>candidate to request a<br>booking for an available<br>interviewer slot.|P0|Booking request records<br>candidate, interviewer,<br>interview type/package,<br>slot and price snapshot.|
|FR-014|Booking|The system shall prevent<br>two candidates from<br>confirming the same<br>interviewer slot.|P0|Use transaction-safe<br>reservation/concurrency<br>controls and define<br>temporary slot-hold<br>expiry.|
|FR-015|Booking|The system shall support<br>booking status lifecycle<br>and authorized<br>reschedule/cancel<br>operations.|P0|Statuses and<br>cancellation/reschedule<br>windows, fees and refund<br>rules to be confirmed.|
|FR-016|Payments|The system shall initiate<br>payment for a paid<br>booking/enrolment/pack<br>age where payment is<br>enabled.|P0|Gateway, currency, taxes<br>and checkout flow to be<br>confirmed.|
|FR-017|Payments|The system shall verify<br>payment status using<br>trusted server-to-server<br>provider notifications,<br>not only browser<br>redirects.|P0|Webhook signature<br>validation, idempotency<br>and reconciliation<br>required.|
|FR-018|Payments|The system shall<br>maintain transaction<br>records and expose<br>appropriate<br>payment/invoice history<br>to authorized users.|P1|Refund, partial refund,<br>credit and subscription<br>rules to be confirmed.|
|FR-019|Live sessions|The system shall provide<br>authorized participants<br>with access to the<br>scheduled live session.|P0|Video provider, room<br>creation, join window,<br>host/moderator roles and<br>fallback behavior to be<br>confirmed.|
|FR-020|Live sessions|The system shall record<br>session lifecycle<br>information such as<br>scheduled, started,<br>completed or cancelled.|P1|Attendance evidence and<br>provider callbacks to be<br>defined.|
|FR-021|Evaluation|<br>The system shall allow an<br>interviewer to complete<br>and submit an evaluation<br>for an assigned booking.|P0|Rubric, mandatory fields,<br>scoring scale and<br>submission deadline to<br>be confirmed.|
|FR-022|Evaluation|The system shall control<br>which evaluation fields<br>are visible to candidates,<br>admins and Skillezo.|P0|Separate candidate-<br>visible feedback from<br>internal moderation<br>notes.|
|FR-023|Learning assessment|The system shall support<br>configured<br>assessments/codinglabs|P1|Assessment formats,<br>grading method, retakes<br>andpass criteria to be|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

|||and record candidate<br>results.||confirmed.|
|---|---|---|---|---|
|FR-024|Certificates|The system shall issue<br>and allow verification of<br>certificates when defined<br>completion criteria are<br>met.|P1|Eligibility, issuer, expiry<br>and verification<br>mechanism to be<br>confirmed.|
|FR-025|Administration|Authorized<br>administrators shall<br>manage users,<br>catalogue,<br>trainer/interviewer<br>approvals, bookings and<br>payment exceptions.|P0|Permission matrix and<br>approval/audit<br>requirements to be<br>confirmed.|
|FR-026|Corporate portal|The system shall support<br>corporate team roster<br>and learning-track<br>assignment if included in<br>the approved release.|TBD|Corporate account<br>model, tenant isolation,<br>billing and reporting<br>scope require<br>confirmation.|
|FR-027|Notifications|The system shall notify<br>relevant users about<br>booking, payment,<br>schedule and evaluation<br>events.|P1|Channels, templates,<br>delivery retries and<br>notification preferences<br>to be confirmed.|
|FR-028|Skillezo integration|Skillezo shall be able to<br>retrieve approved<br>interview packages,<br>interviewer availability<br>and create eligible<br>bookings through<br>secured APIs.|P0|Exact API contract,<br>scopes, identity and<br>consent checks require<br>joint agreement.|
|FR-029|Skillezo integration|CodzSkill Labs shall<br>publish agreed<br>booking/evaluation/learn<br>ing events to Skillezo<br>through authenticated<br>signed webhooks.|P0|Event schemas, retry<br>policy, idempotency and<br>consent conditions<br>require joint agreement.|
|FR-030|Audit|The system shall record<br>audit events for privileged<br>actions, consent<br>changes,<br>payment/refund<br>operations and<br>evaluation edits.|P0|Retention, access and<br>export requirements to<br>be confirmed.|



## **6. Non-Functional Requirements** 

|**ID**|**Category**|**Requirement**<br>f|
|---|---|---|
|NFR-001|Security|All application traffic and service-to-service<br>communication shall use HTTPS/TLS.|
|NFR-002|Security|The backend shall validate authorization for<br>every protected resource and operation;<br>frontend route guards alone are insufficient.|
|NFR-003|Security|Secrets, signing keys and provider<br>credentials shall be stored outside source<br>control in an approved secret-management<br>facility.|
|NFR-004|Privacy|Only minimum necessary candidate data<br>shall be exchanged with Skillezo, and<br>sharing shall respect recorded consent and<br>revocation.|
|NFR-005|Privacy|Recording of live sessions shall not be<br>enabled by default without clear notice, valid<br>consent and an approved retention policy.|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

|NFR-006|Reliability|Booking and seat-reservation workflows<br>shall remain consistent under concurrent<br>requests and shall not overbook a slot or<br>cohort.|
|---|---|---|
|NFR-007|Reliability|Payment and webhook processing shall be<br>idempotent and support retry/reconciliation<br>without duplicate bookings or charges.|
|NFR-008|Availability|The product owner shall define<br>uptime/service availability targets for the<br>MVP and production release.|
|NFR-009|Performance|The product owner/engineering team shall<br>define response-time and throughput targets<br>for catalogue, availability and booking<br>endpoints.|
|NFR-010|Scalability|The initial system should support modular<br>growth without requiring microservices at<br>the outset; the supplied blueprint<br>recommends a modular monolith.|
|NFR-011|Maintainability|Backend modules shall follow the agreed<br>Clean Architecture dependency direction<br>and documented API contracts.|
|NFR-012|Observability|The platform shall provide structured logs,<br>correlation IDs, health checks and<br>monitoring for critical workflows.|
|NFR-013|Compatibility|The React web application shall support the<br>agreed modern desktop and mobile<br>browsers; exact browser matrix to be<br>confirmed.|
|NFR-014|Accessibility|The UX shall follow an agreed accessibility<br>target and provide keyboard-accessible<br>forms and clear validation/error states.|
|NFR-015|Backup & recovery|Backup frequency, retention, recovery-point<br>and recovery-time objectives shall be<br>defined before production launch.|



## **7. Business Rules and Constraints** 

- CodzSkill Labs owns its learning, booking, payment, session and evaluation records; Skillezo owns career-profile and employability intelligence. 

- The two platforms shall not share a database or directly access each other's database. 

- Cross-platform communication shall use authenticated, versioned APIs and/or signed webhooks. 

- External identity mapping shall use an immutable provider subject identifier; email alone is not a reliable identity key. 

- Skillezo passwords shall not be copied into CodzSkill Labs. Use an approved OIDC/SSO approach. 

- A booking shall not be confirmed until required validations and any required payment verification succeed. 

- The server shall calculate/validate the payable price; a browser-supplied price shall not be trusted. 

- A temporary slot hold shall expire according to a defined policy if checkout is abandoned. 

- A cohort seat reservation shall enforce the configured capacity. 

- Candidate-visible feedback and internal interviewer/moderation notes shall be treated separately. 

- A course completion or interview result shall be shared with Skillezo only when the agreed consent and data-sharing rules allow it. 

## **8. External Systems and Integrations** 

|**Integration**|**Purpose**|**Initial understanding / decision needed**|
|---|---|---|
|Skillezo|SSO/identity linking; retrieve interview<br>catalogue/availability; create bookings;<br>receive booking, evaluation and learning-<br>evidence events.|OIDC provider, client/resource-server roles,<br>immutable subject mapping, consent<br>model, API/webhook schemas and retry<br>contract to be agreed.|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

|Payment provider|Checkout, payment confirmation, refunds<br>and reconciliation.|Provider, currencies, tax rules, settlement,<br>webhook verification and refund policy not<br>yet confirmed.|
|---|---|---|
|Video/live-session provider|Create rooms and allow authorized<br>participants to join training/interviews.|Provider, recording policy, room lifecycle,<br>attendance callbacks and data retention not<br>yet confirmed.|
|Email/SMS/push provider|Send account, booking, payment and<br>schedule notifications.|Channels, vendor, templates, delivery rules<br>and opt-outs not yet confirmed.|
|Cloud/storage/hosting|Host app/API/database and store private<br>documents or session artifacts.|Hosting region, storage provider, backup,<br>retention and deployment pipeline to be<br>confirmed.|



### **8.1 Proposed Skillezo API/event examples from the architecture brief** 

- Skillezo → CodzSkill Labs: GET /api/v1/interview-packages 

- Skillezo → CodzSkill Labs: GET /api/v1/interviewers/{id}/availability 

- Skillezo → CodzSkill Labs: POST /api/v1/mock-interviews/bookings 

- CodzSkill Labs → Skillezo: MockInterviewBooked, InterviewEvaluationPublished, LearningEvidenceUpdated 

These are illustrative contracts from the architecture blueprint, not final approved API specifications. 

## **9. Prototype Analysis – Screen and Capability Inventory** 

The supplied ZIP is a React/TypeScript frontend prototype. Its application shell and page components expose the following screen areas. The source also contains mock data and mock repository/service implementations; therefore, the UI is evidence of proposed journeys and terminology, not proof of a working production backend. 

|**Prototype screen/module**|**Visible purpose**|**Requirement-analysis interpretation**|
|---|---|---|
|Public Landing Page|Public product entry, discovery and<br>navigation.|Public marketing/discovery experience;<br>content and calls-to-action to be finalized.|
|Candidate Auth / Dashboard|Candidate sign-in and learner overview.|Candidate identity, dashboard summary and<br>personal learning/interview activity.|
|Trainer Auth / Dashboard|Trainer entry and delivery workspace.|Trainer access, assigned<br>courses/cohorts/bookings and status<br>visibility.|
|Course Marketplace|Browse course cards/details and enrol.|Catalogue, search/discovery and enrolment.|
|Cohort / Batch|View cohorts, schedules, capacity and<br>reserve seat.|Cohort lifecycle, seat capacity and<br>enrolment rules.|
|One-to-One Booking|Browse trainer/interviewer, choose slot and<br>book.|Marketplace, availability and booking<br>workflow.|
|Live Classroom|Live learning room and classroom<br>interaction.|Live session access; chat/attendance<br>behavior needs provider and policy<br>decisions.|
|Admin Dashboard|Platform operations and user controls.|Administrative oversight and privileged<br>management.|
|Corporate Portal|Team roster and assigned learning tracks.|Potential B2B/corporate capability; release<br>priority and tenancy model TBD.|
|Coding Project Labs|Practical lab work and completion state.|Assessment/lab execution and result<br>tracking; detailed grading model TBD.|
|Payments & Subscriptions|Plans, invoices and payment history.|Checkout, billing, transaction and<br>subscription management.|
|Certificates & Assessments|Assessment outcomes and certificate views.|Assessment lifecycle, eligibility and<br>certificate verification.|



### **9.1 Prototype limitations to account for** 

- The prototype uses seeded sample users and mock data, including role switching; this is not a production authentication or authorization implementation. 

Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

- Mock service methods mutate in-memory data and return simulated outcomes; persistent SQL Server behavior is not demonstrated. 

- Sample names, dates, prices, durations, scores and certificate values are illustrative and must not be treated as approved business data. 

- The prototype has separate page modules for learning, booking, corporate and billing capabilities; their MVP inclusion must be decided by the product owner. 

- The final backend APIs, database schema, security controls, payment/video integrations and error states remain to be specified. 

## **10. Initial MVP Recommendation for Validation** 

The R&D report recommends proving a complete end-to-end vertical slice: interviewer catalogue → availability → candidate slot selection → booking → payment (if in the first release) → session → evaluation. This is a sensible candidate MVP because it validates the platform's distinctive one-to-one interview service. It is not yet a signed-off MVP scope. 

|**Candidate MVP capability**|**Reason to consider**|**Decision status**|
|---|---|---|
|Authentication and role-based access for<br>candidate, interviewer and admin|Required to protect booking and operational<br>data.|Proposed P0; confirm exact roles/SSO.|
|Interview types/packages and interviewer<br>catalogue|Enables discovery and price transparency.|Proposed P0.|
|Interviewer availability and safe slot booking|Core transaction and key concurrency risk.|Proposed P0.<br>i|
|Payment integration|Needed if paid booking is required at launch.|Conditional P0; confirm gateway and<br>whether payment is launch-critical.<br>i|
|Live interview session access|Completes the service delivery journey.|Proposed P0; confirm video provider.|
|Evaluation submission and candidate<br>feedback|Delivers the outcome of a mock interview.|Proposed P0; confirm rubric and visibility.|
|Admin operations for interviewers, bookings<br>and payment exceptions|Needed to run and support the service.|Proposed P0.<br>i|
|Skillezo integration|Supports the Career Launchpad journey.|Could be P0 for integrated launch; confirm<br>dependency and sequencing.|
|Full course marketplace, cohorts, coding<br>labs, corporate portal and certificates|Broader platform value but increases MVP<br>breadth.|Recommend phased delivery unless<br>business sponsor says otherwise.|



### **10.1 MVP decision principle** 

Do not label a module as MVP solely because a screen exists in the prototype. MVP should be the smallest validated set of capabilities that delivers a complete business outcome for the selected target user and can be operated safely. 

## **11. Assumptions, Dependencies and Open Questions** 

|**ID**|**Question / assumption to validate**<br>i|**Why it matters / owner**|
|---|---|---|
|OD-001|Which user roles are included in the first<br>release: candidate, trainer, interviewer,<br>admin, corporate customer?|Determines access model, screens and MVP<br>scope. Product owner.|
|OD-002|Is the first commercial release primarily a<br>mock-interview marketplace, a course<br>marketplace, or both?|Determines MVP vertical slice and roadmap.<br>Business sponsor.|
|OD-003|Is authentication owned by CodzSkill Labs,<br>Skillezo or a shared identity provider? Which<br>OIDC provider and flow?|Determines SSO, token validation and<br>account lifecycle. Identity/engineering.|
|OD-004|What exact identity mapping and consent<br>model links a Skillezo candidate to a<br>CodzSkill Labs user?|Prevents duplicate/mislinked accounts and<br>unauthorized data sharing. Both platform<br>teams.|
|OD-005|Which payment gateway, currencies, taxes,<br>invoices, refunds, subscriptions and<br>settlement rules apply?|Required for checkout, ledger and finance<br>operations. Finance/product.|
|OD-006|Which videoprovider is selected? Are|Determines live-session design, privacyand|



Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

||recording, chat, screen share and<br>attendance required?|provider integration. Product/operations.|
|---|---|---|
|OD-007|How are availability slots generated, held,<br>expired, rescheduled and cancelled? What<br>timezone and buffer rules apply?|Prevents double booking and defines<br>booking state machine. Operations/product.|
|OD-008|What are the evaluation rubrics, scoring<br>scales, mandatory fields and feedback<br>visibility rules?|Defines evaluation data and candidate<br>report. Interview operations.|
|OD-009|What course/cohort capabilities are required<br>at launch: content delivery, attendance,<br>labs, assessments, certificates?|Determines learning module breadth.<br>Academic/product team.|
|OD-010|Is the corporate portal in MVP? Is<br>organization-level data isolation, SSO or<br>invoicing required?<br>i|Potential multi-tenant and B2B complexity.<br>Business sponsor.<br>f|
|OD-011|What notification channels and event<br>triggers are mandatory?|Affects user experience and background<br>processing. Product/operations.|
|OD-012|What are expected user volumes, peak<br>booking concurrency, uptime, latency,<br>hosting region and backup targets?|Required to size and operate production<br>system. Engineering/operations.|
|OD-013|What data retention/deletion policy applies<br>to profiles, evaluations, recordings, payment<br>records and audit logs?|Privacy, compliance and storage design.<br>Legal/product.|
|OD-014|Who approves interviewer/trainer profiles,<br>pricing, refunds, certificates and evaluation<br>disputes?|Defines permissions and operational<br>workflow. Operations.|
|OD-015|What accessibility, supported<br>browser/device and localization<br>requirements apply?|Defines UX and quality acceptance.<br>Product/design.|



## **12. Risks and Early Validation Scenarios** 

|**Risk / scenario**|**Expected control or validation**<br>i|
|---|---|
|Two candidates try to book the same interviewer slot at the same<br>time.|Only one booking can be confirmed; the other receives a clear<br>unavailable response.|
|Candidate abandons checkout after selecting a slot.|Temporary hold expires according to policy and slot becomes<br>available again.<br>i|
|Payment succeeds but browser redirect fails or is closed.|Server-side payment notification still reconciles the booking<br>correctly.<br>i|
|Payment webhook is delivered more than once.|Duplicate notifications do not create duplicate charges/bookings or<br>repeated side effects.|
|Skillezo webhook endpoint is temporarily unavailable.|Event is retried safely; delivery state is observable and replayable.|
|Interviewer attempts to access another interviewer's booking.|API denies access regardless of frontend navigation.|
|Candidate revokes consent before evaluation evidence is shared.|The system blocks further sharing according to the agreed consent<br>policy.|
|Evaluation is incomplete or outside allowed submission state.|System prevents publication and explains validation errors.|



## **13. Acceptance and Sign-off Approach** 

- Product owner confirms product vision, target users, business outcomes and release boundaries. 

- Each functional requirement is reviewed for clarity, testability, priority and ownership. 

- Open decisions are assigned an owner and due date; unresolved items remain explicitly marked TBD. 

- Prototype screen inventory is mapped to approved requirements; unused or deferred screens are identified. 

- Critical journeys are reviewed end-to-end, including failure, cancellation, retry and permission cases. 

- After approval, this baseline is converted into the detailed SRS with use cases, data requirements, interface requirements and measurable acceptance criteria. 

Draft v0.1  •  12 November 2026  •  For product/engineering review 

**CODZSKILL LABS  |  REQUIREMENT ANALYSIS** 

### **13.1 Approval record** 

|**Approver**|**Name**|**Decision / comments**|**Date**|
|---|---|---|---|
|Business / Product Owner||Pending||
|Engineering Lead||Pending||
|Operations Representative||Pending||
|Skillezo Representative<br>(integration scope)||Pending||



## **14. Source References** 

- CodzSkill_Labs_RnD_Report.docx – Initial R&D draft, dated 11 November 2026. 

- Codzskill_Labs_ASP_NET_Core_10_Architecture_and_Skillezo_Integration.docx – Architecture and integration blueprint, Version 1.0, dated 7 November 2026. 

- codzskill-labs-—-enterprise-edtech-&-engineering-marketplace (1).zip – React/TypeScript frontend prototype archive; reviewed page modules, app routing/state setup, DTO types and mock service implementation. 

#### **END OF INITIAL REQUIREMENT ANALYSIS DRAFT** 

Draft v0.1  •  12 November 2026  •  For product/engineering review 

