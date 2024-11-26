import { useState } from 'react';
import { useStore } from '../../store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Shield, Edit2, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function PermissionList() {
  const { permissions, addToast } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle permission creation/update
    addToast({ type: 'success', message: 'Permission updated successfully' });
    setShowAddModal(false);
  };

  const permissionCategories = [
    {
      name: 'User Management',
      permissions: permissions.filter(p => p.name.includes('user')),
    },
    {
      name: 'Role Management',
      permissions: permissions.filter(p => p.name.includes('role')),
    },
    {
      name: 'System',
      permissions: permissions.filter(p => !p.name.includes('user') && !p.name.includes('role')),
    },
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Permissions</CardTitle>
          <Button size="sm" onClick={() => setShowAddModal(true)}>
            Add Permission
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {permissionCategories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="text-lg font-medium">{category.name}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="rounded-lg border p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{permission.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPermission(permission);
                              setShowAddModal(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPermission(permission);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Badge variant="secondary">
                          {category.name}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedPermission(null);
          setFormData({ name: '', description: '' });
        }}
        title={selectedPermission ? 'Edit Permission' : 'Add Permission'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permission Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., read:users"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the permission"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                setSelectedPermission(null);
                setFormData({ name: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {selectedPermission ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPermission(null);
        }}
        title="Delete Permission"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the permission "{selectedPermission?.name}"?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedPermission(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                // Handle permission deletion
                addToast({ type: 'success', message: 'Permission deleted successfully' });
                setShowDeleteModal(false);
                setSelectedPermission(null);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}