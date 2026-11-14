
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './app/providers/AuthProvider';

import { PublicLayout } from './shared/layouts/PublicLayout';

import { LandingPage } from './pages/LandingPage';

import { ExploreCoursesPage } from './modules/courses/ExploreCoursesPage';
import { CohortDetailsPage } from './modules/courses/CohortDetailsPage';

import { CorporateTrainingPage } from './modules/corporate/CorporateTraining';

import { JoinPage } from './modules/auth/JoinPage';
import { RegisterPage } from './modules/auth/RegistrationPage';
import { LoginPage } from './modules/auth/LoginPage';

import { LearnerDashboardPage } from './modules/candidate/LearnerDashBoardPage';
import { TrainerDashboardPage } from './modules/trainer/TrainerDashBoardPage';

import { LiveClassPage } from './modules/live-sessions/LiveClassPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Dark-header public landing route */}
          <Route element={<PublicLayout navbarVariant="dark" />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<ExploreCoursesPage />} />
          </Route>

          {/* Light-header public routes matching screenshot */}
          <Route element={<PublicLayout navbarVariant="light" />}>
            <Route path="/cohorts/:slug" element={<CohortDetailsPage />} />
            <Route path="/corporate" element={<CorporateTrainingPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/register/:role" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Dedicated Dashboard & Live Classroom experiences */}
          <Route path="/learner/dashboard" element={<LearnerDashboardPage />} />
          <Route path="/trainer/dashboard" element={<TrainerDashboardPage />} />
          <Route path="/live-class" element={<LiveClassPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
