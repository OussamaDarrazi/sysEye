'use client';

import grid from '../../public/Grid.png'; // Adjust the import path as necessary
import { useEffect, useState } from 'react';
import { AuthService } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { Mail, Calendar, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "../../components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = AuthService.getUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(userData);
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#121212] text-white relative">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${grid.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
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

      {/* Content */}
      <div className="relative z-10 min-h-screen bg-transparent text-white pt-20 px-4">
        <Navbar />
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#121212]/95 border-white/10 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-2 border-white/10">
                  <AvatarFallback className="bg-white/5 text-white text-xl">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">{user.name}</CardTitle>
                  <Badge variant="outline" className="mt-2 text-white/70 border-white/10">
                    Admin
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <Separator className="bg-white/10" />

            <CardContent className="pt-6 space-y-6">
              {/* User Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/70">
                  <Mail className="h-5 w-5" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center space-x-3 text-white/70">
                  <Calendar className="h-5 w-5" />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center space-x-3 text-white/70">
                  <Shield className="h-5 w-5" />
                  <span>
                    Account Status: <Badge className="ml-2 bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>
                  </span>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-sm text-white/70">Total Nodes</div>
                    <div className="text-2xl font-bold text-white mt-1">12</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="text-sm text-white/70">Active Monitors</div>
                    <div className="text-2xl font-bold text-white mt-1">8</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-sm text-white/70">Added new node: Server-01</div>
                    <div className="text-xs text-white/50 mt-1">2 days ago</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg">
                    <div className="text-sm text-white/70">Updated monitoring settings</div>
                    <div className="text-xs text-white/50 mt-1">5 days ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
