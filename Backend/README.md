# Requin Solutions - Backend API Server

Express + Node.js + TypeScript REST API and CMS management service for the Requin Solutions web platform.

## Features
- **Public Endpoints**:
  - `GET /api/blogs` & `GET /api/blogs/:slug`
  - `GET /api/projects` & `GET /api/projects/:slug`
  - `GET /api/stories`
- **Admin CMS Endpoints** (JWT Bearer Auth protected):
  - `POST /api/admin/auth/login`
  - `GET /api/admin/auth/me`
  - `PUT /api/admin/auth/password`
  - `GET /api/admin/stats`
  - CRUD on Blogs (`/api/admin/blogs`)
  - CRUD on Projects (`/api/admin/projects`)
  - CRUD on Stories/Milestones (`/api/admin/stories`)
  - Media Uploads with Multer (`/api/admin/media`)
- **Storage**:
  - Persistent JSON database store (`data/cms_store.json`) with auto-fallback
  - MongoDB integration support via `MONGODB_URI`
  - Static media serving via `/uploads`

## Getting Started

### Prerequisites
- Node.js 18+ or Bun

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Runs the Express server with live reload on `http://localhost:5000`.

### Production Build & Start
```bash
npm run build
npm start
```

### Health Check
Visit `http://localhost:5000/health` to verify server status.
