import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicHomePage } from './pages/PublicHomePage';
import { PublicBlogsPage } from './pages/PublicBlogsPage';
import { PublicBlogDetailPage } from './pages/PublicBlogDetailPage';
import { PublicProjectsPage } from './pages/PublicProjectsPage';
import { PublicStoriesPage } from './pages/PublicStoriesPage';
import { PublicServiceDetailPage } from './pages/PublicServiceDetailPage';
import { PublicProductsPage } from './pages/PublicProductsPage';
import { PublicQuizPage } from './pages/PublicQuizPage';
import { PublicCareersPage } from './pages/PublicCareersPage';

// Admin CMS Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminProtectedRoute } from './admin/AdminProtectedRoute';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminBlogs } from './admin/AdminBlogs';
import { AdminProjects } from './admin/AdminProjects';
import { AdminCareers } from './admin/AdminCareers';
import { AdminLifeAtRequin } from './admin/AdminLifeAtRequin';
import { AdminStories } from './admin/AdminStories';
import { AdminTestimonials } from './admin/AdminTestimonials';
import { AdminMedia } from './admin/AdminMedia';
import { AdminSettings } from './admin/AdminSettings';

export default function App() {
  return (
    <>
      <Routes>
        {/* ========================================================
            PUBLIC WEBSITE ROUTES (Preserving Requin Website completely)
        ======================================================== */}
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/services" element={<PublicHomePage initialScrollTo="services" />} />
        <Route path="/service/:serviceId" element={<PublicServiceDetailPage />} />
        <Route path="/services/:serviceId" element={<PublicServiceDetailPage />} />
        <Route path="/products" element={<PublicProductsPage />} />
        <Route path="/our-products" element={<PublicProductsPage />} />
        <Route path="/projects" element={<PublicProjectsPage />} />
        <Route path="/blogs" element={<PublicBlogsPage />} />
        <Route path="/blog/:slug" element={<PublicBlogDetailPage />} />
        <Route path="/careers" element={<PublicCareersPage />} />
        <Route path="/our-stories" element={<PublicStoriesPage />} />
        <Route path="/quiz" element={<PublicQuizPage />} />
        <Route path="/contact" element={<PublicHomePage initialScrollTo="contact" />} />

        {/* ========================================================
            ADMIN PANEL CMS ROUTES (Protected separate admin interface)
        ======================================================== */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="life-at-requin" element={<AdminLifeAtRequin />} />
          <Route path="our-stories" element={<AdminStories />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
