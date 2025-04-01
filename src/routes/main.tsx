import { WelcomePage } from '@/pages/WelcomPage';
import StudentFormPage from '@/pages/StudentFormPage';
import EmployeeLoginPage from '@/pages/LoginPage';
import EmployeeLayout from '@/layouts/employee-layout';
import { DashboardPage } from '@/pages/Dashboard';
import { DepartmentsPage } from '@/pages/Departments/Departments';
import { UsersPage } from '@/pages/Users/Users';
import { RequestsPage } from '@/pages/Requests/Requests';
import { RequestViewPage } from '@/pages/Requests/ViewRequest';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/student-form" element={<StudentFormPage />} />
      <Route path="/employee-login" element={<EmployeeLoginPage />} />
      <Route path="/admin-portal" element={<EmployeeLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="requests" element={<RequestsPage />} />
        <Route path="requests/:id" element={<RequestViewPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;