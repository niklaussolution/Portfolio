import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogOut,
  Users,
  GraduationCap,
  Briefcase,
  Search,
  Trash2,
  Download,
  Loader2,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { mockBackend, USE_MOCK_BACKEND } from './MockBackend';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AdminDashboardProps {
  accessToken: string;
  onLogout: () => void;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  category: 'Student' | 'Employee';
  created_at: string;
}

interface Stats {
  total: number;
  students: number;
  employees: number;
}

export function AdminDashboard({ accessToken, onLogout }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, students: 0, employees: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const fetchRegistrations = async () => {
    try {
      setError('');
      
      if (USE_MOCK_BACKEND) {
        const data = await mockBackend.getRegistrations(accessToken);
        setRegistrations(data.data || []);
        setFilteredRegistrations(data.data || []);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00/admin/registrations`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch registrations');
      }

      setRegistrations(data.data || []);
      setFilteredRegistrations(data.data || []);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
      if (err.message.includes('Unauthorized')) {
        setTimeout(onLogout, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      if (USE_MOCK_BACKEND) {
        const data = await mockBackend.getStats(accessToken);
        setStats(data.data);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00/admin/stats`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  useEffect(() => {
    fetchRegistrations();
    fetchStats();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredRegistrations(registrations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = registrations.filter((reg) => {
      switch (searchType) {
        case 'name':
          return reg.name.toLowerCase().includes(query);
        case 'email':
          return reg.email.toLowerCase().includes(query);
        case 'phone':
          return reg.phone.includes(query);
        default:
          return (
            reg.name.toLowerCase().includes(query) ||
            reg.email.toLowerCase().includes(query) ||
            reg.phone.includes(query)
          );
      }
    });

    setFilteredRegistrations(filtered);
  }, [searchQuery, searchType, registrations]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      if (USE_MOCK_BACKEND) {
        await mockBackend.deleteRegistration(accessToken, deleteId);
      } else {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00/admin/registrations/${deleteId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Delete failed');
        }
      }

      // Remove from local state
      setRegistrations(prev => prev.filter(r => r.id !== deleteId));
      setFilteredRegistrations(prev => prev.filter(r => r.id !== deleteId));
      
      // Update stats
      const deletedReg = registrations.find(r => r.id === deleteId);
      if (deletedReg) {
        setStats(prev => ({
          total: prev.total - 1,
          students: prev.students - (deletedReg.category === 'Student' ? 1 : 0),
          employees: prev.employees - (deletedReg.category === 'Employee' ? 1 : 0)
        }));
      }

      setDeleteId(null);
    } catch (err: any) {
      console.error('Delete error:', err);
      alert('Failed to delete registration: ' + err.message);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Date of Birth', 'Category', 'Registration Date'];
    const rows = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.dob,
      reg.category,
      new Date(reg.created_at).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#ff7a00' }} />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" style={{ color: '#ff7a00' }} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Niklaus Solutions</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Registrations
              </CardTitle>
              <Users className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#ff7a00' }}>
                {stats.total}
              </div>
              <p className="text-xs text-gray-500 mt-1">All participants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Students
              </CardTitle>
              <GraduationCap className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.students}
              </div>
              <p className="text-xs text-gray-500 mt-1">Student registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Employees
              </CardTitle>
              <Briefcase className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.employees}
              </div>
              <p className="text-xs text-gray-500 mt-1">Employee registrations</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="mb-2 block text-gray-700">
                  Search Registrations
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="search-type" className="mb-2 block text-gray-700">
                  Search By
                </Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger id="search-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 md:items-end">
                <Button
                  onClick={() => {
                    setLoading(true);
                    fetchRegistrations();
                    fetchStats();
                  }}
                  variant="outline"
                  className="flex-1 md:flex-none"
                >
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Refresh
                </Button>
                <Button
                  onClick={exportToCSV}
                  className="flex-1 md:flex-none text-white"
                  style={{ backgroundColor: '#ff7a00' }}
                  disabled={filteredRegistrations.length === 0}
                >
                  <Download className="mr-2 w-4 h-4" />
                  Export CSV
                </Button>
              </div>
            </div>

            {searchQuery && (
              <p className="mt-4 text-sm text-gray-600">
                Found {filteredRegistrations.length} result(s)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">No registrations found</p>
                {searchQuery && (
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your search criteria
                  </p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>DOB</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="font-medium">{reg.name}</TableCell>
                        <TableCell>{reg.email}</TableCell>
                        <TableCell>{reg.phone}</TableCell>
                        <TableCell>{new Date(reg.dob).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              reg.category === 'Student'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {reg.category === 'Student' ? (
                              <GraduationCap className="w-3 h-3 mr-1" />
                            ) : (
                              <Briefcase className="w-3 h-3 mr-1" />
                            )}
                            {reg.category}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(reg.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => setDeleteId(reg.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this registration? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}