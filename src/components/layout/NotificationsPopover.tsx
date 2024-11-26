import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface NotificationsPopoverProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const notifications = [
  {
    id: 1,
    type: 'success',
    message: 'New user "John Doe" registered',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 2,
    type: 'error',
    message: 'Failed to update role permissions',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 3,
    type: 'success',
    message: 'System backup completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
];

export function NotificationsPopover({
  children,
  open,
  onOpenChange,
}: NotificationsPopoverProps) {
  return (
    <Popover className="relative">
      {({ open: popoverOpen }) => (
        <>
          <Popover.Button as="div">{children}</Popover.Button>
          <Transition
            show={popoverOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 border-b">
                <h3 className="text-sm font-medium">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start">
                      {notification.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(notification.timestamp, 'MMM d, h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t">
                <button className="text-sm text-primary hover:text-primary/80 transition-colors">
                  View all notifications
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}