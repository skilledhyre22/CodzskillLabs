
// import React from 'react';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import RegisterPage from "./modules/auth/RegistrationPage";
import { LoginPage } from "./modules/auth/LoginPage";
import LearnerDashBoardPage from "./modules/candidate/LearnerDashBoardPage";
import CandidateProfile from "./modules/candidate/CandidateProfile";
import UpdateProfile from "./modules/candidate/UpdateProfile";
import SuperAdminDashboard from "./modules/admin/SuperAdminDashbaord";
import ViewUserDetails from "./pages/superadmin/ViewUserDetails";
import UpdateUser from "./pages/superadmin/UpdateUser";
import GetAllUsers from "./pages/superadmin/GetAllUsers";

// // import { AuthProvider } from './app/providers/AuthProvider';

// import { PublicLayout } from './shared/layouts/PublicLayout';

// import { LandingPage } from './pages/LandingPage';

// import { ExploreCoursesPage } from './modules/courses/ExploreCoursesPage';
// import { CohortDetailsPage } from './modules/courses/CohortDetailsPage';

// import { CorporateTrainingPage } from './modules/corporate/CorporateTraining';

// import { JoinPage } from './modules/auth/JoinPage';
// import { RegisterPage } from './modules/auth/RegistrationPage';
// import { LoginPage } from './modules/auth/LoginPage';

// import { LearnerDashboardPage } from './modules/candidate/LearnerDashBoardPage';
// import { TrainerDashboardPage } from './modules/trainer/TrainerDashBoardPage';

// import { LiveClassPage } from './modules/live-sessions/LiveClassPage';

export const App: React.FC = () => {
  return (
    // // <AuthProvider>
    //   <BrowserRouter>
          <>
           <BrowserRouter>
           <Routes>
            <Route path="/register" element={<RegisterPage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/candidate-profile" element={<CandidateProfile/>}></Route>
            <Route path="/update-candidate-profile" element={<UpdateProfile/>}></Route>
            <Route path="/learner-dashboardPage" element={<LearnerDashBoardPage/>}></Route>
            <Route path="/superadmin-dashboardPage" element={<SuperAdminDashboard/>}></Route>
            <Route path="/get-all-users" element={<GetAllUsers/>}></Route>
            <Route path="/user/:id" element={<ViewUserDetails/>}></Route>
            <Route path="/update-user/:id" element={<UpdateUser/>}></Route>
           </Routes>
          </BrowserRouter>
          </> 

    //     <Routes>
    //       {/* Dark-header public landing route */}
    //       <Route element={<PublicLayout navbarVariant="dark" />}>
    //         <Route path="/" element={<LandingPage />} />
    //         <Route path="/courses" element={<ExploreCoursesPage />} />
    //       </Route>

    //       {/* Light-header public routes matching screenshot */}
    //       <Route element={<PublicLayout navbarVariant="light" />}>
    //         <Route path="/cohorts/:slug" element={<CohortDetailsPage />} />
    //         <Route path="/corporate" element={<CorporateTrainingPage />} />
    //         <Route path="/join" element={<JoinPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         <Route path="/login" element={<LoginPage />} />
    //       </Route>

    //       {/* Dedicated Dashboard & Live Classroom experiences */}
    //       <Route path="/learner/dashboard" element={<LearnerDashboardPage />} />
    //       <Route path="/trainer/dashboard" element={<TrainerDashboardPage />} />
    //       <Route path="/live-class" element={<LiveClassPage />} />

    //       {/* Fallback */}
    //       <Route path="*" element={<Navigate to="/" replace />} />
    //     </Routes>
    //   </BrowserRouter>
    // // </AuthProvider>
 
  );
};

export default App;
