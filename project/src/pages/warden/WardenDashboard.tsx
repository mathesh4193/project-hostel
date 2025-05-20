import React, { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableCell } from '../../components/ui/Table';
import { FileText, AlertCircle, Clock, CheckCircle, XCircle, User, Users } from 'lucide-react';
import { leaves, complaints, outpasses, students } from '../../data/mockData';

const WardenDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaves' | 'complaints' | 'outpasses' | 'students'>('leaves');
  
  const pendingLeaves = leaves.filter(leave => leave.status === 'pending');
  const pendingComplaints = complaints.filter(complaint => complaint.status === 'pending');
  const pendingOutpasses = outpasses.filter(outpass => outpass.status === 'pending');
  
  const approveLeave = (id: string) => {
    // In a real app, this would update the backend
    alert(`Leave ${id} approved!`);
  };
  
  const rejectLeave = (id: string) => {
    // In a real app, this would update the backend
    alert(`Leave ${id} rejected!`);
  };
  
  const approveOutpass = (id: string) => {
    // In a real app, this would update the backend
    alert(`Outpass ${id} approved!`);
  };
  
  const rejectOutpass = (id: string) => {
    // In a real app, this would update the backend
    alert(`Outpass ${id} rejected!`);
  };
  
  const processComplaint = (id: string) => {
    // In a real app, this would update the backend
    alert(`Complaint ${id} marked as in-progress!`);
  };
  
  const resolveComplaint = (id: string) => {
    // In a real app, this would update the backend
    alert(`Complaint ${id} resolved!`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'in-progress':
        return <Badge variant="primary">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Warden Dashboard</h1>
        <p className="text-gray-600">Manage student requests and hostel operations</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <h3 className="text-2xl font-semibold text-gray-800">{students.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-yellow-600 font-medium">Pending Leaves</p>
                <h3 className="text-2xl font-semibold text-gray-800">{pendingLeaves.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-red-600 font-medium">Pending Complaints</p>
                <h3 className="text-2xl font-semibold text-gray-800">{pendingComplaints.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-teal-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-teal-600 font-medium">Pending Outpasses</p>
                <h3 className="text-2xl font-semibold text-gray-800">{pendingOutpasses.length}</h3>
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
              activeTab === 'leaves'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('leaves')}
          >
            <FileText className="h-5 w-5 mr-2 inline" />
            Leave Requests
          </button>
          <button
            className={`${
              activeTab === 'complaints'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('complaints')}
          >
            <AlertCircle className="h-5 w-5 mr-2 inline" />
            Complaints
          </button>
          <button
            className={`${
              activeTab === 'outpasses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('outpasses')}
          >
            <Clock className="h-5 w-5 mr-2 inline" />
            Outpasses
          </button>
          <button
            className={`${
              activeTab === 'students'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('students')}
          >
            <User className="h-5 w-5 mr-2 inline" />
            Students
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'leaves' && (
          <Card>
            <CardHeader>
              <CardTitle>Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell header>Student</TableCell>
                    <TableCell header>Reason</TableCell>
                    <TableCell header>Dates</TableCell>
                    <TableCell header>Status</TableCell>
                    <TableCell header>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((leave) => {
                    const student = students.find(s => s.id === leave.studentId);
                    return (
                      <TableRow key={leave.id}>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(leave.status)}</TableCell>
                        <TableCell>
                          {leave.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<CheckCircle className="h-4 w-4" />}
                                onClick={() => approveLeave(leave.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<XCircle className="h-4 w-4" />}
                                onClick={() => rejectLeave(leave.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'complaints' && (
          <Card>
            <CardHeader>
              <CardTitle>Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell header>Student</TableCell>
                    <TableCell header>Category</TableCell>
                    <TableCell header>Description</TableCell>
                    <TableCell header>Status</TableCell>
                    <TableCell header>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complaints.map((complaint) => {
                    const student = students.find(s => s.id === complaint.studentId);
                    return (
                      <TableRow key={complaint.id}>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell className="capitalize">{complaint.category}</TableCell>
                        <TableCell>{complaint.description}</TableCell>
                        <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                        <TableCell>
                          {complaint.status === 'pending' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => processComplaint(complaint.id)}
                            >
                              Process
                            </Button>
                          )}
                          {complaint.status === 'in-progress' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resolveComplaint(complaint.id)}
                            >
                              Resolve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'outpasses' && (
          <Card>
            <CardHeader>
              <CardTitle>Outpass Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell header>Student</TableCell>
                    <TableCell header>Destination</TableCell>
                    <TableCell header>Purpose</TableCell>
                    <TableCell header>Exit Time</TableCell>
                    <TableCell header>Return Time</TableCell>
                    <TableCell header>Status</TableCell>
                    <TableCell header>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outpasses.map((outpass) => {
                    const student = students.find(s => s.id === outpass.studentId);
                    return (
                      <TableRow key={outpass.id}>
                        <TableCell>{student?.name}</TableCell>
                        <TableCell>{outpass.destination}</TableCell>
                        <TableCell>{outpass.purpose}</TableCell>
                        <TableCell>{new Date(outpass.exitTime).toLocaleString()}</TableCell>
                        <TableCell>{new Date(outpass.expectedReturnTime).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(outpass.status)}</TableCell>
                        <TableCell>
                          {outpass.status === 'pending' && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<CheckCircle className="h-4 w-4" />}
                                onClick={() => approveOutpass(outpass.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                leftIcon={<XCircle className="h-4 w-4" />}
                                onClick={() => rejectOutpass(outpass.id)}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'students' && (
          <Card>
            <CardHeader>
              <CardTitle>Student Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell header>Name</TableCell>
                    <TableCell header>Roll Number</TableCell>
                    <TableCell header>Department</TableCell>
                    <TableCell header>Room</TableCell>
                    <TableCell header>Contact</TableCell>
                    <TableCell header>Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{student.roomNumber}</TableCell>
                      <TableCell>{student.contactNumber}</TableCell>
                      <TableCell>{student.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WardenDashboard;