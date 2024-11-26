import { useState } from 'react';
import { useStore } from '../store';
import { BarChart3, Users, Shield, Key, Activity, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu } from '@headlessui/react';

export function Dashboard() {
  const { users, roles, permissions } = useStore();
  const [selectedTimeRange] = useState('7d');
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const stats = [
    {
      name: 'Total Users',
      value: users.length,
      change: '+12%',
      icon: Users,
      view: 'users',
    },
    {
      name: 'Active Roles',
      value: roles.length,
      change: '+5%',
      icon: Shield,
      view: 'roles',
    },
    {
      name: 'Permissions',
      value: permissions.length,
      change: '0%',
      icon: Key,
      view: 'permissions',
    },
    {
      name: 'Active Sessions',
      value: '24',
      change: '+18%',
      icon: Activity,
      view: 'sessions',
    },
  ];

  // Mock activity data for the chart
  const activityData = [
    { date: '2024-03-01', logins: 5, actions: 12 },
    { date: '2024-03-02', logins: 8, actions: 15 },
    { date: '2024-03-03', logins: 3, actions: 8 },
    { date: '2024-03-04', logins: 10, actions: 20 },
    { date: '2024-03-05', logins: 7, actions: 16 },
    { date: '2024-03-06', logins: 4, actions: 10 },
    { date: '2024-03-07', logins: 6, actions: 14 },
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Created new role',
      target: 'Admin',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Modified permissions',
      target: 'Editor',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Added user',
      target: 'Sarah Wilson',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <button
            key={stat.name}
            onClick={() => useStore.getState().setCurrentView(stat.view)}
            className="stat-card hover:bg-gray-50 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.change.startsWith('+') 
                  ? 'text-green-600' 
                  : stat.change === '0%' 
                  ? 'text-gray-600' 
                  : 'text-red-600'
              }`}>
                {stat.change} from last {selectedTimeRange}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Activity Overview</h3>
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50">
                {selectedUser.name}
                <ChevronDown className="h-4 w-4" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {users.map((user) => (
                    <Menu.Item key={user.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedUser(user)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                        >
                          {user.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="logins"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="actions"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-medium">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action} - {activity.target}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(activity.timestamp, 'h:mm a')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}