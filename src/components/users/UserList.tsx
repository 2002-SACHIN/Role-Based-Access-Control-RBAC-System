import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../../store';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { UserForm } from './UserForm';
import { User } from '../../types';

export function UserList() {
  const { users, deleteUser, addToast } = useStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (user: User) => {
    deleteUser(user.id);
    addToast({ type: 'success', message: 'User deleted successfully' });
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <Button size="sm" onClick={() => setShowAddModal(true)}>Add User</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">Last Login</th>
                  <th className="py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt=""
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge>{user.role.name}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={user.status === 'active' ? 'success' : 'danger'}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowAddModal(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
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
          setSelectedUser(null);
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          user={selectedUser || undefined}
          onClose={() => {
            setShowAddModal(false);
            setSelectedUser(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        title="Delete User"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete {selectedUser?.name}?</p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => selectedUser && handleDelete(selectedUser)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}