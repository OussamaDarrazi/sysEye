"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, LogOut, ChevronDown, User  } from "lucide-react";
import Image from "next/image";
import { AuthService } from "@/utils/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm border-b border-transparent/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent">
              <Image
                src="/syseye.png"
                alt="SysEye Logo"
                width={32}
                height={32}
                className="object-contain bg-transparent"
              />
            </div>
            <span className="text-xl font-extralight text-white">SysEye</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 font-semibold text-white/70 active:text-white py-8 text-sm">
  <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
    Dashboard
  </Link>
  {user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 focus:outline-none">
        <span className="text-white">{user.name}</span>
        <ChevronDown className="w-4 h-4 text-white/70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#121212]/95 backdrop-blur-xl border-white/10">
        <Link href="/profile">
          <DropdownMenuItem className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-white/70 focus:text-white focus:bg-white/10 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Link href="/login" className="text-white/70 hover:text-white transition-colors">
        Login
      </Link>
      <Link href="/register" className="text-white/70 hover:text-white transition-colors">
        Register
      </Link>
    </>
  )}
</div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}