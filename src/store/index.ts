import { create } from 'zustand';
import { User, Role, Permission, Toast } from '../types';
import { mockUsers, mockRoles, mockPermissions } from '../data/mock';

interface RBACStore {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  toasts: Toast[];
  sidebarOpen: boolean;
  currentView: string;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addToast: (toast: Toast) => void;
  removeToast: (index: number) => void;
  toggleSidebar: () => void;
  setCurrentView: (view: string) => void;
}

export const useStore = create<RBACStore>((set) => ({
  users: mockUsers,
  roles: mockRoles,
  permissions: mockPermissions,
  toasts: [],
  sidebarOpen: true,
  currentView: 'dashboard',
  addUser: (user) =>
    set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addRole: (role) =>
    set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id, updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      ),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
  addToast: (toast) =>
    set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (index) =>
    set((state) => ({
      toasts: state.toasts.filter((_, i) => i !== index),
    })),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setCurrentView: (view) =>
    set({ currentView: view }),
}));