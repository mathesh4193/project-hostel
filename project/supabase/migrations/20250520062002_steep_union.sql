/*
  # Initial Schema Setup for Hostel Management System

  1. New Tables
    - `users` - Base table for all users (students, wardens, admins)
    - `students` - Extended student information
    - `leaves` - Leave requests
    - `complaints` - Complaint records
    - `outpasses` - Outpass requests
    - `rooms` - Room management
    - `attendance` - Student attendance records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for specific roles

  3. Changes
    - Initial schema creation
    - Basic RLS policies
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'warden', 'admin');
CREATE TYPE leave_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE complaint_status AS ENUM ('pending', 'in-progress', 'resolved');
CREATE TYPE complaint_category AS ENUM ('maintenance', 'food', 'hygiene', 'other');
CREATE TYPE outpass_status AS ENUM ('pending', 'approved', 'rejected', 'returned');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'leave');

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE students (
  id uuid PRIMARY KEY REFERENCES users(id),
  roll_number text UNIQUE NOT NULL,
  room_number text,
  hostel_block text,
  department text NOT NULL,
  year integer NOT NULL,
  contact_number text,
  address text,
  guardian_name text,
  guardian_contact text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create leaves table
CREATE TABLE leaves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  reason text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status leave_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  category complaint_category NOT NULL,
  description text NOT NULL,
  status complaint_status DEFAULT 'pending',
  response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create outpasses table
CREATE TABLE outpasses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  destination text NOT NULL,
  purpose text NOT NULL,
  exit_time timestamptz NOT NULL,
  expected_return_time timestamptz NOT NULL,
  actual_return_time timestamptz,
  status outpass_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text UNIQUE NOT NULL,
  block text NOT NULL,
  floor integer NOT NULL,
  capacity integer NOT NULL,
  occupied_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) NOT NULL,
  date date NOT NULL,
  status attendance_status NOT NULL DEFAULT 'present',
  marked_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE outpasses ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Wardens and admins can view all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create policies for students table
CREATE POLICY "Students can view their own data"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Wardens and admins can view all students"
  ON students
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create policies for leaves table
CREATE POLICY "Students can view their own leaves"
  ON leaves
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create leaves"
  ON leaves
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Wardens and admins can view all leaves"
  ON leaves
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create policies for complaints table
CREATE POLICY "Students can view their own complaints"
  ON complaints
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create complaints"
  ON complaints
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Wardens and admins can manage all complaints"
  ON complaints
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create policies for outpasses table
CREATE POLICY "Students can view their own outpasses"
  ON outpasses
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create outpasses"
  ON outpasses
  FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Wardens and admins can manage all outpasses"
  ON outpasses
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create policies for rooms table
CREATE POLICY "All authenticated users can view rooms"
  ON rooms
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage rooms"
  ON rooms
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create policies for attendance table
CREATE POLICY "Students can view their own attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Wardens and admins can manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' IN ('warden', 'admin'));

-- Create indexes for better query performance
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_room ON students(room_number, hostel_block);
CREATE INDEX idx_leaves_student_status ON leaves(student_id, status);
CREATE INDEX idx_complaints_student_status ON complaints(student_id, status);
CREATE INDEX idx_outpasses_student_status ON outpasses(student_id, status);
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);