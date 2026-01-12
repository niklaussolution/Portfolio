import React from 'react';
import {
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Lock,
  Target,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ServerStatus } from './ServerStatus';

interface LandingPageProps {
  onNavigateToRegistration: () => void;
  onNavigateToAdmin: () => void;
}

export function LandingPage({ onNavigateToRegistration, onNavigateToAdmin }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8" style={{ color: '#ff7a00' }} />
            <h1 className="text-2xl font-bold text-gray-900">Niklaus Solutions</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={onNavigateToAdmin}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" style={{ color: '#ff7a00' }} />
            <span className="text-sm font-medium">Free Cyber Awareness Seminar</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Master
            <span className="block mt-2" style={{ color: '#ff7a00' }}>Cyber Security Awareness</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our comprehensive seminar on Cyber Security, Ethical Hacking, and Digital Safety. 
            Learn from industry experts and protect yourself in the digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onNavigateToRegistration}
              size="lg"
              className="text-lg px-8 py-6 text-white"
              style={{ backgroundColor: '#ff7a00' }}
            >
              Register Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold" style={{ color: '#ff7a00' }}>100%</div>
              <div className="text-sm text-gray-400">Free Event</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#ff7a00' }}>Free</div>
              <div className="text-sm text-gray-400">Certificate</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#ff7a00' }}>Limited</div>
              <div className="text-sm text-gray-400">Seats Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About the Seminar
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive program designed to enhance your understanding of cybersecurity 
              threats and best practices for digital protection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-orange-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#ff7a00' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Cyber Awareness</h4>
                <p className="text-gray-600">
                  Learn to identify and prevent cyber threats, phishing attacks, and social engineering tactics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#ff7a00' }}>
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Ethical Hacking</h4>
                <p className="text-gray-600">
                  Understand hacking techniques from a defensive perspective to better protect your systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-orange-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#ff7a00' }}>
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">Digital Safety</h4>
                <p className="text-gray-600">
                  Practical tips for securing your personal and professional digital presence online.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Attend?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gain valuable insights and practical knowledge that you can apply immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: CheckCircle, title: 'Free Entry', desc: 'No cost to attend this valuable seminar' },
              { icon: Award, title: 'Free Certificate', desc: 'Receive a certificate of attendance' },
              { icon: Users, title: 'Expert Instructors', desc: 'Learn from industry professionals' },
              { icon: Clock, title: 'Practical Sessions', desc: 'Hands-on learning experience' },
              { icon: BookOpen, title: 'Comprehensive Content', desc: 'Cover all essential cybersecurity topics' },
              { icon: Shield, title: 'Lifetime Access', desc: 'Access to seminar materials after event' }
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#fff0e6' }}>
                    <benefit.icon className="w-5 h-5" style={{ color: '#ff7a00' }} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Attend Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Who Can Attend?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="border-2" style={{ borderColor: '#ff7a00' }}>
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#ff7a00' }} />
                <h4 className="text-2xl font-bold mb-2">Students</h4>
                <p className="text-gray-600">
                  College and university students interested in cybersecurity and digital safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: '#ff7a00' }}>
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4" style={{ color: '#ff7a00' }} />
                <h4 className="text-2xl font-bold mb-2">Employees</h4>
                <p className="text-gray-600">
                  Working professionals looking to enhance their cybersecurity awareness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 text-white" style={{ background: 'linear-gradient(135deg, #ff7a00 0%, #ff5500 100%)' }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Us?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Register now and secure your spot. Limited seats available!
          </p>
          <Button
            onClick={onNavigateToRegistration}
            size="lg"
            className="bg-white hover:bg-gray-100 text-lg px-8 py-6"
            style={{ color: '#ff7a00' }}
          >
            Register for Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6" style={{ color: '#ff7a00' }} />
            <span className="text-xl font-bold">Niklaus Solutions</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering individuals with cybersecurity knowledge
          </p>
          <div className="text-sm text-gray-500">
            © 2026 Niklaus Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}