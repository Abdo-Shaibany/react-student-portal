import React from 'react';
import { Outlet, RouterProvider } from '@tanstack/react-router';
import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { WelcomePage } from './pages/WelcomPage';
import StudentFormPage from './pages/StudentFormPage';
import EmployeeLoginPage from './pages/LoginPage';

// Define the root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Define the index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WelcomePage,
});

// Define the student form route
const studentFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-form',
  component: StudentFormPage,
});

// Define the employee login route
const employeeLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/employee-login',
  component: EmployeeLoginPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, studentFormRoute, employeeLoginRoute]);

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
