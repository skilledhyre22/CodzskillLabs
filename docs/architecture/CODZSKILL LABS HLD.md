# **CODZSKILL LABS** 

# **HIGH-LEVEL DESIGN (HLD)** 

Document Version: 1.0 Date: 12 November 2026 Architecture: Clean Architecture + Modular Monolith Backend: ASP.NET Core 10 Web API Frontend: React.js + TypeScript Database: Microsoft SQL Server 

## **1. Project Overview** 

CodzSkill Labs is an EdTech and Interview Marketplace platform designed to provide candidates with learning, training and interview preparation services. 

The platform will allow users to: 

- Register and authenticate. 

- Explore courses and training programs. 

- Find trainers and interviewers. 

- Book one-to-one mock interviews. 

- Make online payments. 

- Attend live video interview sessions. 

- Receive interview evaluations and feedback. 

- Integrate with the Skillezo career platform. 

The system will provide a centralized platform for learning, interview preparation and career development. 

## **2. Project Objectives** 

The main objectives of the system are: 

1. Provide an online learning and training platform. 2. Allow candidates to book one-to-one interview sessions. 

3. Provide interviewer and trainer management. 4. Support secure online payments. 5. Enable live video interview sessions. 6. Generate interview evaluation reports. 7. Integrate with external platforms such as Skillezo. 8. Provide an administrative dashboard for managing platform activities. 

## **3. Technology Stack** 

#### **Technology** 

**Component** 

|Frontend|React.js|
|---|---|
|Programming Language|TypeScript|
|UI Framework|Tailwind CSS|
|Backend|ASP.NET Core 10 Web API|
|Architecture|Clean Architecture|
|ORM|Entity Framework Core|
|Database|Microsoft SQL Server|
|Authentication|OAuth 2.0 / OpenID Connect|
|Authorization|JWT + Role-Based Authorization|
|Caching|Redis|
|Background Jobs|Hangfire|
|Real-time Communication|SignalR|
|API Communication|REST API|
|External Integration|Webhooks|
|File Storage|Cloud Object Storage|
|Deployment|Cloud Hosting + CI/CD|



## **4. System Architecture** 

The system will follow Clean Architecture principles with a Modular Monolith approach. 

The application will be divided into four primary layers. 

### **4.1 Presentation Layer** 

Responsibilities: 

- React frontend. 

- ASP.NET Core API controllers. 

- HTTP request and response handling. 

- Authentication and authorization. 

- API communication. 

### **4.2 Application Layer** 

Responsibilities: 

- Business use cases. 

- Application services. 

- DTOs. 

- Validation. 

- Interfaces and abstractions. 

- Business workflow orchestration. 

### **4.3 Domain Layer** 

Responsibilities: 

- Core business entities. 

- Business rules. 

- Domain models. 

- Entity relationships. 

- Enumerations. 

### **4.4 Infrastructure Layer** 

Responsibilities: 

- Entity Framework Core. 

- SQL Server database connectivity. 

- Repository implementations. 

- Redis caching. 

- Payment gateway integration. 

- Video provider integration. 

- Email services. 

- Background job processing. 

### **4.5 Architecture Diagram** 

```
             React Frontend
                   |
                   |
            ASP.NET Core API
                   |
            Presentation Layer
                   |
            Application Layer
                   |
               Domain Layer
                   |
           Infrastructure Layer
                   |
       ---------------------------
       |       |       |         |
    SQL DB   Redis  Hangfire  External APIs
                               |
                       Payment Gateway
                       Video Provider
                       Email Provider
                       Skillezo API
```

## **5. Major System Modules** 

The application will contain the following modules: 

### **5.1 Authentication Module** 

- User registration. 

- User login. 

- Google authentication. 

- OAuth 2.0 / OpenID Connect integration. 

- JWT token validation. 

- Role-based authorization. 

- User profile management. 

### **5.2 Course and Training Module** 

- Course management. 

- Course categories. 

- Training packages. 

- Cohort and batch management. 

- Trainer assignment. 

- Student enrollment. 

### **5.3 Interview Marketplace Module** 

- Interviewer profiles. 

- Interviewer availability. 

- Interview packages. 

- Package pricing. 

- Interviewer selection. 

- Interview booking. 

### **5.4 Booking and Scheduling Module** 

- One-to-one interview booking. 

- Available time slots. 

- Booking confirmation. 

- Booking cancellation. 

- Rescheduling. 

- Prevention of double bookings. 

### **5.5 Payment Module** 

- Payment gateway integration. 

- Online payment processing. 

- Payment verification. 

- Transaction history. 

- Refund management. 

- Subscription management. 

### **5.6 Live Session Module** 

- One-to-one video calls. 

- Live interview sessions. 

- Video session creation. 

- Session scheduling. 

- Session status tracking. 

- Session completion. 

### **5.7 Evaluation Module** 

- Interview feedback. 

- Candidate performance evaluation. 

- Technical skill assessment. 

- Interviewer remarks. 

- Evaluation reports. 

- Candidate feedback notifications. 

### **5.8 Admin Module** 

- User management. 

- Course management. 

- Trainer management. 

- Interviewer management. 

- Booking management. 

- Payment monitoring. 

- Reports and analytics. 

### **5.9 Skillezo Integration Module** 

- Fetch interview packages. 

- Share booking information. 

- Send interview completion status. 

- Send evaluation reports. 

- Receive external webhook events. 

- Synchronize relevant platform information. 

## **6. Database Architecture** 

The system will maintain separate databases for CodzSkill Labs and Skillezo. 

### **6.1 CodzSkill Database** 

The following entities are expected: 

|**Entity**|**Purpose**|
|---|---|
|Users|Stores user information|
|Roles|Stores user roles|
|Candidates|Stores candidate profiles|
|Trainers|Stores trainer information|
|Interviewers|Stores interviewer profiles|
|Courses|Stores course information|
|Categories|Stores course categories|
|Cohorts|Stores training batches|
|Enrollments|Stores student enrollment|
|InterviewPackages|Stores interview packages|
|AvailabilitySlots|Stores interviewer availability|



Bookings Stores interview bookings Sessions Stores video session details Payments Stores payment information Transactions Stores transaction records Evaluations Stores interview evaluations Notifications Stores notification records 

### **6.2 Skillezo Database** 

Skillezo will maintain its own career-related information, including: 

- Career Profiles. 

- Resumes. 

- Skills. 

- Skill Gaps. 

- Employability Index. 

- Job Matching. 

- Recruiter Information. 

Important: Both platforms will communicate through APIs and webhooks instead of directly accessing each other's databases. 

The exact table columns and relationships will be defined in the Low-Level Design (LLD). 

## **7. External Integrations** 

The platform will integrate with external services. 

### **7.1 OAuth 2.0 / OpenID Connect** 

Used for secure authentication and Google login. 

### **7.2 Payment Gateway** 

Used for: 

- Online payments. 

- Payment verification. 

- Refund processing. 

- Transaction management. 

### **7.3 Video Provider** 

Used for: 

- One-to-one video interviews. 

- Live training sessions. 

- Video meeting creation. 

- Session management. 

### **7.4 Email and Notification Provider** 

Used for: 

- Booking confirmations. 

- Payment notifications. 

- Interview reminders. 

- Evaluation notifications. 

### **7.5 Skillezo API Integration** 

Used for exchanging information between CodzSkill Labs and Skillezo. 

### **7.6 Webhook Integration** 

Webhooks will allow systems to communicate automatically when specific events occur. 

Example events: 

- BookingCreated. 

- PaymentCompleted. 

- InterviewCompleted. 

- EvaluationSubmitted. 

Webhook requests will be authenticated and validated before processing. 

## **8. Main System Workflow** 

### **One-to-One Interview Workflow** 

1. Candidate logs into the platform. 

2. Candidate explores available interview packages. 

3. Candidate selects an interviewer. 

4. Candidate checks available time slots. 

5. Candidate books an interview. 

6. Payment is processed through the payment gateway. 

7. Backend verifies the payment. 

8. Booking gets confirmed. 

9. Video session is created. 

10. Candidate and interviewer join the session. 

11. Interviewer conducts the interview. 

12. Interviewer submits evaluation and feedback. 

13. Candidate receives the evaluation report. 

14. Relevant information is shared with Skillezo through APIs or webhooks. 

## **9. Security Architecture** 

The application will implement the following security measures: 

- OAuth 2.0 / OpenID Connect authentication. 

- JWT-based API authorization. 

- Role-Based Access Control. 

- HTTPS communication. 

- Input validation. 

- Secure password handling through the identity provider or authentication system. 

- Payment verification on the backend. 

- Webhook signature verification. 

- Secure API communication. 

- Protection against duplicate booking and payment requests. 

- Secure storage of sensitive information. 

## **10. Performance and Scalability** 

The system will use the following approaches: 

- Redis caching for frequently accessed data. 

- Database indexing for optimized queries. 

- Pagination for large datasets. 

- Asynchronous API operations. 

- Hangfire for background processing. 

- SignalR for real-time notifications. 

- Optimized database queries. 

- Modular architecture for future scalability. 

## **11. Deployment Architecture** 

The application will be deployed using cloud infrastructure. 

The deployment components will include: 

|**Component**|**Purpose**|
|---|---|
|Frontend Hosting|Hosts React application|
|Backend Hosting|Hosts ASP.NET Core Web API|
|SQL Server|Stores application data|
|Redis|Distributed caching|
|Background Worker|Processes background jobs|
|Cloud Storage|Stores uploaded files|
|CI/CD Pipeline|Automates build and deployment|
|Monitoring|Tracks application health and errors|



Separate environments will be maintained: 

- Development. 

- Staging. 

- Production. 

## **12. Implementation Phases** 

**Phase Description** 

Phase 1 Authentication and User Management Phase 2 Interviewer Profiles and Availability Phase 3 Interview Packages and Booking Phase 4 Payment Gateway Integration Phase 5 One-to-One Video Sessions Phase 6 Evaluation and Feedback Phase 7 Skillezo API and Webhook Integration Phase 8 Courses and Training Management Phase 9 Testing and Deployment 

## **13. Architectural Decisions** 

The project will initially use Clean Architecture with Modular Monolith. 

Reasons: 

- Clear separation of responsibilities. 

- Easier development and maintenance. 

- Independent business modules. 

- Centralized deployment. 

- Easier debugging and testing. 

- Future possibility of migrating selected modules to Microservices. 

Microservices will not be introduced in the initial implementation. 

## **14. Conclusion** 

CodzSkill Labs will be developed as a scalable EdTech and Interview Marketplace platform using React.js, ASP.NET Core 10 Web API and Microsoft SQL Server. 

The architecture will follow Clean Architecture principles with a Modular Monolith approach. 

The initial implementation will focus on authentication, interviewer management, booking, payment processing, live video sessions and evaluation. 

Future phases will expand the platform with courses, training management and deeper Skillezo integration. 

