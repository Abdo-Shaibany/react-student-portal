import React from 'react';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { WelcomePage } from './pages/WelcomPage';
import StudentFormPage from './pages/StudentFormPage';
import EmployeeLoginPage from './pages/LoginPage';
import EmployeeLayout from './layouts/employee-layout';
import { DashboardPage } from './pages/Dashboard';
import { DepartmentsPage } from './pages/Departments/Departments';
import { UsersPage } from './pages/Users/Users';
import { RequestsPage } from './pages/Requests/Requests';
import { RequestViewPage } from './pages/Requests/ViewRequest';

// Define the root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage,
});

// Student form route
const studentFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-form',
  component: StudentFormPage,
});

// Employee login route
const employeeLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employee-login',
  component: EmployeeLoginPage,
});

// Admin portal layout route (parent for protected routes)
const employeeLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin-portal',
  component: EmployeeLayout,
});

// Dashboard route (nested under admin-portal)
const dashboardRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: 'dashboard',
  component: DashboardPage, // Use actual dashboard component
});

// Departments route (nested under admin-portal)
const departmentsRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: 'departments',
  component: DepartmentsPage, // Use actual departments component
});

const usersRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: 'users',
  component: UsersPage, // Use actual departments component
});

const requestsRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: 'requests',
  component: RequestsPage, // Use actual departments component
});

const viewRequestRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: 'requests/$id',
  component: RequestViewPage, // Use actual departments component
});

// Create the route tree with proper nesting
const routeTree = rootRoute.addChildren([
  indexRoute,
  studentFormRoute,
  employeeLoginRoute,
  employeeLayout.addChildren([
    dashboardRoute,
    departmentsRoute,
    usersRoute,
    requestsRoute,
    viewRequestRoute
  ])
]);

// Create the router instance
const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;