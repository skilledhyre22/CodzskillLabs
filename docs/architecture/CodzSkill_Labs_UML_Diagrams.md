CODZSKILL LABS  |  UML DIAGRAMS 

# **CODZSKILL LABS** 

## **UNIFIED MODELING LANGUAGE (UML) DIAGRAMS** 

|Project|CodzSkill Labs|
|---|---|
|Document|UML Diagrams<br>t|
|Version|1.0 – Draft for Technical Review|
|Prepared on|16 November 2026|
|Architecture baseline|Clean Architecture with Modular Monolith|



Purpose: This document provides illustrative UML views for the CodzSkill Labs platform based on the requirements shared so far. These diagrams support the LLD and must be reviewed against the approved SRS and final technical decisions. 

Important: Diagrams are logical design views, not final database ER diagrams. Exact database relationships and constraints will be documented separately in the Database Design Document. 

Confidential – Internal Project Documentation  |  1 

CODZSKILL LABS  |  UML DIAGRAMS 

### **1. UML Overview** 

UML (Unified Modeling Language) is used to represent the structure and behaviour of a software system. The following diagrams are included: 

- Use Case Diagram – shows actors and platform capabilities. 

- Component Diagram – shows major software components and their dependencies. 

- Class Diagram – shows selected domain classes and conceptual relationships. 

- Sequence Diagram – shows the interaction flow for interview booking and payment. 

### **2. Use Case Diagram** 

Actors: Candidate, Interviewer, Trainer, Admin, Super Admin and Corporate Coordinator. The diagram shows the main platform capabilities available to these actors. Actual access is enforced by backend authorization policies. 



<!-- Start of picture text -->
CodzSkill Labs Platform<br>[A> —<br>C) AOSA (Creaeee C )<br>eS<br><!-- End of picture text -->

Interpretation: Candidates can register, manage their profile, discover interviewers, book interviews, pay, join sessions and view evaluations. Interviewers participate in sessions and manage their professional profile. Trainers support learning capabilities. Administrative actors manage users and platform configuration. Corporate Coordinators access organisationlevel reporting and workflows, subject to approved scope. 

### **3. Component Diagram** 

The component diagram represents the Clean Architecture layers and external dependencies. The backend is a Modular Monolith: modules are logically separated but deployed as one application in the initial design. 

Confidential – Internal Project Documentation  |  2 

CODZSKILL LABS  |  UML DIAGRAMS 



<!-- Start of picture text -->
React Frontend API Layer Application Layer Domain Layer<br>HYTPS/ REBT, invoke uses<br>CandidateTrainer/ Interviewer/ ‘controllers, Middleware, Use cases, DTOs, BusinessEntities, ValueRules Objects,<br>/ Admin UI [>| Authentication |>| validators, Services | >|<br>~ “| query<br>External Providers Infrastructure SQL Server<br>Payment, Video, Email, adapters EF Core, Repositories, ata acces Codzskill Labs<br>Skillezo APIs + external Adapters | >| database<br>Logical component view - modules are deployed together in the Modular Monolith baseline.<br><!-- End of picture text -->

Interpretation: React communicates with the API over HTTPS/REST. API endpoints invoke application use cases. Application logic depends on domain rules and abstractions. Infrastructure implements persistence and external-provider adapters. SQL Server stores CodzSkill Labs data; external services are accessed through controlled adapters. 

### **4. Class Diagram** 

This is a simplified conceptual class diagram for the core marketplace and interview workflow. It is not a complete class catalogue or physical database schema. 

Confidential – Internal Project Documentation  |  3 

CODZSKILL LABS  |  UML DIAGRAMS 



<!-- Start of picture text -->
User Role InterviewPackage<br>maby-to-mbry<br>4+ Used: Guid <>] "YroetneName: string ++ Packagel:Price: decimalGuid<br>4 Email: sting<br>4Status Userstatus + lerublshed: boo!<br>CandidateProfile InterviewerProfile Booking Payment<br>inteviewer offers<br>+ baymentfo}<br>amount: decimat<br>4+ candidateProfield:tasUsed: Guid Guid 5++ Interviewer:ApprovastatusUsend: Guid Guid 5"F+ eookCand dates:status i ngd: GuidGuid [>| =++ Payment:status Guid<br>a a<br>InterviewSession Evaluation<br>0d<br>+ Bookinald:Id: GuidGuid 4 sessions:I GuidId: Guid<br>Status + ubiahesat<br>Simplified conceptual class diagram. Exact attributes, cardinalties and constraints belong inthe Database Design Document.<br><!-- End of picture text -->

Interpretation: A User may be associated with a CandidateProfile or InterviewerProfile. Users may be assigned roles. A Booking references the selected package and relevant participants. A payment is associated with the booking/order workflow. A session is associated with a booking, and an evaluation is associated with a completed session. Exact multiplicities and optionality must be confirmed during database design. 

### **5. Sequence Diagram – Interview Booking and Payment** 

The sequence shows the primary interaction between the candidate, React UI, backend booking service, SQL Server and payment gateway. 

Confidential – Internal Project Documentation  |  4 

CODZSKILL LABS  |  UML DIAGRAMS 



<!-- Start of picture text -->
111. Show confirmation<br>—— ayment gateway callbacks must be signature-verified and processed idempotently.<br><!-- End of picture text -->

Interpretation: The backend validates availability and creates a pending booking before initiating checkout. The payment gateway later sends a webhook. The backend verifies the webhook signature, checks idempotency, updates payment and booking state in a database transaction, and returns confirmation to the UI through the appropriate response or status refresh. 

### **6. Design Notes and Open Decisions** 

- Confirm whether a user can hold multiple roles simultaneously or whether roles are mutually exclusive. 

- Confirm whether the booking flow uses a temporary slot hold and the duration of that hold. 

- Confirm payment gateway and its webhook verification contract. 

- Confirm whether the video provider creates rooms at booking confirmation or closer to session time. 

- Confirm Corporate Coordinator permissions and organisation-level data boundaries. 

- Confirm exact Phase 5 LMS functionality from the complete requirements. 

- Final class attributes, multiplicities, keys and constraints must align with the Database Design Document. 

### **7. Relationship to Other Deliverables** 

This UML document complements the LLD. Activity diagrams will separately document workflow decisions and alternate paths. The Database Design Document will define tables, columns, primary/foreign keys, constraints, indexes and ER diagrams. 

**END OF DOCUMENT** 

Confidential – Internal Project Documentation  |  5 

