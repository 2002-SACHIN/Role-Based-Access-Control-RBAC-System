import { useState } from 'react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Role } from '../../types';

interface RoleFormProps {
  role?: Role;
  onClose: () => void;
}

export function RoleForm({ role, onClose }: RoleFormProps) {
  const { permissions, addRole, updateRole, addToast } = useStore();
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions.map(p => p.id) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPermissions = permissions.filter(p => formData.permissions.includes(p.id));
    
    if (role) {
      updateRole(role.id, {
        ...formData,
        permissions: selectedPermissions,
      });
      addToast({ type: 'success', message: 'Role updated successfully' });
    } else {
      addRole({
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        permissions: selectedPermissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      addToast({ type: 'success', message: 'Role added successfully' });
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
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <Input
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
        <div className="space-y-2">
          {permissions.map((permission) => (
            <label key={permission.id} className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                checked={formData.permissions.includes(permission.id)}
                onChange={(e) => {
                  const newPermissions = e.target.checked
                    ? [...formData.permissions, permission.id]
                    : formData.permissions.filter(id => id !== permission.id);
                  setFormData({ ...formData, permissions: newPermissions });
                }}
              />
              <span className="ml-2 text-sm text-gray-700">{permission.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {role ? 'Update Role' : 'Add Role'}
        </Button>
      </div>
    </form>
  );
}