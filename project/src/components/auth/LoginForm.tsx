import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Mail, Lock, LogIn } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = await login(email, password);
      
      if (success) {
        // Redirect based on user role
        const role = email.includes('admin') ? 'admin' : 
                    email.includes('warden') ? 'warden' : 'student';
        
        navigate(`/${role}/dashboard`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4 py-8">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <div className="bg-blue-600 rounded-full p-3">
                <LogIn className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">VCET Hostel Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                fullWidth
                leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                data-testid="email-input"
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                fullWidth
                leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                data-testid="password-input"
              />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button 
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
                rightIcon={<LogIn className="h-5 w-5" />}
              >
                Sign in
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-600">
              Demo login credentials: <br />
              Admin: admin@vcet.ac.in / password <br />
              Warden: warden@vcet.ac.in / password <br />
              Student: ravi@vcet.ac.in / password
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;