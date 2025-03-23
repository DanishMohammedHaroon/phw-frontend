# Project Title

PHomeWerk (P for Physio, Home because it will be done at home or in a personal environment and Werk... because work is more fun and do-able when it does not sound like work!)... I will refer it to as PHW.

## Overview

Life is a loop—a routine that constantly takes feedback and adjusts, allowing us to maintain a balanced way of living. PHomeWerk (PHW) harnesses this concept to revolutionize physiotherapy by bridging the gap between in-person and remote care.

User Side (Physiotherapists):
PHW is all about providing physiotherapists with better feedback and enhanced patient care. With our platform, they can effortlessly assign exercises to clients, set specific repetitions and difficulty levels, and monitor progress in real time. This seamless integration means that even after an in-person visit, adjustments to a workout or treatment regime can be made remotely, ensuring that every patient receives tailored care.

Client Side (Patients):
For patients, PHW offers accountability, tracking, and remote access to exercises, ensuring they never feel disconnected from their treatment. The app allows patients to immediately notify their physiotherapists if an exercise isn’t working for them, creating an immediate feedback loop that optimizes recovery. Whether it's tracking progress or receiving timely reminders, PHW keeps patients engaged and supports a continuous cycle of improvement. It is also a method of holding the patients accountable to do the exercises and improve self discipline which is always necessary when it comes improving the quality of life.

### Problem Space

When covid hit we all lost access to life's necessities, access to healthcare was one of them, in our community of St. John's, NL we have the bulk of our population either in the working age (15 - 65) with heavier emphasis on the later years, and we have a higher than average elderly population (_see_ the _statistics link_). For them (15- 65 age demographic) to be working optimally access to physical health and wellbeing is necessary and, especially in health care, access to physiotherapy is a must. A lot of businesses went from brick and mortar to e-commerce and Doctors's went from seeing in-patients to booking calls over the phone and video calling. In all of this some fields were missed out and general workers, from fishermen to health care workers to athletes to physical labourers... all lost access to what supports them when their jobs have wear and tear on their bodies. This app is to start a process of healing that deficiency, its geared towards a simple interface, which is easy to use and allows remote interaction between the Phyhsiotherapist and the patient build that feedback loop into the circle of care.

_statistics link_:https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/details/page.cfm?Lang=E&SearchText=st%2E%20john%27s&GENDERlist=1,2,3&STATISTIClist=1&DGUIDlist=2021A00051001519&HEADERlist=0

### User Profile

Physiotherapists (User Side):

Licensed professionals who traditionally provide in-person physiotherapy and are now or more likey will be adapting to remote care with the implementation of PHW.
How will they utilize PHW: They use the app to assign personalized exercise routines, adjust treatment plans in real time based on patient feedback, and monitor patient progress remotely.
Special Considerations: The platform must integrate seamlessly into their workflow, offering easy-to-use tools that enhance, rather than complicate, their treatment processes.

Patients (Client Side):

Who They Are: Individuals ranging from working-age adults to seniors who rely on physiotherapy to manage pain, recover from injuries, or maintain overall physical health.
How They Use PHW: They use the app to access prescribed exercises, track their progress, receive timely reminders, and quickly communicate any issues with their exercises to their physiotherapist.
Special Considerations: The interface must be user-friendly and accessible, enabling seamless communication for the not so tech savvy. 

### Features
This might sound more like an advert. but here it is....

**Physiotherapists (User Side):**

1. Exercise Assignment:
Empower your practice with the ability to effortlessly assign personalized exercise routines. Tailor every session by setting the perfect number of repetitions and difficulty levels to match each client’s unique needs.
User Story: “As a physiotherapist, I want to assign custom exercises so that my patients receive the exact care they deserve.”

2. Progress Tracking & Feedback:
Stay in tune with your clients’ progress! Our app lets you see not only whether a routine was completed, but also gathers valuable insights on any parts that felt challenging. This means you can fine-tune every detail of your treatment plan.
User Story: “As a physiotherapist, I want to receive clear feedback on exercise completion so I can adjust and perfect my treatment plans.”

3. Remote Communication for Updates:
Communicate seamlessly without interrupting your patients' daily lives. With an easy-to-use system, send updates and improvements directly, ensuring your advice reaches them promptly and effectively.
User Story: “As a physiotherapist, I want to update my patients remotely so that I can help them improve their routines effortlessly.”

**Patients (Client Side):**

1. Accountability:
Stay on track and feel supported every step of the way. The app is designed to keep you engaged and committed to your exercise routine, ensuring you never miss a beat in your journey to better health.
User Story: “As a patient, I want consistent reminders and check-ins so that I remain dedicated to my recovery.”

2. Tracking Progress:
Celebrate your wins! Easily log your exercise routines and watch your progress unfold through clear, visual metrics that keep you motivated and inspired.
User Story: “As a patient, I want to track my progress so that I can see the improvements and feel proud of my hard work.”

3. Immediate Feedback:
Provide instant updates on how you’re feeling about your exercises. This quick and direct feedback ensures that no detail is missed, allowing your physiotherapist to make timely adjustments to your routine.
User Story: “As a patient, I want to give immediate feedback so that any issues are addressed right away, keeping my recovery on track.”

**All Users:**

1. Secure Communication:
Enjoy peace of mind with with a better way of communicating discreet problems than voicing them out verbally.

2. Anytime, Anywhere Exercising and Reporting:
Whether you’re at home, at work, or on the go, our app is there for you. It lets you exercise and report progress from any location, making your health journey as flexible as your lifestyle.

3. Extremely User-Friendly Interface:
Experience simplicity and elegance in design. Our platform is built to be accessible and intuitive for everyone, regardless of their comfort level with technology, ensuring a smooth and enjoyable user experience for all.


## Implementation

### Tech Stack

**Libraries I intend to use:**

1. React.js: 
Used to build a responsive, dynamic, and intuitive front-end interface.

2. Node.js with Express: 
Powers the backend APIs to handle requests and manage server-side logic seamlessly.

3. Sass:
Used for advanced CSS and SCSS styling, allowing you to write modular, reusable, and maintainable styles.

4. Axios:
Simplifies API calls by handling HTTP requests and responses between the front-end and back-end effortlessly.

5. CORS:
Ensures secure cross-origin resource sharing, allowing the selected API to communicate safely with the front-end.

6. React Router DOM:
Enables seamless navigation and dynamic routing in the React application for a smooth user experience.

6. dotenv:
Manages environment variables securely, keeping sensitive data like API keys and configuration settings out of the codebase.

7. React Query:
Handles asynchronous data fetching and caching, making server state management more efficient and responsive.

8. React Modal:
Provides accessible modal dialogs for pop-up interactions, enhancing the user interface without compromising on usability.

**Libraries that I might use but I am still researching:**
**update: used REACT ContextHook (no.3)**

1. React Toastify:
For non-intrusive notifications and alerts that inform users about updates, successes, or errors in real time.

2. Formik and Yup:
For robust form handling and validation, ensuring data integrity and improving user input experiences.

3. Redux or Zustand or use __contextHook(in react itself)__
For managing global state, particularly useful if the application scales and state management becomes more complex.

4. Jest:
For unit testing, helping you ensure that the components and functions perform as expected.

5. Tailwind CSS:
A utility-first CSS framework that allows you to rapidly build custom designs directly in the markup. It can be easily integrated with React and Sass for more control over styling.

6. Material UI:
A popular React UI framework that implements Google's Material Design principles to streamline the development process and ensure a consistent, modern look across the app without having to write all the CSS from scratch.

### APIs
**update: used Free Exercise DB on GitHub (no.3) and populated database with generated users fron ChatGPT (no.4)**

I intend on making my own server to host most of the data and validation. I havent found any physiotherapy API's but there are some interesting options that I might use and repurpose: 

1. API Ninjas Exercises API:
This API provides access to thousands of exercises, including details like muscle groups, equipment, and difficulty levels. It’s free up to a certain number of requests, this can be a good kickoff, but the limit is the drawback.

2. ExerciseDB API on RapidAPI:
With a collection of over 1,300 exercises, this API categorizes exercises by body part, equipment, and type. It’s available with a free tier, which gives me more information but is still limited by tier costs.

3. __Free Exercise DB on GitHub:__
Although not a traditional API, this open-source JSON dataset contains data on 800+ exercises. this is really interesting as it can serve as my dataset. 

4. __Auto-generate exercises on CHAT-GPT and other AI resources, leverage them to create data for my Database__. This I would use if I do not have enough data needed for my specific purpose. When implemented in real life this database can be populated
by actual data from Physiotherapists using the app during beta-testing phase (and even after if it makes it tot  the market).

### Sitemap

***Sitemap Outline***

**Home Page**

Overview & Introduction:
A landing page 

Login:
For existing users (physiotherapists and patients) to securely access their dashboards.

Sign Up / Registration:
New users can register by choosing their role (physiotherapist or patient).
Dashboard

Physiotherapist Dashboard:
Profile & Settings: Manage personal details and account settings.
Exercise Catalog: Browse available exercises with filtering options.
Assignment Management: Create, update, and view exercise assignments for patients.
Patient Progress: Monitor progress logs submitted by patients.
Secure Messaging: Communicate with patients through a secure channel.


Patient Dashboard:
Profile & Settings: Manage personal details and health information.
My Exercises: View and track assigned exercise routines with detailed instructions.
Feedback Submission: Provide immediate feedback on completed routines.
Progress Tracking: Log and view progress over time through charts and logs.
Secure Messaging: Send and receive messages from their physiotherapist.
Additional Pages

Exercise Detail Page:
A detailed view for each exercise, including images, instructions, difficulty level, and targeted muscle groups.
Feedback History:
A page to review past feedback and track changes to exercise routines over time.
Admin/Support (Optional):
For managing users, system settings, and support resources if needed.

### Mockups

Here is just a rough mockup of what im expecting it to look like, now mind, these were made before the sitemap was layed out and planned so thye might not have all the features mentioned on the sitemap.

_See_ attached picutres in images folder
![Logo Design: logo selection](<Images/Logo Design.png>)
![Login page selection](<Images/Login Page.gif>)
![Cute 404 not found page](<Images/404 Not Found Page.png>)
![Physiotherapists' Page](<Images/Physiotherapist Page.png>)
![Patients' Page](<Images/Patient page.gif>)
![Patient feedback page](<Images/Couldn't Complete.png>)


### Data

The core of PHW’s data revolves around users, exercises, assignments, and the feedback and progress that ties everything together. Here’s a breakdown of the main entities and how they interconnect:

Users:

Physiotherapists: These users create and manage exercise assignments. They have personal details (name, credentials, contact info) and are linked to the patients they treat.
Patients: These users receive exercise assignments and provide feedback. Their profiles store personal information, health metrics, and a log of progress over time.
Exercises:
This is the exercise catalog that includes data such as the exercise name, type, targeted muscle group(s), difficulty level, instructions, and multimedia (images, GIFs, videos). This data can be sourced from external APIs (like the Exercises API or ExerciseDB) or an internal database.

Exercise Assignments:
An assignment is a record that links a physiotherapist, a patient, and a specific exercise. It includes parameters like:

Repetitions, sets, and difficulty levels
Assigned date and time
Special instructions or modifications
Feedback:
After completing an assignment, patients can provide immediate feedback. This might include:

Whether they completed the exercise
How challenging a particular exercise was
Any issues or modifications needed
This feedback helps physiotherapists adjust future assignments.
Progress Logs:
As patients continue with their routines, their performance and progress data (e.g., completion rates, improvements in difficulty handling, overall adherence) are logged over time. This historical data allows physiotherapists to monitor trends and adjust treatment plans accordingly.

Secure Communication:
Messaging or notification data might also be stored to ensure timely communication between physiotherapists and patients. This ensures that updates or modifications can be seamlessly integrated into the workflow.

### Endpoints

**User Authentication & Profile**

1. POST /api/auth/register
Registers a new user (physiotherapist or patient).
Parameters (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "physiotherapist"  // or "patient"
}


Example Response:
{
  "status": "success",
  "message": "User registered successfully.",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "physiotherapist"
  }
}

2. POST /api/auth/login
Authenticates a user and returns a JWT token.
Parameters (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}

Example Response:
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

3. GET /api/users/:id
Retrieves profile details for a user.
Example Response:
{
  "id": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "physiotherapist"
}

**Exercise Assignments**

1. POST /api/assignments
Creates a new exercise assignment by a physiotherapist for a patient.
Parameters (JSON):
{
  "physiotherapistId": "user123",
  "patientId": "user456",
  "exerciseId": "ex123",
  "repetitions": 15,
  "sets": 3,
  "difficulty": "beginner",
  "assignedDate": "2025-03-15T10:00:00Z",
  "instructions": "Perform slowly and report any discomfort."
}

Example Response:
{
  "status": "success",
  "assignment": {
    "id": "assign789",
    "physiotherapistId": "user123",
    "patientId": "user456",
    "exerciseId": "ex123",
    "repetitions": 15,
    "sets": 3,
    "difficulty": "beginner",
    "assignedDate": "2025-03-15T10:00:00Z",
    "instructions": "Perform slowly and report any discomfort."
  }
}

2. GET /api/assignments
Lists all assignments. Can be filtered by user ID (physiotherapist or patient).
Query Parameters (optional):

physiotherapistId
patientId
Example Request:
/api/assignments?patientId=user456
Example Response:
[
  {
    "id": "assign789",
    "physiotherapistId": "user123",
    "patientId": "user456",
    "exerciseId": "ex123",
    "repetitions": 15,
    "sets": 3,
    "difficulty": "beginner",
    "assignedDate": "2025-03-15T10:00:00Z",
    "instructions": "Perform slowly and report any discomfort."
  }
]

3. PUT /api/assignments/:id
Updates an existing assignment (e.g., to adjust exercise parameters based on feedback).
Parameters (JSON):
{
  "repetitions": 20,
  "sets": 3,
  "instructions": "Increase pace slightly; monitor form."
}

Example Response:
{
  "status": "success",
  "assignment": {
    "id": "assign789",
    "physiotherapistId": "user123",
    "patientId": "user456",
    "exerciseId": "ex123",
    "repetitions": 20,
    "sets": 3,
    "difficulty": "beginner",
    "assignedDate": "2025-03-15T10:00:00Z",
    "instructions": "Increase pace slightly; monitor form."
  }
}
4. DELETE /api/assignments/:id
Deletes an assignment.
Example Response:
{
  "status": "success",
  "message": "Assignment deleted successfully."
}

**Feedback Submission**
1. POST /api/feedback
Allows patients to submit feedback on an assignment.
Parameters (JSON):
{
  "assignmentId": "assign789",
  "patientId": "user456",
  "status": "completed",  // could also be "incomplete" or "modified"
  "comments": "Felt too challenging at the end of the set."
}

Example Response:
{
  "status": "success",
  "feedback": {
    "id": "feedback101",
    "assignmentId": "assign789",
    "patientId": "user456",
    "status": "completed",
    "comments": "Felt too challenging at the end of the set.",
    "timestamp": "2025-03-16T08:30:00Z"
  }
}

**Progress Tracking**
1. GET /api/progress
Retrieves progress logs for a patient, optionally filtered by date.
Query Parameters (optional):

patientId
startDate
endDate
Example Request:
/api/progress?patientId=user456&startDate=2025-03-01&endDate=2025-03-31

Example Response:
[
  {
    "id": "progress201",
    "patientId": "user456",
    "logDate": "2025-03-16",
    "performanceData": "Completed 3 sets with increased endurance."
  }
]

2. POST /api/progress
Allows patients to submit a new progress log.
Parameters (JSON):
{
  "patientId": "user456",
  "logDate": "2025-03-16",
  "performanceData": "Completed 3 sets; noted improvement in endurance."
}

Example Response:
{
  "status": "success",
  "progress": {
    "id": "progress201",
    "patientId": "user456",
    "logDate": "2025-03-16",
    "performanceData": "Completed 3 sets; noted improvement in endurance."
  }
}

**Secure Communication (Messaging)**
1. GET /api/messages
Retrieves a list of secure messages between a physiotherapist and a patient.
Query Parameters (optional):

userId (either physiotherapist or patient)
Example Response:
[
  {
    "id": "msg301",
    "from": "user123",
    "to": "user456",
    "message": "Remember to focus on your form during the curls.",
    "timestamp": "2025-03-15T11:00:00Z"
  }
]

2. POST /api/messages
Sends a secure message between users.
Parameters (JSON):
{
  "from": "user123",
  "to": "user456",
  "message": "Great job on your session today! Keep up the progress."
}

Example Response:
{
  "status": "success",
  "message": {
    "id": "msg302",
    "from": "user123",
    "to": "user456",
    "message": "Great job on your session today! Keep up the progress.",
    "timestamp": "2025-03-16T09:15:00Z"
  }
}

## Roadmap

**Sprint Timeline (March 11 – March 23)**

_Day 1 – March 11: Base Installation of Features_
Backend Setup:
Initialize backend project (e.g., Node.js with Express)
Install core dependencies (dotenv, cors, JWT libraries, etc.)
Frontend Setup:
Create a React application
Install essential libraries (Sass, Axios, React Router, React Query, React Modal)
Version Control:
Set up repository and commit initial base structure

_Day 2 – March 12: Mock Page for Front Ends_
Wireframes & Layout:
Develop a basic mock page for key screens (landing page, login, and dashboard placeholders)
Static Implementation:
Build simple static versions of these pages to establish overall UI flow

_Day 3 – March 13: User Authentication & Profile Endpoints_
Backend:
Implement user registration and login endpoints using JWT
Frontend:
Build authentication forms and connect them to the API

_Day 4 – March 14: Exercise Catalog Endpoints_
Backend:
Develop endpoints for fetching exercise data (GET /api/exercises, GET /api/exercises/:id)
Integrate with an external exercise data API or load sample data
Documentation:
Document parameters and expected responses

_Day 5 – March 15: Exercise Catalog UI Development_
Frontend:
Create a responsive page for browsing the exercise catalog with filtering options

_Day 6 – March 16: Assignment Management Features_
Backend:
Build endpoints for creating, updating, and retrieving exercise assignments (POST, GET, PUT /api/assignments)
Frontend:
Develop forms for physiotherapists to assign exercises and display assignment lists on the dashboard

_Day 7 – March 17: Feedback Submission Module_
Backend:
Implement endpoints for patients to submit feedback (POST /api/feedback)
Frontend:
Create UI components that allow feedback submission on assignments

_Day 8 – March 18: Progress Tracking Features_
Backend:
Develop endpoints for logging and retrieving progress data (GET and POST /api/progress)
Frontend:
Build components or widgets to display patient progress (charts, logs, etc.)

_Day 9 – March 19: Secure Messaging & Communication_
Backend:
Create endpoints for secure messaging between physiotherapists and patients (GET and POST /api/messages)
Frontend:
Develop a messaging interface for real-time communication

_Day 10 – March 20: Integration & Testing_
Integration:
Connect frontend and backend components
Testing:
Perform end-to-end testing of user flows and API endpoints
Documentation:
Update API documentation with any changes

_Day 11 – March 21: Debugging & UI/UX Refinements_
Bug Fixes:
Address issues discovered during integration testing
UI Polish:
Refine the interface and ensure a consistent, responsive user experience

_Day 12 – March 22: Final Documentation & Demo Preparation_
Documentation:
Complete user guides, technical documentation, and API reference materials
Demo Preparation:
Prepare the presentation/demo and finalize loose ends

_Day 13 – March 23: Capstone Submission_
Final Review:
Conduct a final quality check of the entire application
Submission:
Package and submit the capstone project


## Future Implementations 

My nice-to-haves list includes:

1. Video implementation: showing exactly how the exercises are done;
2. AI exercise generation: the AI will generate videos of exersises based on the minimal descriptions given from the physio therapist, this video if approved will be named as saved to the database for reuse.
3. Image identification of which part of the body hurts: basically a an anatomy image map that lets the patient click the exact area where they felt pain during the exercise, giving the physiotherapist a better idea of how to modify the exercises.
4. Assigning patient requisitons for test to be done via the app, that the patient can download and get the work done.
5. Better data encryption to keep confidential data safe.
6. Drag and drop option for the physiotherapist to manipulate videos and exercise images to create an intercative workout with visuals.
