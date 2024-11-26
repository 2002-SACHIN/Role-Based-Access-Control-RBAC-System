import { useState } from 'react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User, Role } from '../../types';

interface UserFormProps {
  user?: User;
  onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const { roles, addUser, updateUser, addToast } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role.id || roles[0].id,
    status: user?.status || 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRole = roles.find(r => r.id === formData.role)!;
    
    if (user) {
      updateUser(user.id, {
        ...formData,
        role: selectedRole,
      });
      addToast({ type: 'success', message: 'User updated successfully' });
    } else {
      addUser({
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        role: selectedRole,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastLogin: new Date(),
        createdAt: new Date(),
      });
      addToast({ type: 'success', message: 'User added successfully' });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? 'Update User' : 'Add User'}
        </Button>
      </div>
    </form>
  );
}