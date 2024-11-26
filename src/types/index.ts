export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: 'active' | 'inactive';
  lastLogin: Date;
  createdAt: Date;
};

export type Toast = {
  type: 'success' | 'error' | 'info';
  message: string;
};