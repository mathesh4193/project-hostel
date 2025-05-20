import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { MapPin, Clock, FileText } from 'lucide-react';

interface OutpassFormProps {
  onSubmit: (outpassData: {
    destination: string;
    purpose: string;
    exitTime: string;
    expectedReturnTime: string;
  }) => void;
  loading?: boolean;
}

const OutpassForm: React.FC<OutpassFormProps> = ({ onSubmit, loading = false }) => {
  const [destination, setDestination] = useState('');
  const [purpose, setPurpose] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [expectedReturnTime, setExpectedReturnTime] = useState('');
  const [errors, setErrors] = useState({
    destination: '',
    purpose: '',
    exitTime: '',
    expectedReturnTime: '',
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const validateForm = () => {
    const newErrors = {
      destination: '',
      purpose: '',
      exitTime: '',
      expectedReturnTime: '',
    };
    let isValid = true;

    if (!destination.trim()) {
      newErrors.destination = 'Destination is required';
      isValid = false;
    }

    if (!purpose.trim()) {
      newErrors.purpose = 'Purpose is required';
      isValid = false;
    }

    if (!exitTime) {
      newErrors.exitTime = 'Exit time is required';
      isValid = false;
    }

    if (!expectedReturnTime) {
      newErrors.expectedReturnTime = 'Expected return time is required';
      isValid = false;
    } else if (new Date(expectedReturnTime) <= new Date(exitTime)) {
      newErrors.expectedReturnTime = 'Return time must be after exit time';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        destination,
        purpose,
        exitTime,
        expectedReturnTime,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Outpass</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            label="Destination"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            error={errors.destination}
            fullWidth
            leftIcon={<MapPin className="h-5 w-5 text-gray-400" />}
          />
          
          <Input
            label="Purpose"
            placeholder="Purpose of your visit"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            error={errors.purpose}
            fullWidth
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Input
              label="Exit Time"
              type="datetime-local"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
              error={errors.exitTime}
              fullWidth
              leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
              min={getCurrentDateTime()}
            />
            
            <Input
              label="Expected Return Time"
              type="datetime-local"
              value={expectedReturnTime}
              onChange={(e) => setExpectedReturnTime(e.target.value)}
              error={errors.expectedReturnTime}
              fullWidth
              leftIcon={<Clock className="h-5 w-5 text-gray-400" />}
              min={exitTime || getCurrentDateTime()}
            />
          </div>
          
          <div className="mt-6">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              rightIcon={<FileText className="h-5 w-5" />}
              fullWidth
            >
              Submit Outpass Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OutpassForm;