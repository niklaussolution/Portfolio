import React, { useState } from 'react';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { mockBackend, USE_MOCK_BACKEND } from './MockBackend';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface RegistrationPageProps {
  onSuccess: () => void;
  onBack: () => void;
}

export function RegistrationPage({ onSuccess, onBack }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    role: 'Student' as 'Student' | 'Employee',
    organization: '',
    city: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.organization.trim()) {
      errors.organization = 'Organization/College name is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City/Location is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Use mock backend if enabled
      if (USE_MOCK_BACKEND) {
        const result = await mockBackend.register(formData);
        onSuccess();
        return;
      }

      // Real backend - MongoDB API
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please try again.');
      }

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      // Success
      onSuccess();

      // Send confirmation email
      try {
        await fetch('http://localhost:5000/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email
          })
        });
      } catch (emailError) {
        console.warn('Email sending failed, but registration was successful:', emailError);
        // Don't show error to user since registration succeeded
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = 'An error occurred during registration. Please try again.';
      
      if (err.message && !err.message.includes('Failed to fetch')) {
        errorMessage = err.message;
      } else if (err.message && err.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-10 h-10" style={{ color: '#ff7a00' }} />
              <h1 className="text-3xl font-bold text-gray-900">Niklaus Solutions</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Registration</h2>
            <p className="text-gray-600">
              Register to attend our free Cyber Awareness & Ethical Hacking seminar conducted by Niklaus Solutions.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="shadow-xl border-2 border-gray-200">
          <CardHeader className="text-white" style={{ background: 'linear-gradient(135deg, #ff7a00 0%, #ff5500 100%)' }}>
            <CardTitle className="text-center text-2xl">Register Now</CardTitle>
            <p className="text-center text-white/90 text-sm">All fields are required</p>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-gray-700 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className={`mt-1 ${fieldErrors.fullName ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                {fieldErrors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`mt-1 ${fieldErrors.email ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <Label htmlFor="mobileNumber" className="text-gray-700 font-medium">
                  Mobile Number *
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  className={`mt-1 ${fieldErrors.mobileNumber ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                {fieldErrors.mobileNumber && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.mobileNumber}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">
                  Role *
                </Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => handleChange('role', value)}
                  className="flex gap-6"
                  disabled={loading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Student" id="student" />
                    <Label htmlFor="student" className="cursor-pointer font-normal">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Employee" id="employee" />
                    <Label htmlFor="employee" className="cursor-pointer font-normal">
                      Employee
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Organization */}
              <div>
                <Label htmlFor="organization" className="text-gray-700 font-medium">
                  Organization / College Name *
                </Label>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Enter your organization or college name"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  className={`mt-1 ${fieldErrors.organization ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                {fieldErrors.organization && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.organization}</p>
                )}
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city" className="text-gray-700 font-medium">
                  City / Location *
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={`mt-1 ${fieldErrors.city ? 'border-red-500' : ''}`}
                  disabled={loading}
                />
                {fieldErrors.city && (
                  <p className="text-red-500 text-sm mt-1">{fieldErrors.city}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full text-white text-lg py-6"
                style={{ backgroundColor: '#ff7a00' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your information is secure and will be used only for seminar registration purposes.
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">Note:</span> Please ensure all information is accurate. 
            You will receive confirmation details via email.
          </p>
        </div>
      </div>
    </div>
  );
}