import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { KPIPage } from './components/kpis/KPIPage';
import { KPIEntryPage } from './components/kpis/KPIEntryPage';
import { EmployeePage } from './components/employees/EmployeePage';
import { ReportsPage } from './components/reports/ReportsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { LoginPage } from './components/auth/LoginPage';
import { UnauthorizedPage } from './components/auth/UnauthorizedPage';
import { RoleGuard } from './components/auth/RoleGuard';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route
            path="/"
            element={
              <RoleGuard allowedRoles={['admin', 'manager', 'employee']}>
                <Layout>
                  <Navigate to="/kpis" replace />
                </Layout>
              </RoleGuard>
            }
          />

          <Route
            path="/team"
            element={
              <RoleGuard allowedRoles={['admin', 'manager']}>
                <Layout>
                  <EmployeePage />
                </Layout>
              </RoleGuard>
            }
          />

          <Route
            path="/kpis"
            element={
              <RoleGuard allowedRoles={['admin', 'manager', 'employee']}>
                <Layout>
                  <KPIPage />
                </Layout>
              </RoleGuard>
            }
          />

          <Route
            path="/kpi-entry"
            element={
              <RoleGuard allowedRoles={['admin', 'manager', 'employee']}>
                <Layout>
                  <KPIEntryPage />
                </Layout>
              </RoleGuard>
            }
          />

          <Route
            path="/reports"
            element={
              <RoleGuard allowedRoles={['admin', 'manager']}>
                <Layout>
                  <ReportsPage />
                </Layout>
              </RoleGuard>
            }
          />

          <Route
            path="/settings"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <Layout>
                  <SettingsPage />
                </Layout>
              </RoleGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;