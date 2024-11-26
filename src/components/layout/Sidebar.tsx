import { Users, Shield, Key, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useStore } from '../../store';

const navigation = [
  { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
  { name: 'Users', id: 'users', icon: Users },
  { name: 'Roles', id: 'roles', icon: Shield },
  { name: 'Permissions', id: 'permissions', icon: Key },
];

export function Sidebar() {
  const { sidebarOpen, currentView, setCurrentView } = useStore();

  return (
    <div className={cn(
      'fixed inset-y-0 left-0 z-30 w-64 transform bg-white/80 backdrop-blur-xl transition-transform duration-200 ease-in-out lg:translate-x-0 border-r',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RBAC Dashboard
          </h2>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id)}
                      className={cn(
                        'group flex w-full items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                        currentView === item.id
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      )}
                    >
                      <item.icon
                        className={cn(
                          'h-5 w-5 transition-colors',
                          currentView === item.id
                            ? 'text-blue-600'
                            : 'text-gray-400 group-hover:text-blue-600'
                        )}
                      />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}