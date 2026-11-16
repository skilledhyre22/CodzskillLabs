CODZSKILL LABS – ACTIVITY DIAGRAMS 

Document Version: 1.0 

Status: Draft – Pending Requirement Validation 

# 1. USER REGISTRATION ACTIVITY DIAGRAM 

Actors: Candidate, Interviewer, Trainer 

Start → Open Registration Page → Enter Registration Details → Select Account Type → Validate Input Details → Check Duplicate Email → Valid Details? 

No → Show Error → Back to Registration 

Yes → Create User Account → Assign User Role → Create User Profile → Send Verification Email → Registration Successful → End 

Explanation: 

1. User opens the registration page. 

2. User enters name, email, password and other required details. 

3. User selects the permitted account type. 

4. System validates information and checks whether the email already exists. 

5. If validation fails, the system displays an error. 

6. If validation succeeds, the system creates the user account. 

7. System assigns the appropriate role. 

8. A role-specific profile is created. 

9. System sends a verification or welcome email. 

10. Registration is completed. 

2. USER LOGIN ACTIVITY DIAGRAM 

Actors: Candidate, Interviewer, Trainer, Admin, Super Admin 

Start → Open Login Page → Enter Email and Password → Validate Login Credentials → Credentials Valid? 

No → Show Error → Retry Login 

Yes → Check Account Status → Account Active? 

No → Show Status Message 

Yes → Generate Access Token → Identify User Role → Check Permissions → Redirect to Relevant Dashboard → End 

Explanation: 

1. User enters login credentials. 

2. System validates email and password. 

3. If credentials are incorrect, an error is displayed. 

4. If credentials are correct, account status is checked. 

5. System identifies the user's role. 

6. Access token and refresh token are generated according to the authentication design. 

7. User is redirected to the appropriate dashboard. 

8. Backend authorization ensures the user can access only permitted resources. 

3. INTERVIEW BOOKING ACTIVITY DIAGRAM 

Actor: Candidate 

Start → Login as Candidate → Open Interviewer Marketplace → Browse Interviewers → Select Interview Package → View Available Time Slots → Select Preferred Time Slot → Validate Slot Availability → Slot Available? 

No → Show Updated Availability → Select Another Slot 

Yes → Create Pending Booking → Reserve Time Slot → Proceed to Checkout → End 

Explanation: 

1. Candidate logs into the platform. 

2. Candidate opens the interviewer marketplace. 

3. Candidate browses available interviewers and packages. 

4. Candidate selects an interview package. 

5. System displays available time slots. 

6. Candidate selects a preferred slot. 

7. System validates slot availability. 

8. If unavailable, candidate selects another slot. 

9. If available, system creates a pending booking and reserves the slot. 

10. Candidate proceeds to checkout. 

4. PAYMENT PROCESSING ACTIVITY DIAGRAM 

Actor: Candidate 

External System: Payment Gateway 

Start → Open Checkout Page → Review Booking Details → Confirm Payment → Create Payment Order → Redirect to Payment Gateway → Complete Payment → Receive Payment Response → Verify Gateway Response → Payment Successful? 

No → Mark Payment Failed → Handle Booking According to Policy → End 

Yes → Update Payment Status to Paid → Confirm Booking → Generate Invoice → Send Confirmation → End 

Explanation: 

1. Candidate reviews booking details and payment amount. 

2. System creates a payment order with the payment gateway. 

3. Candidate completes payment. 

4. Payment gateway sends a response to the backend. 

5. Backend verifies the gateway response or webhook. 

6. If payment fails, transaction is marked as failed. 

7. If payment succeeds, payment status is updated. 

8. Booking is confirmed. 

9. Invoice or receipt is generated. 

10. Candidate receives payment confirmation. 

Important: Payment success should be verified on the backend. The frontend redirect alone must never be treated as proof of payment. 

# 5. LIVE INTERVIEW AND EVALUATION ACTIVITY DIAGRAM 

Actors: Candidate, Interviewer 

Start → Booking Reaches Scheduled Time → Send Session Reminder → Candidate and Interviewer Open Meeting Link → Validate Participant Access → Check Participant Attendance → Both Participants Present? 

No → Record Attendance and Handle No-Show Policy → End 

Yes → Start Live Interview → Conduct Interview → End Interview → Save Session Details → Interviewer Submits Evaluation → Save Feedback → Notify Candidate → End 

Explanation: 

1. System checks the scheduled interview time. 

2. Reminders and meeting details are sent to participants. 

3. Candidate and interviewer join the meeting. 

4. System validates participant access. 

5. Attendance is recorded. 

6. If participants are missing, the no-show policy is applied. 

7. If both participants are present, the live interview starts. 

8. After the interview, session details are saved. 

9. Interviewer submits evaluation and feedback. 

10. Candidate receives a notification. 

# 6. ADMIN USER MANAGEMENT ACTIVITY DIAGRAM 

Actors: Admin, Super Admin 

Start → Admin Login → Open Admin Dashboard → Navigate to User Management → Search and Select User → View User Details → Check Admin Permissions → Authorized Action? 

No → Access Denied → End 

Yes → Perform User Action → Update User Details → Validate Changes → Save Changes → Record Audit Log → Display Success → End 

Explanation: 

1. Admin logs into the platform. 

2. Admin opens the user management module. 

3. Admin searches and selects a user. 

4. System displays user information, role and profile details. 

5. System checks whether admin has permission to perform the requested action. 

6. If unauthorized, access is denied. 

7. If authorized, admin can update user information, account status or permitted role settings. 

8. System validates and saves changes. 

9. An audit log is generated. 

10. Updated information is displayed. 

# 7. IMPORTANT BUSINESS RULES 

Registration: Duplicate email addresses should not be allowed. 

Authentication: Only active users should be allowed to log in. 

Authorization: Backend APIs must enforce role-based permissions. 

Booking: One interviewer slot must not be booked by multiple candidates. 

Payment: Payment must be verified through the payment gateway. 

Interview: Attendance must be recorded. 

Evaluation: Only authorized interviewers should submit evaluations. 

Admin: Privileged changes must be recorded in audit logs. 

8. ITEMS REQUIRING CONFIRMATION 

1. Is email verification mandatory during registration? 

2. Can users select their own roles, or are some roles assigned by Admin? 

3. How long should an unpaid booking remain reserved? 

4. Which payment gateway will be integrated? 

5. Which video conferencing provider will be used? 

6. Can Admin edit or publish interviewer evaluations? 

Note: These are proposed workflows. Confirm them with the project manager before final approval. 

Next document: Database Design Document (DBD), including tables, columns, primary keys, foreign keys, relationships, constraints and ER diagram. 

