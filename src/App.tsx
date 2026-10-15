import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProjectListPage from "@/pages/ProjectListPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import CreateProjectPage from "@/pages/CreateProjectPage";
import EditProjectPage from "@/pages/EditProjectPage";
import SchedulePage from "@/pages/SchedulePage";
import CrewBoardPage from "@/pages/CrewBoardPage";
import InventoryPage from "@/pages/InventoryPage";
import SiteReportPage from "@/pages/SiteReportPage";
import SettingsPage from "@/pages/SettingsPage";

function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <ProjectListPage />
            </Layout>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Layout>
              <ProjectDetailPage />
            </Layout>
          }
        />
        <Route
          path="/projects/create"
          element={
            <Layout>
              <CreateProjectPage />
            </Layout>
          }
        />
        <Route
          path="/projects/:id/edit"
          element={
            <Layout>
              <EditProjectPage />
            </Layout>
          }
        />
        <Route
          path="/schedule"
          element={
            <Layout>
              <SchedulePage />
            </Layout>
          }
        />
        <Route
          path="/crew"
          element={
            <Layout>
              <CrewBoardPage />
            </Layout>
          }
        />
        <Route
          path="/inventory"
          element={
            <Layout>
              <InventoryPage />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <SiteReportPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
