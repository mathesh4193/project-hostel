import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { AlertCircle } from 'lucide-react';

interface ComplaintFormProps {
  onSubmit: (complaintData: {
    category: string;
    description: string;
    location: string;
  }) => void;
  loading?: boolean;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit, loading = false }) => {
  const [category, setCategory] = useState('maintenance');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({
    description: '',
    location: '',
  });

  const validateForm = () => {
    const newErrors = {
      description: '',
      location: '',
    };
    let isValid = true;

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        category,
        description,
        location,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>File a Complaint</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Select
            label="Complaint Category"
            options={[
              { value: 'maintenance', label: 'Maintenance Issue' },
              { value: 'food', label: 'Food Quality or Service' },
              { value: 'hygiene', label: 'Cleanliness or Hygiene' },
              { value: 'other', label: 'Other Issue' },
            ]}
            value={category}
            onChange={setCategory}
            fullWidth
          />
          
          <Input
            label="Location"
            placeholder="Room number, floor, or specific area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={errors.location}
            fullWidth
          />
          
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Please describe your complaint in detail..."
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div className="mt-6">
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              rightIcon={<AlertCircle className="h-5 w-5" />}
              fullWidth
            >
              Submit Complaint
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ComplaintForm;