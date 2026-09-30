# Requin Solutions - Web Application & Admin CMS

This repository is organized into two dedicated folders: **Frontend** and **Backend**.

---

## 📁 Repository Structure

```
requin-solutions-website/
├── Frontend/                      # React 19 + Vite + Tailwind CSS Frontend Application
│   ├── public/                    # Static assets, logos, and images
│   ├── src/                       # React components, pages, CMS admin, services
│   ├── index.html                 # HTML entry point
│   ├── vite.config.ts             # Vite configuration with proxy to backend
│   ├── package.json               # Frontend dependencies & scripts
│   ├── tsconfig.json              # TypeScript configuration
│   └── README.md                  # Frontend documentation
│
├── Backend/                       # Express + Node.js + TypeScript REST API Server
│   ├── src/                       # Server bootstrap, routes, auth, types & db logic
│   ├── data/                      # Persistent JSON CMS database store (cms_store.json)
│   ├── uploads/                   # Media uploads storage
│   ├── package.json               # Backend dependencies & scripts
│   ├── tsconfig.json              # TypeScript configuration
│   └── README.md                  # Backend documentation
│
└── package.json                   # Root orchestrator scripts
```

---

## 🚀 Quick Start

### 1. Install Dependencies

You can install all dependencies from the root directory:
```bash
npm run install:all
```
Or install in each directory individually:
```bash
cd Frontend && npm install
cd ../Backend && npm install
```

---

### 2. Running Locally

#### Start the Backend API Server:
```bash
npm run dev:backend
# or: cd Backend && npm run dev
```
The Backend server runs on `http://localhost:5000` (Health check: `http://localhost:5000/health`).

#### Start the Frontend Application:
```bash
npm run dev:frontend
# or: cd Frontend && npm run dev
```
The Frontend client runs on `http://localhost:5173` and automatically proxies `/api` and `/uploads` requests to the Backend.

---

## 🔐 Admin CMS Access
- **Admin Login Route**: `/admin/login`
- **Default Email**: `admin@requinsolutions.com`
- **Default Password**: `Admin@Requin2026!`
