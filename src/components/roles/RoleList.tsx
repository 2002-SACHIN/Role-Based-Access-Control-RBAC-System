import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { RoleForm } from './RoleForm';
import { Role } from '../../types';

export function RoleList() {
  const { roles, deleteRole, addToast } = useStore();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (role: Role) => {
    deleteRole(role.id);
    addToast({ type: 'success', message: 'Role deleted successfully' });
    setShowDeleteModal(false);
    setSelectedRole(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Roles</CardTitle>
          <Button size="sm" onClick={() => setShowAddModal(true)}>Add Role</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Name</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Description</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Permissions</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Created</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b">
                    <td className="py-4">
                      <div className="font-medium text-gray-900">{role.name}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-gray-500">{role.description}</div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission.id} variant="default">
                            {permission.name}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      {new Date(role.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRole(role);
                          setShowAddModal(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRole(role);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedRole(null);
        }}
        title={selectedRole ? 'Edit Role' : 'Add Role'}
      >
        <RoleForm
          role={selectedRole || undefined}
          onClose={() => {
            setShowAddModal(false);
            setSelectedRole(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRole(null);
        }}
        title="Delete Role"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {selectedRole?.name}?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedRole(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => selectedRole && handleDelete(selectedRole)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}