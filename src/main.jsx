import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProtectedRoute from './AdminPanel/ProtectedRoute.jsx';

const Login = lazy(() => import('./AdminPanel/Login.jsx'));
const AdminDashboard = lazy(() => import('./AdminPanel/AdminDashboard.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
)
