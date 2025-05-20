import { Student, Leave, Complaint, Outpass, Attendance, Room, User, NotificationType } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@vcet.ac.in',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '2',
    name: 'Warden Kumar',
    email: 'warden@vcet.ac.in',
    role: 'warden',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
  }
];

// Mock Students
export const students: Student[] = [
  {
    id: '3',
    name: 'Ravi Shankar',
    email: 'ravi@vcet.ac.in',
    role: 'student',
    rollNumber: '19CS101',
    roomNumber: 'A101',
    hostelBlock: 'A',
    department: 'Computer Science',
    year: 3,
    contactNumber: '9876543210',
    address: '123 Main St, Chennai',
    guardianName: 'Raj Shankar',
    guardianContact: '9876543211',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '4',
    name: 'Priya Patel',
    email: 'priya@vcet.ac.in',
    role: 'student',
    rollNumber: '19EC102',
    roomNumber: 'B202',
    hostelBlock: 'B',
    department: 'Electronics',
    year: 3,
    contactNumber: '9876543212',
    address: '456 Park Ave, Madurai',
    guardianName: 'Suresh Patel',
    guardianContact: '9876543213',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '5',
    name: 'Arun Kumar',
    email: 'arun@vcet.ac.in',
    role: 'student',
    rollNumber: '20ME103',
    roomNumber: 'A102',
    hostelBlock: 'A',
    department: 'Mechanical',
    year: 2,
    contactNumber: '9876543214',
    address: '789 Oak St, Coimbatore',
    guardianName: 'Ramesh Kumar',
    guardianContact: '9876543215',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Mock Leaves
export const leaves: Leave[] = [
  {
    id: '1',
    studentId: '3',
    reason: 'Family function',
    startDate: '2023-11-10',
    endDate: '2023-11-15',
    status: 'approved',
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2023-11-02T14:30:00Z'
  },
  {
    id: '2',
    studentId: '4',
    reason: 'Medical emergency',
    startDate: '2023-11-20',
    endDate: '2023-11-25',
    status: 'pending',
    createdAt: '2023-11-18T09:15:00Z',
    updatedAt: '2023-11-18T09:15:00Z'
  }
];

// Mock Complaints
export const complaints: Complaint[] = [
  {
    id: '1',
    studentId: '3',
    category: 'maintenance',
    description: 'Fan not working in room A101',
    status: 'resolved',
    createdAt: '2023-11-05T08:30:00Z',
    updatedAt: '2023-11-07T11:20:00Z',
    response: 'Fan has been fixed'
  },
  {
    id: '2',
    studentId: '4',
    category: 'food',
    description: 'Poor quality food served yesterday',
    status: 'in-progress',
    createdAt: '2023-11-15T19:45:00Z',
    updatedAt: '2023-11-16T10:00:00Z'
  }
];

// Mock Outpasses
export const outpasses: Outpass[] = [
  {
    id: '1',
    studentId: '3',
    destination: 'Home',
    purpose: 'Weekend visit',
    exitTime: '2023-11-17T16:00:00Z',
    expectedReturnTime: '2023-11-19T18:00:00Z',
    status: 'approved',
    createdAt: '2023-11-16T10:30:00Z'
  },
  {
    id: '2',
    studentId: '5',
    destination: 'Library',
    purpose: 'Project work',
    exitTime: '2023-11-18T14:00:00Z',
    expectedReturnTime: '2023-11-18T18:00:00Z',
    status: 'pending',
    createdAt: '2023-11-18T10:15:00Z'
  }
];

// Mock Attendance
export const attendances: Attendance[] = [
  {
    id: '1',
    studentId: '3',
    date: '2023-11-17',
    status: 'present',
    markedBy: '2'
  },
  {
    id: '2',
    studentId: '4',
    date: '2023-11-17',
    status: 'present',
    markedBy: '2'
  },
  {
    id: '3',
    studentId: '5',
    date: '2023-11-17',
    status: 'absent',
    markedBy: '2'
  }
];

// Mock Rooms
export const rooms: Room[] = [
  {
    id: '1',
    number: 'A101',
    block: 'A',
    floor: 1,
    capacity: 2,
    occupiedCount: 2,
    students: ['3', '5']
  },
  {
    id: '2',
    number: 'B202',
    block: 'B',
    floor: 2,
    capacity: 2,
    occupiedCount: 1,
    students: ['4']
  }
];

// Mock Notifications
export const notifications: NotificationType[] = [
  {
    id: '1',
    userId: '3',
    message: 'Your leave request has been approved',
    type: 'success',
    read: false,
    createdAt: '2023-11-02T14:30:00Z'
  },
  {
    id: '2',
    userId: '4',
    message: 'Your complaint is being processed',
    type: 'info',
    read: true,
    createdAt: '2023-11-16T10:00:00Z'
  },
  {
    id: '3',
    userId: '2',
    message: 'New leave request pending approval',
    type: 'warning',
    read: false,
    createdAt: '2023-11-18T09:15:00Z'
  }
];