import { User, Role, Permission } from '../types';

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'read:users',
    description: 'View user information',
  },
  {
    id: '2',
    name: 'write:users',
    description: 'Create and edit users',
  },
  {
    id: '3',
    name: 'delete:users',
    description: 'Delete users',
  },
  {
    id: '4',
    name: 'read:roles',
    description: 'View role information',
  },
  {
    id: '5',
    name: 'write:roles',
    description: 'Create and edit roles',
  },
  {
    id: '6',
    name: 'delete:roles',
    description: 'Delete roles',
  },
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: mockPermissions,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can manage content',
    permissions: mockPermissions.filter((p) => !p.name.startsWith('delete')),
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: mockPermissions.filter((p) => p.name.startsWith('read')),
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: mockRoles[0],
    status: 'active',
    lastLogin: new Date('2024-03-10T10:00:00'),
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: mockRoles[1],
    status: 'active',
    lastLogin: new Date('2024-03-09T15:30:00'),
    createdAt: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: mockRoles[2],
    status: 'inactive',
    lastLogin: new Date('2024-03-01T09:15:00'),
    createdAt: new Date('2024-01-03'),
  },
];