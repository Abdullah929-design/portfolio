import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminMessages = lazy(() => import('./components/AdminMessages'));
const AdminProjects = lazy(() => import('./components/AdminProjects'));
const AddProject = lazy(() => import('./components/AddProject'));
const EditProject = lazy(() => import('./components/EditProject'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css';
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/certificates" element={<Certificates />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Hero  />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="projects/add" element={<AddProject />} />
              <Route path="projects/edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}




export default App;
