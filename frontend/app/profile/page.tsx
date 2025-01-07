'use client';

import { useState, useEffect } from 'react';
import { AuthService } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = AuthService.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      name: user.name,
      email: user.email
    }));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    // //   const response = await AuthService.api.post('/api/profile/update', formData);
    //   localStorage.setItem('user', JSON.stringify(response.data.user));
      setSuccess('Profile updated successfully');
      setError('');
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6" />
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h2 className="text-lg font-medium mb-4">Change Password</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={formData.current_password}
                    onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                    className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={formData.new_password}
                    onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                    className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={formData.new_password_confirmation}
                    onChange={(e) => setFormData({...formData, new_password_confirmation: e.target.value})}
                    className="w-full bg-gray-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}