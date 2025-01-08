/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import grid from '../../public/Grid.png';
import { Key, useEffect, useState } from 'react';
import { AuthService } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { Mail, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "../../components/Navbar";
import { api } from '../../utils/auth';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [nodes, setNodes] = useState<any>([]);

  useEffect(() => {
    const userData = AuthService.getUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(userData);

    // Fetch nodes
    api.get('/nodes')
      .then(response => {
        setNodes(response.data);
      })
      .catch(error => {
        console.error('Error fetching nodes:', error);
      });
  }, [router]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateToFormat = new Date(date);
    
    if (dateToFormat.toDateString() === now.toDateString()) {
      return `Today at ${dateToFormat.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (dateToFormat.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${dateToFormat.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${dateToFormat.toLocaleDateString()} at ${dateToFormat.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: `url(${grid.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}></div>
            <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1728"
      height="1180"
      viewBox="0 0 1728 1180"
      fill="currentColor"
      className="absolute w-full max-h-screen -top-72 pointer-events-none opacity-60"
    >
      <g filter="url(#filter0_f_226_149)">
        <path
          d="M2123.75 293.105C1333.23 688.128 703.641 515.327 508.724 374.099C452.243 349.269 313.169 228.867 73.6286 197.922C-225.797 159.242 110.578 663.582 380.092 782.356C649.606 901.131 1580.73 925.224 2029.92 784.99C2601.98 606.399 3111.92 -200.674 2123.75 293.105Z"
          fill="url(#paint0_radial_226_149)"
          fillOpacity="0.45"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_226_149"
          x="-342.14"
          y="-163"
          width="3323.17"
          height="1342.42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="149.181" result="effect1_foregroundBlur_226_149" />
        </filter>
        <radialGradient
          id="paint0_radial_226_149"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(2522.36 771.207) rotate(-178.79) scale(2230.36 879.25)"
        >
          <stop stopColor="#6248FF" />
          <stop offset="0.369278" stopColor="#E5FF48" />
          <stop offset="0.588842" stopColor="#FF48ED" />
          <stop offset="0.708333" stopColor="#48BDFF" />
          <stop offset="0.932292" stopColor="#6248FF" />
        </radialGradient>
      </defs>
    </svg>
      
      <div className="relative z-10 min-h-screen bg-transparent text-white pt-20 px-4">
        <Navbar />
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#121212]/95 border-white/20 shadow-lg hover:border-white/30 transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-2 border-purple-400">
                  <AvatarFallback className="bg-white/10 text-purple-400 text-xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">{user.name}</CardTitle>
                  <Badge variant="outline" className="mt-2 text-purple-400 border-purple-400 bg-white/5">
                    Admin
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <Separator className="bg-white/20" />

            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/70">
                  <Mail className="h-5 w-5 text-white" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-white/70">
                  <Calendar className="h-5 w-5 text-white" />
                  <span>Joined {formatDate(new Date(user.created_at))}</span>
                </div>

                <div className="flex items-center space-x-3 text-white/70">
                  <Shield className="h-5 w-5 text-white" />
                  <span>
                    Account Status: <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all">
                  <CardContent className="p-4">
                    <div className="text-sm text-white">Total Nodes</div>
                    <div className="text-2xl font-bold text-purple-400 mt-1">{nodes.length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/20 hover:bg-white/10 transition-all">
                  <CardContent className="p-4">
                    <div className="text-sm text-white">Active Nodes</div>
                    <div className="text-2xl font-bold text-purple-400 mt-1">
                      {nodes.filter((node: { is_active: any; }) => node.is_active).length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {nodes.slice(0, 3).map((node: { name: string; created_at: string | number | Date; }, index: Key | null | undefined) => (
                    <a href='/dashboard' key={index}><div  className="bg-white/5 p-3 rounded-lg border border-white/20 hover:bg-white/10 transition-all">
                      <div className="text-sm text-white/70">Added new node: <span className="text-purple-400 font-bold">{node.name}</span></div>
                      <div className="text-xs text-white/70 mt-1">
                        {formatDate(new Date(node.created_at))}
                      </div>
                    </div></a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}