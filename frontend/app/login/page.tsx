'use client';
import Link from "next/link";
import Image from "next/image";
import grid from "../../public/Grid.png";
import { useState } from 'react';
import { AuthService } from '@/utils/auth';
import { useRouter } from 'next/navigation';

import React from 'react';

const Page = () => { 
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.login(formData);
      router.push('/dashboard');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };
    return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${grid.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <Link href="/" className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-transparent">
            <Image
              src="/syseye.png"
              alt="SysEye Logo"
              width={64}
              height={64}
              className="object-contain bg-transparent hover:scale-105 transition-transform duration-200"
            />
          </div>
          <span className="text-3xl font-extralight text-white tracking-wide">SysEye</span>
        </Link>
      </div>
      {/* Content */}
      <div className="relative z-10 top-10">

        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-white/80">
              Login
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 text-sm bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-4 py-2 text-sm bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              {error && <div className="error">{error}</div>}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium text-sm transition-all"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-purple-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
    );
};

export default Page;