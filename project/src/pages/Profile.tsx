import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Mail, Phone, MapPin, Shield, Save } from 'lucide-react';
import { Student } from '../types';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state (would be initialized with user data)
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    contactNumber: (currentUser as Student)?.contactNumber || '',
    address: (currentUser as Student)?.address || '',
    guardianName: (currentUser as Student)?.guardianName || '',
    guardianContact: (currentUser as Student)?.guardianContact || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would update user data in a real app
    console.log('Updated profile data:', formData);
    setIsEditing(false);
    
    // Show success message
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">View and update your personal information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{currentUser?.name}</h2>
                <p className="text-gray-500 mb-2">{currentUser?.role}</p>
                
                {currentUser?.role === 'student' && (
                  <>
                    <p className="text-sm text-gray-600">{(currentUser as Student).rollNumber}</p>
                    <p className="text-sm text-gray-600">{(currentUser as Student).department}</p>
                    <div className="mt-4 border-t w-full pt-4">
                      <p className="text-sm mb-1">
                        <span className="font-medium">Room:</span> {(currentUser as Student).roomNumber}
                      </p>
                      <p className="text-sm mb-1">
                        <span className="font-medium">Block:</span> {(currentUser as Student).hostelBlock}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Year:</span> {(currentUser as Student).year}
                      </p>
                    </div>
                  </>
                )}
                
                <div className="mt-6 w-full">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Details */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    fullWidth
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={true} // Email can't be changed
                    fullWidth
                    leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                    helperText="Email address cannot be changed"
                  />
                  
                  {currentUser?.role === 'student' && (
                    <>
                      <Input
                        label="Contact Number"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        disabled={!isEditing}
                        fullWidth
                        leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                      />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            disabled={!isEditing}
                            className={`
                              pl-10 w-full px-4 py-2 bg-white border rounded-md shadow-sm
                              placeholder-gray-400
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
                              border-gray-300
                            `}
                            rows={3}
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-6">
                        <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          Emergency Contact
                        </h3>
                        
                        <Input
                          label="Guardian Name"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          fullWidth
                        />
                        
                        <Input
                          label="Guardian Contact"
                          name="guardianContact"
                          value={formData.guardianContact}
                          onChange={handleChange}
                          disabled={!isEditing}
                          fullWidth
                        />
                      </div>
                    </>
                  )}
                </div>
                
                {isEditing && (
                  <div className="mt-6">
                    <Button
                      type="submit"
                      rightIcon={<Save className="h-5 w-5" />}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full sm:w-auto">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;