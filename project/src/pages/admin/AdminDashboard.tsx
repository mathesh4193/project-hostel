import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { 
  Users, 
  Home, 
  FileText, 
  AlertCircle, 
  Clock, 
  BarChart, 
  TrendingUp,
  Shield 
} from 'lucide-react';
import { students, leaves, complaints, outpasses, rooms } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'stats'>('overview');
  
  // Calculate counts
  const totalStudents = students.length;
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(room => room.occupiedCount < room.capacity).length;
  const pendingLeaves = leaves.filter(leave => leave.status === 'pending').length;
  const pendingComplaints = complaints.filter(complaint => complaint.status === 'pending').length;
  const pendingOutpasses = outpasses.filter(outpass => outpass.status === 'pending').length;
  
  // Calculate occupancy percentage
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalOccupied = rooms.reduce((sum, room) => sum + room.occupiedCount, 0);
  const occupancyPercentage = (totalOccupied / totalCapacity) * 100;
  
  // Mock chart data
  const mockChartData = {
    leaves: [12, 19, 15, 10, 20, 18, 15],
    complaints: [8, 5, 12, 15, 7, 6, 10],
    outpasses: [15, 20, 18, 25, 22, 20, 24]
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">System overview and management</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Students</p>
                <h3 className="text-2xl font-semibold text-gray-800">{totalStudents}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Home className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-teal-600 font-medium">Room Occupancy</p>
                <h3 className="text-2xl font-semibold text-gray-800">{occupancyPercentage.toFixed(1)}%</h3>
                <p className="text-xs text-gray-500">{availableRooms} rooms available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">System Status</p>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                  Operational
                </h3>
                <p className="text-xs text-gray-500">All services running</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending Requests</p>
                <div className="flex space-x-2 mt-1">
                  <Badge variant="warning">{pendingLeaves} Leaves</Badge>
                  <Badge variant="danger">{pendingComplaints} Complaints</Badge>
                  <Badge variant="primary">{pendingOutpasses} Outpasses</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart className="h-5 w-5 mr-2 inline" />
            System Overview
          </button>
          <button
            className={`${
              activeTab === 'rooms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('rooms')}
          >
            <Home className="h-5 w-5 mr-2 inline" />
            Room Management
          </button>
          <button
            className={`${
              activeTab === 'stats'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('stats')}
          >
            <TrendingUp className="h-5 w-5 mr-2 inline" />
            Statistics
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">Leave Requests</h3>
                  </div>
                  <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                    {/* This would be a chart in a real implementation */}
                    <div className="flex items-end h-32 space-x-2">
                      {mockChartData.leaves.map((value, index) => (
                        <div 
                          key={index}
                          className="bg-blue-500 w-6 rounded-t"
                          style={{ height: `${value * 3}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last 7 days</span>
                    <span className="text-sm font-medium">Total: {leaves.length}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    <h3 className="font-medium">Complaints</h3>
                  </div>
                  <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                    <div className="flex items-end h-32 space-x-2">
                      {mockChartData.complaints.map((value, index) => (
                        <div 
                          key={index}
                          className="bg-red-500 w-6 rounded-t"
                          style={{ height: `${value * 3}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last 7 days</span>
                    <span className="text-sm font-medium">Total: {complaints.length}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <Clock className="h-5 w-5 mr-2 text-teal-600" />
                    <h3 className="font-medium">Outpasses</h3>
                  </div>
                  <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                    <div className="flex items-end h-32 space-x-2">
                      {mockChartData.outpasses.map((value, index) => (
                        <div 
                          key={index}
                          className="bg-teal-500 w-6 rounded-t"
                          style={{ height: `${value * 3}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last 7 days</span>
                    <span className="text-sm font-medium">Total: {outpasses.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">Database</span>
                    </div>
                    <span className="text-sm text-gray-500">Connected</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>95% Healthy</span>
                    <span>Last check: 5 mins ago</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">API Services</span>
                    </div>
                    <span className="text-sm text-gray-500">Operational</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>100% Healthy</span>
                    <span>Last check: 2 mins ago</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-medium">Authentication Service</span>
                    </div>
                    <span className="text-sm text-gray-500">Operational</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>98% Healthy</span>
                    <span>Last check: 3 mins ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === 'rooms' && (
        <Card>
          <CardHeader>
            <CardTitle>Room Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="pt-5">
                  <h3 className="font-medium text-lg mb-4">Occupancy Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Block A</span>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Block B</span>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Overall</span>
                        <span className="text-sm font-medium">{occupancyPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${occupancyPercentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-5">
                  <h3 className="font-medium text-lg mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button fullWidth leftIcon={<Plus className="h-4 w-4" />}>
                      Add New Room
                    </Button>
                    <Button variant="outline" fullWidth>
                      Generate Room Report
                    </Button>
                    <Button variant="ghost" fullWidth>
                      View Allocation History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-4">Room Directory</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Block
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Floor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Occupied
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map((room) => (
                      <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {room.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.block}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.floor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.occupiedCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {room.occupiedCount < room.capacity ? (
                            <Badge variant="success">Available</Badge>
                          ) : (
                            <Badge variant="danger">Full</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded mb-6 flex items-center justify-center">
                <p className="text-gray-500">Interactive chart showing monthly statistics would be displayed here</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Leave Statistics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Requests</span>
                      <span className="text-sm font-medium">{leaves.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Approved</span>
                      <span className="text-sm font-medium">
                        {leaves.filter(l => l.status === 'approved').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="text-sm font-medium">
                        {leaves.filter(l => l.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Rejected</span>
                      <span className="text-sm font-medium">
                        {leaves.filter(l => l.status === 'rejected').length}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Complaint Categories
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Maintenance</span>
                      <span className="text-sm font-medium">
                        {complaints.filter(c => c.category === 'maintenance').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Food</span>
                      <span className="text-sm font-medium">
                        {complaints.filter(c => c.category === 'food').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hygiene</span>
                      <span className="text-sm font-medium">
                        {complaints.filter(c => c.category === 'hygiene').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Other</span>
                      <span className="text-sm font-medium">
                        {complaints.filter(c => c.category === 'other').length}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-purple-600" />
                    Student Distribution
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Computer Science</span>
                      <span className="text-sm font-medium">
                        {students.filter(s => s.department === 'Computer Science').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Electronics</span>
                      <span className="text-sm font-medium">
                        {students.filter(s => s.department === 'Electronics').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Mechanical</span>
                      <span className="text-sm font-medium">
                        {students.filter(s => s.department === 'Mechanical').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Other</span>
                      <span className="text-sm font-medium">
                        {students.filter(s => !['Computer Science', 'Electronics', 'Mechanical'].includes(s.department)).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Interactive chart showing system usage trends would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;