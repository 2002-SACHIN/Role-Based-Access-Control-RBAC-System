import { Dialog, Transition, Combobox } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Search, Users, Shield } from 'lucide-react';
import { useStore } from '../../store';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { users, roles } = useStore();
  const [query, setQuery] = useState('');

  const filteredUsers = query === ''
    ? []
    : users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );

  const filteredRoles = query === ''
    ? []
    : roles.filter((role) =>
        role.name.toLowerCase().includes(query.toLowerCase()) ||
        role.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item: any) => {
                // Handle selection
                onOpenChange(false);
              }}>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(filteredUsers.length > 0 || filteredRoles.length > 0) && (
                  <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                    {filteredUsers.length > 0 && (
                      <li className="p-2">
                        <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-500">Users</h2>
                        <ul className="text-sm text-gray-700">
                          {filteredUsers.map((user) => (
                            <Combobox.Option
                              key={user.id}
                              value={user}
                              className={({ active }) =>
                                `flex cursor-default select-none items-center rounded-md px-3 py-2 ${
                                  active ? 'bg-primary text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {({ active }) => (
                                <>
                                  <Users className={`h-5 w-5 flex-none ${active ? 'text-white' : 'text-gray-400'}`} />
                                  <span className="ml-3 flex-auto truncate">{user.name}</span>
                                  <span className={`ml-3 flex-none text-xs ${active ? 'text-white' : 'text-gray-400'}`}>
                                    {user.email}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}

                    {filteredRoles.length > 0 && (
                      <li className="p-2">
                        <h2 className="mt-4 mb-2 px-3 text-xs font-semibold text-gray-500">Roles</h2>
                        <ul className="text-sm text-gray-700">
                          {filteredRoles.map((role) => (
                            <Combobox.Option
                              key={role.id}
                              value={role}
                              className={({ active }) =>
                                `flex cursor-default select-none items-center rounded-md px-3 py-2 ${
                                  active ? 'bg-primary text-white' : 'text-gray-900'
                                }`
                              }
                            >
                              {({ active }) => (
                                <>
                                  <Shield className={`h-5 w-5 flex-none ${active ? 'text-white' : 'text-gray-400'}`} />
                                  <span className="ml-3 flex-auto truncate">{role.name}</span>
                                  <span className={`ml-3 flex-none text-xs ${active ? 'text-white' : 'text-gray-400'}`}>
                                    {role.description}
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filteredUsers.length === 0 && filteredRoles.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <p className="text-gray-900">No results found</p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}