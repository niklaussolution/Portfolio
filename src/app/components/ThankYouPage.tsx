import React from 'react';
import { CheckCircle, Shield, Mail, Calendar, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ThankYouPageProps {
  onBackToHome: () => void;
}

export function ThankYouPage({ onBackToHome }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-2xl border-2 border-green-200">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Niklaus Branding */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-8 h-8" style={{ color: '#ff7a00' }} />
              <h1 className="text-2xl font-bold text-gray-900">Niklaus Solutions</h1>
            </div>

            {/* Success Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Registration Successful!
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering for our Free Cyber Awareness & Ethical Hacking Seminar. 
              Your spot has been secured!
            </p>

            {/* Information Cards */}
            <div className="space-y-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1" style={{ color: '#ff7a00' }} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Email Confirmation</h3>
                  <p className="text-sm text-gray-600">
                    You will receive a confirmation email with all the seminar details shortly.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4">
                <Calendar className="w-6 h-6 mt-1" style={{ color: '#ff7a00' }} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Seminar Reminder</h3>
                  <p className="text-sm text-gray-600">
                    We'll send you a reminder before the seminar with joining instructions.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start gap-4">
                <Shield className="w-6 h-6 mt-1" style={{ color: '#ff7a00' }} />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 mb-1">Free Certificate</h3>
                  <p className="text-sm text-gray-600">
                    Upon completion, you'll receive a free certificate of attendance.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights Box */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg mb-8 border-2" style={{ borderColor: '#ff7a00' }}>
              <h3 className="font-bold text-gray-900 mb-3">What to Expect:</h3>
              <ul className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff7a00' }} />
                  <span>Comprehensive cyber security awareness training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff7a00' }} />
                  <span>Introduction to ethical hacking concepts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff7a00' }} />
                  <span>Practical tips for digital safety</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff7a00' }} />
                  <span>Q&A session with industry experts</span>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <Button
                onClick={onBackToHome}
                size="lg"
                className="text-white w-full md:w-auto px-8"
                style={{ backgroundColor: '#ff7a00' }}
              >
                <Home className="mr-2 w-5 h-5" />
                Back to Home
              </Button>

              <p className="text-sm text-gray-500">
                Follow us on social media for updates and cybersecurity tips!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-gray-600">
          <p className="text-sm">
            Questions? Contact us at{' '}
            <a
              href="mailto:niklaussolution@gmail.com"
              className="font-semibold hover:underline"
              style={{ color: '#ff7a00' }}
            >
              niklaussolution@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
