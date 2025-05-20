export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'warden' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  rollNumber: string;
  roomNumber: string;
  hostelBlock: string;
  department: string;
  year: number;
  contactNumber: string;
  address: string;
  guardianName: string;
  guardianContact: string;
}

export interface Leave {
  id: string;
  studentId: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  category: 'maintenance' | 'food' | 'hygiene' | 'other';
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  response?: string;
}

export interface Outpass {
  id: string;
  studentId: string;
  destination: string;
  purpose: string;
  exitTime: string;
  expectedReturnTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'returned';
  createdAt: string;
  actualReturnTime?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'leave';
  markedBy?: string;
}

export interface Room {
  id: string;
  number: string;
  block: string;
  floor: number;
  capacity: number;
  occupiedCount: number;
  students: string[];
}

export interface NotificationType {
  id: string;
  userId: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}