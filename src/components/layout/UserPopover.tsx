import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { LogOut, Settings, User } from 'lucide-react';

interface UserPopoverProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const userNavigation = [
  { name: 'Your Profile', href: '#', icon: User },
  { name: 'Settings', href: '#', icon: Settings },
  { name: 'Sign out', href: '#', icon: LogOut },
];

export function UserPopover({
  children,
  open,
  onOpenChange,
}: UserPopoverProps) {
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
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              {userNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <item.icon className="h-4 w-4 mr-3 text-gray-400" />
                  {item.name}
                </a>
              ))}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}