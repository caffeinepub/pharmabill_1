import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import BillHistory from "./pages/BillHistory";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import NewBill from "./pages/NewBill";
import Reports from "./pages/Reports";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <Toaster richColors position="top-right" />
    </Layout>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});
const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: Inventory,
});
const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customers",
  component: Customers,
});
const newBillRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/new-bill",
  component: NewBill,
});
const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/history",
  component: BillHistory,
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: Reports,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  inventoryRoute,
  customersRoute,
  newBillRoute,
  historyRoute,
  reportsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
