import { useState } from 'react';
import { Bell, Menu, Search, User as UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useStore } from '../../store';
import { NotificationsPopover } from './NotificationsPopover';
import { UserPopover } from './UserPopover';
import { SearchDialog } from './SearchDialog';

export function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { toggleSidebar } = useStore();

  return (
    <>
      <header className="bg-background border-b sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="ml-4 text-xl font-semibold">RBAC Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowSearch(true)}>
                <Search className="h-5 w-5" />
              </Button>
              <NotificationsPopover
                open={showNotifications}
                onOpenChange={setShowNotifications}
              >
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
              </NotificationsPopover>
              <UserPopover
                open={showUserMenu}
                onOpenChange={setShowUserMenu}
              >
                <Button variant="ghost" size="sm">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </UserPopover>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
    </>
  );
}