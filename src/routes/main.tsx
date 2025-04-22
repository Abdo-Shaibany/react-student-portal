import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomePage } from '@/pages/WelcomPage';
import StudentFormPage from '@/pages/StudentFormPage';
import EmployeeLoginPage from '@/pages/LoginPage';
import EmployeeLayout from '@/layouts/employee-layout';
import { DashboardPage } from '@/pages/Dashboard';
import { DepartmentsPage } from '@/pages/Departments/Departments';
import { UsersPage } from '@/pages/Users/Users';
import { RequestsPage } from '@/pages/Requests/Requests';
import { RequestViewPage } from '@/pages/Requests/ViewRequest';
import { isAdmin, isAuth } from '@/core/services/loginService';
import { AppRoutes } from '@/core/enum/routes';
import { RequestTypesPage } from '@/pages/RequestsTypes/RequestsTypes';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuth()) {
    return <Navigate to={AppRoutes.EMPLOYEE_LOGIN} replace />;
  }
  return children;
};

const AlreadyAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (isAuth()) {
    return <Navigate to={AppRoutes.DASHBOARD} replace />;
  }
  return children;
};

const AlreadyAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAdmin()) {
    return <RequireAuth> <Navigate to={AppRoutes.REQUESTS} replace /> </RequireAuth>;
  }
  return children;
}

const AppRoutesComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoutes.HOME} element={<AlreadyAuth><WelcomePage /></AlreadyAuth>} />
      <Route path={AppRoutes.STUDENT_FORM} element={<AlreadyAuth><StudentFormPage /></AlreadyAuth>} />
      <Route path={AppRoutes.EMPLOYEE_LOGIN} element={<AlreadyAuth><EmployeeLoginPage /></AlreadyAuth>} />
      <Route path={AppRoutes.ADMIN_PORTAL} element={<EmployeeLayout />}>
        <Route index element={<RequireAuth><Navigate to={AppRoutes.DASHBOARD} replace /></RequireAuth>} />
        <Route path={AppRoutes.DASHBOARD} element={<AlreadyAdmin><DashboardPage /></AlreadyAdmin>} />
        <Route path={AppRoutes.DEPARTMENTS} element={<AlreadyAdmin><DepartmentsPage /></AlreadyAdmin>} />
        <Route path={AppRoutes.USERS} element={<AlreadyAdmin><UsersPage /></AlreadyAdmin>} />
        <Route path={AppRoutes.REQUESTS_TYPES} element={<AlreadyAdmin><RequestTypesPage /></AlreadyAdmin>} />
        <Route path={AppRoutes.REQUESTS} element={<RequireAuth><RequestsPage /></RequireAuth>} />
        <Route path={AppRoutes.REQUEST_VIEW} element={<RequireAuth><RequestViewPage /></RequireAuth>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutesComponent;
