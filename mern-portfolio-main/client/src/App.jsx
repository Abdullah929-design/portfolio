import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import AdminMessages from './components/AdminMessages';
import AdminProjects from './components/AdminProjects';
import AddProject from './components/AddProject';
import EditProject from './components/EditProject';
import ProjectsPage from './pages/Projects';
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css';
import Hero from "./components/Hero";
import Loading from "./components/Loading";
import Certificates from "./pages/Certificates";

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}




export default App;
