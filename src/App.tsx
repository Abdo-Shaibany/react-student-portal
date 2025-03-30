import React from 'react';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { WelcomePage } from './pages/WelcomPage';
import StudentFormPage from './pages/StudentFormPage';
import EmployeeLoginPage from './pages/LoginPage';
import EmployeeLayout from './layouts/employee-layout';
// Create these components in your project:
// import DashboardPage from './pages/DashboardPage';
// import DepartmentsPage from './pages/DepartmentsPage';

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
  path: '/dashboard',
  component: StudentFormPage, // Use actual dashboard component
});

// Departments route (nested under admin-portal)
const departmentsRoute = createRoute({
  getParentRoute: () => employeeLayout,
  path: '/departments',
  component: StudentFormPage, // Use actual departments component
});

// Create the route tree with proper nesting
const routeTree = rootRoute.addChildren([
  indexRoute,
  studentFormRoute,
  employeeLoginRoute,
  employeeLayout.addChildren([
    dashboardRoute,
    departmentsRoute
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