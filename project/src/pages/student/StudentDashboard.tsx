import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  User, 
  Home, 
  Calendar, 
  Plus 
} from 'lucide-react';
import { Student } from '../../types';
import { leaves, complaints, outpasses } from '../../data/mockData';
import LeaveForm from '../../components/student/LeaveForm';
import ComplaintForm from '../../components/student/ComplaintForm';
import OutpassForm from '../../components/student/OutpassForm';

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const student = currentUser as Student;
  
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showOutpassForm, setShowOutpassForm] = useState(false);
  
  // Filter data for current student
  const studentLeaves = leaves.filter(leave => leave.studentId === student?.id);
  const studentComplaints = complaints.filter(complaint => complaint.studentId === student?.id);
  const studentOutpasses = outpasses.filter(outpass => outpass.studentId === student?.id);
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'in-progress':
        return 'primary';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };
  
  const handleLeaveSubmit = (leaveData: any) => {
    // In a real app, this would send data to backend
    console.log('Leave data:', leaveData);
    alert('Leave request submitted successfully!');
    setShowLeaveForm(false);
  };
  
  const handleComplaintSubmit = (complaintData: any) => {
    // In a real app, this would send data to backend
    console.log('Complaint data:', complaintData);
    alert('Complaint submitted successfully!');
    setShowComplaintForm(false);
  };
  
  const handleOutpassSubmit = (outpassData: any) => {
    // In a real app, this would send data to backend
    console.log('Outpass data:', outpassData);
    alert('Outpass request submitted successfully!');
    setShowOutpassForm(false);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {student?.name}</p>
      </div>
      
      {/* Student Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{student?.name}</h3>
                <p className="text-gray-500 text-sm">{student?.rollNumber}</p>
                <p className="text-gray-500 text-sm">{student?.department}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Room {student?.roomNumber}</h3>
                <p className="text-gray-500 text-sm">Block {student?.hostelBlock}</p>
                <p className="text-gray-500 text-sm">Hostel Wing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Year {student?.year}</h3>
                <p className="text-gray-500 text-sm">{student?.department}</p>
                <p className="text-gray-500 text-sm">Academic Year 2023-24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                <span>Leave Requests</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLeaveForm(!showLeaveForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showLeaveForm ? (
              <LeaveForm onSubmit={handleLeaveSubmit} />
            ) : (
              <div>
                {studentLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {studentLeaves.map((leave) => (
                      <div key={leave.id} className="border rounded-md p-3">
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-medium">{leave.reason}</p>
                          <Badge variant={getStatusVariant(leave.status)}>
                            {leave.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No leave requests yet</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowLeaveForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Request Leave
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                <span>Complaints</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComplaintForm(!showComplaintForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showComplaintForm ? (
              <ComplaintForm onSubmit={handleComplaintSubmit} />
            ) : (
              <div>
                {studentComplaints.length > 0 ? (
                  <div className="space-y-4">
                    {studentComplaints.map((complaint) => (
                      <div key={complaint.id} className="border rounded-md p-3">
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-medium">{complaint.category}</p>
                          <Badge variant={getStatusVariant(complaint.status)}>
                            {complaint.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{complaint.description}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No complaints filed</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowComplaintForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      File Complaint
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-teal-600" />
                <span>Outpass</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOutpassForm(!showOutpassForm)}
              >
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showOutpassForm ? (
              <OutpassForm onSubmit={handleOutpassSubmit} />
            ) : (
              <div>
                {studentOutpasses.length > 0 ? (
                  <div className="space-y-4">
                    {studentOutpasses.map((outpass) => (
                      <div key={outpass.id} className="border rounded-md p-3">
                        <div className="flex justify-between mb-2">
                          <p className="text-sm font-medium">{outpass.destination}</p>
                          <Badge variant={getStatusVariant(outpass.status)}>
                            {outpass.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{outpass.purpose}</p>
                        <p className="text-xs text-gray-500">
                          Exit: {new Date(outpass.exitTime).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No outpass requests</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowOutpassForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Request Outpass
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;