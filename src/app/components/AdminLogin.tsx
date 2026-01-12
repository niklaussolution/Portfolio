import React, { useState } from 'react';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { mockBackend, USE_MOCK_BACKEND } from './MockBackend';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  onBack: () => void;
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      if (USE_MOCK_BACKEND) {
        const response = await mockBackend.login(email, password);
        if (!response.success) {
          throw new Error(response.error || 'Login failed');
        }
        // Login successful
        onLoginSuccess(response.access_token);
      } else {
        const url = `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00/admin/login`;
        
        console.log('Attempting login to:', url);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password })
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (!data.success) {
          throw new Error(data.error || 'Login failed');
        }

        // Login successful
        onLoginSuccess(data.access_token);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Provide more specific error messages
      let errorMessage = 'Invalid credentials. Please try again.';
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again. If the problem persists, the server may be starting up - please wait a moment and retry.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-white hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-2 border-gray-700 bg-gray-800">
          <CardHeader className="text-white pb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ff7a00' }}>
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Admin Login</CardTitle>
            <p className="text-center text-gray-400 text-sm">
              Access the admin dashboard
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="admin-email" className="text-gray-300 font-medium">
                  Email Address
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@niklaus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="admin-password" className="text-gray-300 font-medium">
                  Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
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
                    Logging in...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Login to Dashboard
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center">
                This area is restricted to authorized administrators only
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 mt-0.5" style={{ color: '#ff7a00' }} />
            <div>
              <h3 className="text-white font-semibold text-sm mb-1">Secure Access</h3>
              <p className="text-gray-400 text-xs">
                All login attempts are monitored and logged for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}