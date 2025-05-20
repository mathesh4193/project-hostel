import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { CalendarDays, Clock, FileText } from 'lucide-react';

interface LeaveFormProps {
  onSubmit: (leaveData: {
    reason: string;
    startDate: string;
    endDate: string;
    type: string;
  }) => void;
  loading?: boolean;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit, loading = false }) => {
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('personal');
  const [errors, setErrors] = useState({
    reason: '',
    startDate: '',
    endDate: '',
  });

  const validateForm = () => {
    const newErrors = {
      reason: '',
      startDate: '',
      endDate: '',
    };
    let isValid = true;

    if (!reason.trim()) {
      newErrors.reason = 'Reason is required';
      isValid = false;
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    } else if (new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = 'End date must be after start date';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        reason,
        startDate,
        endDate,
        type,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Leave</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Select
            label="Leave Type"
            options={[
              { value: 'personal', label: 'Personal' },
              { value: 'medical', label: 'Medical' },
              { value: 'family', label: 'Family Emergency' },
            ]}
            value={type}
            onChange={setType}
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              error={errors.startDate}
              fullWidth
              leftIcon={<CalendarDays className="h-5 w-5 text-gray-400" />}
              min={new Date().toISOString().split('T')[0]}
            />
            
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              error={errors.endDate}
              fullWidth
              leftIcon={<CalendarDays className="h-5 w-5 text-gray-400" />}
              min={startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Leave
            </label>
            <textarea
              id="reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.reason ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please explain the reason for your leave request..."
            ></textarea>
            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
          </div>
          
          <div className="mt-6">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              rightIcon={<FileText className="h-5 w-5" />}
              fullWidth
            >
              Submit Leave Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeaveForm;