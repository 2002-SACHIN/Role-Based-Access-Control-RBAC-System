import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { UserList } from './components/users/UserList';
import { RoleList } from './components/roles/RoleList';
import { PermissionList } from './components/permissions/PermissionList';
import { Dashboard } from './components/Dashboard';
import { Toast } from './components/Toast';
import { useStore } from './store';

function App() {
  const { currentView, setCurrentView, sidebarOpen } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-gradient">
      <Header />
      <Sidebar />
      <main className={`transition-all duration-200 ${sidebarOpen ? 'lg:pl-64' : ''}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'users' && <UserList />}
            {currentView === 'roles' && <RoleList />}
            {currentView === 'permissions' && <PermissionList />}
          </div>
        </div>
      </main>
      <Toast />
    </div>
  );
}

export default App;